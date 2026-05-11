import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServiceBySlug } from '../api.js';

function ServiceDetail() {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    async function loadService() {
      try {
        const result = await getServiceBySlug(serviceId);
        setService(result);
        setStatus('ready');
      } catch (error) {
        setStatus('error');
      }
    }

    loadService();
  }, [serviceId]);

  if (status === 'loading') {
    return (
      <div className="page service-detail-page">
        <section className="page-hero secondary-hero">
          <div>
            <span className="eyebrow">Loading service</span>
            <h1>Loading the details for your selected service.</h1>
          </div>
        </section>
      </div>
    );
  }

  if (status === 'error' || !service) {
    return (
      <div className="page page-not-found">
        <section className="page-hero secondary-hero">
          <div>
            <span className="eyebrow">Service not found</span>
            <h1>Oops! That service doesn’t exist.</h1>
            <p>Return to our services page to select a different offering.</p>
            <Link to="/services" className="button button-primary">Back to Services</Link>
          </div>
        </section>
      </div>
    );
  }

  const highlights = service.highlights ? service.highlights.split('\n').filter(Boolean) : [];

  return (
    <div className="page service-detail-page">
      <section className="page-hero secondary-hero service-hero">
        <div className="hero-content">
          <span className="eyebrow">{service.title}</span>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <div className="hero-actions">
            <Link to="/contact" className="button button-primary">Get Started</Link>
            <Link to="/services" className="button button-outline">View All Services</Link>
          </div>
        </div>
        <div className="detail-image">
          <img src={service.image_url || service.image} alt={service.title} />
        </div>
      </section>

      <section className="content-section service-overview">
        <div className="section-heading">
          <span className="eyebrow">What We Offer</span>
          <h2>Everything included in our {service.title.toLowerCase()} service.</h2>
        </div>
        <div className="feature-grid">
          {highlights.length > 0 ? (
            highlights.map((highlight, index) => (
              <article key={highlight} className="feature-card">
                <div className="feature-icon">✓</div>
                <h3>{highlight}</h3>
              </article>
            ))
          ) : (
            <article className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>{service.description}</h3>
            </article>
          )}
        </div>
      </section>

      <section className="content-section service-process">
        <div className="section-heading">
          <span className="eyebrow">Our Process</span>
          <h2>How we deliver exceptional {service.title.toLowerCase()} results.</h2>
        </div>
        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Discovery & Planning</h3>
            <p>We start by understanding your needs and creating a tailored plan.</p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h3>Implementation</h3>
            <p>Our experts execute the plan with precision and attention to detail.</p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Testing & Optimization</h3>
            <p>We rigorously test and optimize for the best possible outcome.</p>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h3>Launch & Support</h3>
            <p>We launch your solution and provide ongoing support.</p>
          </div>
        </div>
      </section>

      <section className="testimonial-card section-card">
        <h2>Ready to transform your business?</h2>
        <p>Speak to our team to shape a digital solution that aligns perfectly with your business goals.</p>
        <Link to="/contact" className="button button-outline">Schedule a conversation</Link>
      </section>
    </div>
  );
}

export default ServiceDetail;
