'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormState = {
  success: boolean;
  message: string;
};

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const role = formData.get('role') as string;
  const services = formData.getAll('services') as string[];
  const message = formData.get('message') as string;
  const budget = formData.get('budget') as string;

  if (!firstName || !email || !message) {
    return { success: false, message: 'Please fill in all required fields.' };
  }

  try {
    await resend.emails.send({
      from: 'Prime Presence <onboarding@resend.dev>',
      to: 'moraacodes@gmail.com',
      replyTo: email,
      subject: `New Strategy Call Request — ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #E8E8E8; padding: 40px;">
          <div style="border-bottom: 1px solid #C9A84C; padding-bottom: 24px; margin-bottom: 32px;">
            <h1 style="font-size: 28px; font-weight: 300; color: #C9A84C; margin: 0; letter-spacing: 0.1em;">PRIME PRESENCE</h1>
            <p style="color: #9A9A9A; font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase; margin: 8px 0 0;">New Strategy Call Request</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1A1A1A; color: #666; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; width: 140px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1A1A1A; color: #E8E8E8; font-size: 14px;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1A1A1A; color: #666; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1A1A1A; color: #C9A84C; font-size: 14px;"><a href="mailto:${email}" style="color: #C9A84C;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1A1A1A; color: #666; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1A1A1A; color: #E8E8E8; font-size: 14px;">${phone || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1A1A1A; color: #666; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">Role</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1A1A1A; color: #E8E8E8; font-size: 14px;">${role || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1A1A1A; color: #666; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">Interested In</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1A1A1A; color: #E8E8E8; font-size: 14px;">${services.length ? services.join(', ') : '—'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1A1A1A; color: #666; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">Budget</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1A1A1A; color: #E8E8E8; font-size: 14px;">${budget || '—'}</td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding: 24px; background: #111111; border-left: 2px solid #C9A84C;">
            <p style="color: #666; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 12px;">Message</p>
            <p style="color: #9A9A9A; font-size: 14px; line-height: 1.7; margin: 0;">${message}</p>
          </div>

          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #1A1A1A;">
            <p style="color: #666; font-size: 11px; text-align: center; letter-spacing: 0.2em; text-transform: uppercase;">
              Reply directly to this email to respond to ${firstName}
            </p>
          </div>
        </div>
      `,
    });

    return { success: true, message: `Thank you ${firstName}! We'll be in touch within 4 business hours.` };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, message: 'Something went wrong. Please email us directly at hello@primepresence.co' };
  }
}
