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
          <h2
            className="heading-lg contact__title"
            dangerouslySetInnerHTML={{ __html: data?.title || '' }}
          />
          <div>
            <div className="contact__info-item">
              <p className="heading-sm contact__info-label">
                {data?.email_label}
              </p>
              <p className="contact__info-value">{data?.email_value}</p>
            </div>
            <div className="contact__info-item">
              <p className="heading-sm contact__info-label">
                {data?.location_label}
              </p>
              <p
                className="contact__info-value"
                dangerouslySetInnerHTML={{
                  __html: data?.location_value || '',
                }}
              />
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-group">
              <label className="label contact__form-label">
                {data?.form?.name_label}
              </label>
              <input
                type="text"
                className="contact__form-input"
                placeholder={data?.form?.name_placeholder}
                required
              />
            </div>
            <div className="contact__form-group">
              <label className="label contact__form-label">
                {data?.form?.email_label}
              </label>
              <input
                type="email"
                className="contact__form-input"
                placeholder={data?.form?.email_placeholder}
                required
              />
            </div>
            <div className="contact__form-group">
              <label className="label contact__form-label">
                {data?.form?.message_label}
              </label>
              <textarea
                className="contact__form-textarea"
                rows="3"
                placeholder={data?.form?.message_placeholder}
                required
              />
            </div>
            <button
              type="submit"
              className="contact__form-submit"
              style={
                submitted
                  ? { background: '#16a34a' }
                  : undefined
              }
            >
              {submitted ? 'MESSAGE SENT ✓' : data?.form?.submit_btn}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
