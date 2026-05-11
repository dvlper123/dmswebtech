import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../api.js';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <div className="page services-page">
      <section className="content-section">
        <div className="section-heading">
          <span className="eyebrow">Service Portfolio</span>
          <h2>Choose the solution that fits your business needs.</h2>
        </div>
        <div className="service-cards-grid service-highlight-grid">
          {loading ? (
            <p>Loading services…</p>
          ) : services.length > 0 ? (
            services.map((service) => (
              <Link to={`/services/${service.slug}`} key={service.id} className="service-card service-card-hero">
                <div className="service-image-card">
                  <img src={service.image_url || service.image} alt={service.title} />
                </div>
                <div className="service-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No active services are available right now.</p>
          )}
        </div>
      </section>

      <section className="cta-panel section-card">
        <div>
          <h2>Let us scale your digital vision with speed and clarity.</h2>
          <p>From launch-ready websites to full-stack applications and integrated marketing, we deliver practical solutions with premium polish.</p>
        </div>
        <Link to="/contact" className="button button-primary">Book a free consultation</Link>
      </section>
    </div>
  );
}

export default Services;
