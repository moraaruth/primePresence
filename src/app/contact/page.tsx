'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import { MapPin, Clock, Instagram, Linkedin, CheckCircle, Loader } from 'lucide-react';

const contactInfo = [
  { icon: MapPin, label: 'Location', value: 'Nairobi, Kenya · Serving Africa & Global', href: null },
  { icon: Clock, label: 'Response Time', value: 'Within 4 business hours', href: null },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    await fetch('https://formspree.io/f/xgorypap', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });
    setPending(false);
    setSubmitted(true);
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-obsidian pt-40 pb-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <p className="section-label mb-6">Get In Touch</p>
            <h1 className="font-display text-6xl lg:text-8xl font-light text-platinum leading-none">
              Let's Build
              <br />
              <span className="gold-text italic">Something Great.</span>
            </h1>
          </div>
        </section>

        {/* Contact Section */}
        <SectionWrapper className="py-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16">
            {/* Left: Info */}
            <div className="lg:col-span-2">
              <p className="section-label mb-6">Start the Conversation</p>
              <h2 className="font-display text-4xl font-light text-platinum mb-6">
                Get In Touch —
                <br />
                <span className="gold-text italic">We Build It For You</span>
              </h2>
              <p className="text-platinum-muted text-sm leading-relaxed mb-10">
                Prime Presence is a done-for-you service. Our team designs, builds, and manages 
                your entire digital presence. Fill in the form and we'll get back to you within 
                4 business hours to discuss your project.
              </p>

              <div className="flex flex-col gap-6 mb-10">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-platinum-dark text-xs tracking-widest uppercase mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="text-platinum-muted text-sm hover:text-gold transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-platinum-muted text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white-subtle pt-8">
                <p className="text-platinum-dark text-xs tracking-widest uppercase mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { icon: Instagram, href: 'https://instagram.com/primepresence', label: 'Instagram' },
                    { icon: Linkedin, href: 'https://linkedin.com/company/primepresence', label: 'LinkedIn' },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 border border-white-subtle flex items-center justify-center text-platinum-muted hover:text-gold hover:border-gold transition-all duration-300"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="bg-charcoal border border-white-subtle p-10">
                <h3 className="font-display text-3xl font-light text-platinum mb-8">
                  Tell Us About Your Goals
                </h3>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
                    <div className="w-16 h-16 border border-gold/30 flex items-center justify-center">
                      <CheckCircle size={28} className="text-gold" />
                    </div>
                    <div>
                      <h4 className="font-display text-2xl font-light text-platinum mb-3">Message Sent!</h4>
                      <p className="text-platinum-muted text-sm leading-relaxed max-w-sm">We'll be in touch within 4 business hours.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="section-label block mb-2">First Name *</label>
                        <input name="firstName" type="text" placeholder="James" className="input-luxury" required />
                      </div>
                      <div>
                        <label className="section-label block mb-2">Last Name</label>
                        <input name="lastName" type="text" placeholder="Mwangi" className="input-luxury" />
                      </div>
                    </div>

                    <div>
                      <label className="section-label block mb-2">Email Address *</label>
                      <input name="email" type="email" placeholder="james@yourcompany.com" className="input-luxury" required />
                    </div>

                    <div>
                      <label className="section-label block mb-2">Phone / WhatsApp</label>
                      <input name="phone" type="tel" placeholder="+254 700 000 000" className="input-luxury" />
                    </div>

                    <div>
                      <label className="section-label block mb-2">I Am A...</label>
                      <select name="role" className="input-luxury appearance-none cursor-pointer">
                        <option value="">Select your business type</option>
                        <option value="Real Estate Agent / Agency">Real Estate Agent / Agency</option>
                        <option value="Coach / Consultant">Coach / Consultant</option>
                        <option value="Restaurant / Hospitality">Restaurant / Hospitality</option>
                        <option value="Retail / E-commerce">Retail / E-commerce</option>
                        <option value="Law Firm / Professional Services">Law Firm / Professional Services</option>
                        <option value="Healthcare / Wellness">Healthcare / Wellness</option>
                        <option value="Creative / Portfolio">Creative / Portfolio</option>
                        <option value="Startup / Tech">Startup / Tech</option>
                        <option value="NGO / Non-profit">NGO / Non-profit</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="section-label block mb-2">Interested In</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Luxury Website', 'SEO & Visibility', 'Lead Generation', 'Social Media', 'AI Chatbot', 'Full Package'].map((service) => (
                          <label key={service} className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              name="services"
                              value={service}
                              className="w-4 h-4 border border-white-subtle bg-graphite accent-gold cursor-pointer"
                            />
                            <span className="text-platinum-muted text-xs group-hover:text-platinum transition-colors">{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="section-label block mb-2">Tell Us More *</label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Tell us about your current situation, goals, and what you're looking to achieve..."
                        className="input-luxury resize-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="section-label block mb-2">Monthly Budget</label>
                      <select name="budget" className="input-luxury appearance-none cursor-pointer">
                        <option value="">Select budget range</option>
                        <option value="Starter — KSh 3,800–10,200/month">Starter — KSh 3,800–10,200/month</option>
                        <option value="Pro — KSh 10,200–25,800/month">Pro — KSh 10,200–25,800/month</option>
                        <option value="Elite — KSh 25,800+/month">Elite — KSh 25,800+/month</option>
                        <option value="Done-For-You Agency — KSh 90,000+/month">Done-For-You Agency — KSh 90,000+/month</option>
                        <option value="Custom / Enterprise">Custom / Enterprise</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={pending}
                      className="btn-gold w-full justify-center text-sm py-5 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {pending ? (
                        <>
                          <Loader size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send My Enquiry'
                      )}
                    </button>

                    <p className="text-platinum-dark text-xs text-center">
                      By submitting, you agree to our Privacy Policy. We'll respond within 4 business hours.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Trust Signals */}
        <SectionWrapper className="py-16 px-6 lg:px-12 bg-charcoal border-t border-white-subtle">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: '500+', label: 'Clients Served' },
                { value: '15', label: 'Countries' },
                { value: '4hrs', label: 'Response Time' },
                { value: '98%', label: 'Satisfaction Rate' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display text-4xl font-light gold-text mb-2">{value}</p>
                  <p className="text-platinum-muted text-xs tracking-widest uppercase">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
