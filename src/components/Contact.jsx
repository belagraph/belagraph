'use client';

import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Contact({ data }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    e.target.reset();
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <ScrollReveal>
          <h2 className="heading-lg contact__title">
            Get in Touch
          </h2>
          <div>
            <div className="contact__info-item">
              <p className="heading-sm contact__info-label">Email Address</p>
              <p className="contact__info-value">
                {data?.email || 'hello@belagraph.com'}
              </p>
            </div>
            <div className="contact__info-item">
              <p className="heading-sm contact__info-label">Location</p>
              <p className="contact__info-value">
                {data?.location || 'Addis Ababa, Ethiopia'}
              </p>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-group">
              <input
                type="text"
                className="contact__form-input"
                placeholder="Type your full name here..."
                required
              />
            </div>
            <div className="contact__form-group">
              <input
                type="email"
                className="contact__form-input"
                placeholder="Type your email address here..."
                required
              />
            </div>
            <div className="contact__form-group">
              <textarea
                className="contact__form-textarea"
                rows="3"
                placeholder="Tell us about your project or idea..."
                required
              />
            </div>
            <button
              type="submit"
              className="contact__form-submit"
              style={submitted ? { background: '#16a34a' } : undefined}
            >
              {submitted ? 'MESSAGE SENT' : 'SEND MESSAGE'}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
