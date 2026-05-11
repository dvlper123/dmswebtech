import { useEffect, useState } from 'react';
import { getCompanyInfo, submitContact } from '../api.js';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
  const [companyInfo, setCompanyInfo] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCompanyInfo() {
      try {
        const data = await getCompanyInfo();
        setCompanyInfo(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadCompanyInfo();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setError(null);

    try {
      await submitContact(form);
      setStatus('success');
      setForm({ name: '', email: '', company: '', message: '' });
    } catch (submissionError) {
      console.error(submissionError);
      setStatus('error');
      setError('Something went wrong while sending your message. Please try again.');
    }
  };

  return (
    <div className="page contact-page">
      

      <section className="content-section contact-layout">
        <div className="contact-copy">
          <div className="section-heading">
            <span className="eyebrow">Let’s talk</span>
            <h2>We’re available to help with your next project, launch, or redesign.</h2>
          </div>
          <div className="contact-info-card section-card">
            <h3>Contact information</h3>
            <p>Email: {companyInfo?.email || 'hello@digitalapex.com'}</p>
            <p>Phone: {companyInfo?.phone || '+91 98765 43210'}</p>
            <p>Location: {companyInfo?.location || 'New Delhi, India'}</p>
          </div>
          <div className="review-card">
            <h3>Why clients choose us</h3>
            <p>We deliver fast, effective digital solutions with premium polish and a growth mindset.</p>
          </div>
        </div>

        <div className="contact-form-card section-card">
          <h3>Send a message</h3>
          <p>Share a few details and we’ll reach out with a custom plan.</p>

          {status === 'success' && (
            <div className="alert-success">Thanks! Your message has been received. We’ll reply shortly.</div>
          )}

          {status === 'error' && (
            <div className="alert-error">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <label>
              Name
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              Phone
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
            </label>
            <label>
              Company
              <input type="text" name="company" value={form.company} onChange={handleChange} />
            </label>
            <label>
              Subject
              <input type="text" name="subject" value={form.subject} onChange={handleChange} required />
            </label>
            <label>
              Message
              <textarea name="message" value={form.message} onChange={handleChange} rows="6" required />
            </label>
            <button type="submit" className="button button-primary">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
