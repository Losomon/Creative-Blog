"use client";

import { useState } from "react";
import Link from "next/link";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useToast } from "@/components/Toast";
import FaqAccordion from "@/components/FaqAccordion";
import { contactFaqs } from "@/lib/data";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function ContactPage() {
  useRevealOnScroll();
  const showToast = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = "Please enter your name";
    if (!validEmail(email.trim())) nextErrors.email = "Enter a valid email";
    if (!subject) nextErrors.subject = "Pick a topic";
    if (message.trim().length < 10) nextErrors.message = "Message should be at least 10 characters";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      showToast("Please fix the highlighted fields", "error");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      showToast(`✅ Thanks ${name.split(" ")[0]}! We'll reply to ${email} soon.`, "success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setErrors({});
    }, 1000);
  };

  return (
    <>
      <section className="page-hero centered">
        <div className="container">
          <div className="eyebrow" style={{ justifyContent: "center" }}>GET IN TOUCH</div>
          <h1>Let&apos;s talk <span>shop.</span></h1>
          <p>Questions, pitches, corrections, or just want to say hi — this goes straight to a real person, not a ticket queue.</p>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon" style={{ background: "linear-gradient(135deg,#6C4DF6,#A855F7)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 6 10 13 2 6"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
              </div>
              <h4>Email us</h4>
              <p>For general questions or feedback.</p>
              <a href="mailto:hello@thecodingledger.example">hello@thecodingledger.example</a>
            </div>
            <div className="info-card">
              <div className="info-icon" style={{ background: "linear-gradient(135deg,#3b82f6,#A855F7)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h4>Response time</h4>
              <p>We read everything and reply personally.</p>
              <a href="#contactForm">Usually within 2 business days</a>
            </div>
            <div className="info-card">
              <div className="info-icon" style={{ background: "linear-gradient(135deg,#22c55e,#A855F7)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h4>Guest writing</h4>
              <p>Pitching an article? Use the About page.</p>
              <Link href="/about">Go to About →</Link>
            </div>
          </div>

          <div className="contact-grid" id="contactForm">
            <div className="form-card">
              <h3>Send a message</h3>
              <p>Fill this out and we&apos;ll get back to you at the email you provide.</p>
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cName">Name</label>
                    <input id="cName" type="text" placeholder="Jane Developer" value={name} onChange={(e) => setName(e.target.value)} />
                    <div className="field-error">{errors.name}</div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cEmail">Email</label>
                    <input id="cEmail" type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div className="field-error">{errors.email}</div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group full">
                    <label htmlFor="cSubject">What&apos;s this about?</label>
                    <select id="cSubject" value={subject} onChange={(e) => setSubject(e.target.value)}>
                      <option value="">Select a topic</option>
                      <option value="General question">General question</option>
                      <option value="Article pitch">Article pitch</option>
                      <option value="Correction / typo">Correction or typo</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="field-error">{errors.subject}</div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group full">
                    <label htmlFor="cMessage">Message</label>
                    <textarea id="cMessage" placeholder="What's on your mind?" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <div className="field-error">{errors.message}</div>
                  </div>
                </div>
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? "Sending…" : "Send message"}
                </button>
              </form>
            </div>

            <div className="side-panel">
              <div className="side-card">
                <h4>Response hours</h4>
                <div className="hours-row"><span>Monday – Friday</span><span>9am – 6pm</span></div>
                <div className="hours-row"><span>Saturday</span><span>10am – 2pm</span></div>
                <div className="hours-row"><span>Sunday</span><span>Closed</span></div>
              </div>
              <div className="side-card gradient">
                <h4>Follow along</h4>
                <p>Faster than email for quick questions — we&apos;re active here daily.</p>
                <div className="side-social">
                  <a href="#" aria-label="Twitter"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a>
                  <a href="#" aria-label="GitHub"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.98 5.24.98 11.52c0 4.84 3.14 8.94 7.49 10.39.55.1.75-.24.75-.53v-2.06c-3.05.67-3.69-1.31-3.69-1.31-.5-1.27-1.22-1.6-1.22-1.6-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.91.1-.71.39-1.2.7-1.47-2.43-.28-5-1.22-5-5.41 0-1.19.43-2.17 1.13-2.93-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.12a10.5 10.5 0 0 1 5.5 0c2.1-1.42 3.02-1.12 3.02-1.12.6 1.52.22 2.64.11 2.92.7.76 1.13 1.74 1.13 2.93 0 4.2-2.57 5.13-5.02 5.4.4.35.75 1.03.75 2.08v3.08c0 .29.2.64.76.53A11.03 11.03 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5z"/></svg></a>
                  <a href="#" aria-label="LinkedIn"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.25h4V23h-4V8.25zM8.5 8.25h3.83v2.02h.05c.53-1 1.85-2.06 3.8-2.06 4.06 0 4.82 2.67 4.82 6.14V23h-4v-6.78c0-1.62-.03-3.7-2.25-3.7-2.26 0-2.6 1.76-2.6 3.58V23h-4V8.25z"/></svg></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="section-head centered"><h2>Before you write in…</h2></div>
          <FaqAccordion faqs={contactFaqs} />
        </div>
      </section>
    </>
  );
}
