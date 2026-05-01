import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import type { OnboardingData } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    // Parse request
    const data: OnboardingData = await request.json();

    // Get auth user
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Generate unique subdomain
    const baseSubdomain = data.businessName
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 50);

    let subdomain = baseSubdomain;
    let counter = 1;
    let exists = true;

    while (exists) {
      const { data: existing } = await supabase
        .from('sites')
        .select('id')
        .eq('subdomain', subdomain)
        .single();

      if (!existing) {
        exists = false;
      } else {
        subdomain = `${baseSubdomain}-${counter}`;
        counter++;
      }
    }

    // Call OpenAI to generate site structure
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

    const prompt = `You are a professional website designer. Generate a complete website structure for:

Business Name: ${data.businessName}
Industry: ${data.industry}
Style: ${data.style}
Pages Needed: ${data.pages.join(', ')}
Target Audience: ${data.audience}
Goal: ${data.goal}
Color Preference: ${data.colorPreference}

Generate JSON with this exact structure (no markdown, just valid JSON):
{
  "pages": [
    {
      "slug": "home",
      "title": "Home",
      "sections": [
        {
          "type": "hero",
          "content": {
            "headline": "...",
            "subheadline": "...",
            "cta": "Get Started",
            "backgroundImage": "description of hero image"
          }
        },
        {
          "type": "features",
          "content": {
            "title": "Why Choose Us",
            "features": [
              { "title": "Feature 1", "description": "..." },
              { "title": "Feature 2", "description": "..." },
              { "title": "Feature 3", "description": "..." }
            ]
          }
        }
      ]
    }
  ]
}

For each page, generate appropriate sections based on the page type (home, about, services, etc). Use realistic business copy. Return ONLY valid JSON.`;

    const completion = await openai.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    let generatedContent: any = {};
    const textContent = completion.content.find(c => c.type === 'text');
    
    if (textContent && textContent.type === 'text') {
      try {
        generatedContent = JSON.parse(textContent.text);
      } catch {
        console.error('Failed to parse OpenAI response:', textContent.text);
        generatedContent = {
          pages: [
            {
              slug: 'home',
              title: 'Home',
              sections: [
                {
                  type: 'hero',
                  content: {
                    headline: `Welcome to ${data.businessName}`,
                    subheadline: 'Professional ' + data.industry + ' solutions',
                    cta: 'Get Started',
                  },
                },
              ],
            },
          ],
        };
      }
    }

    // Create site in database
    const { data: siteData, error: siteError } = await supabase
      .from('sites')
      .insert({
        user_id: user.id,
        name: data.businessName,
        subdomain,
        industry: data.industry,
        style: data.style,
        color_preference: data.colorPreference,
        status: 'draft',
      })
      .select()
      .single();

    if (siteError) throw siteError;
    if (!siteData) throw new Error('Failed to create site');

    // Create pages and sections
    for (const page of generatedContent.pages || []) {
      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .insert({
          site_id: siteData.id,
          slug: page.slug,
          title: page.title,
          order: generatedContent.pages.indexOf(page),
        })
        .select()
        .single();

      if (pageError) {
        console.error('Page creation error:', pageError);
        continue;
      }

      // Create sections for this page
      if (page.sections) {
        for (const section of page.sections) {
          const { error: sectionError } = await supabase
            .from('sections')
            .insert({
              page_id: pageData.id,
              type: section.type,
              order: page.sections.indexOf(section),
              content: section.content || {},
            });

          if (sectionError) {
            console.error('Section creation error:', sectionError);
          }
        }
      }
    }

    return NextResponse.json({
      siteId: siteData.id,
      subdomain: siteData.subdomain,
    });
  } catch (error) {
    console.error('Generate site error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate site' },
      { status: 500 }
    );
  }
}
