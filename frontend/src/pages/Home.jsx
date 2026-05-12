import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCompanyInfo, getServices, getTestimonials } from '../api.js';
import '../bs.css';
const portfolioItems = [
  {
    title: 'Enterprise Platform',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Brand Identity Pack',
    category: 'Graphic Design',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Mobile App Launch',
    category: 'App Development',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Digital Campaign Success',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da4?auto=format&fit=crop&w=1200&q=80',
  },
];

function Home() {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [serviceResults, testimonialResults, companyResult] = await Promise.all([
          getServices(),
          getTestimonials(),
          getCompanyInfo(),
        ]);
        setServices(serviceResults);
        setTestimonials(testimonialResults);
        setCompanyInfo(companyResult);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const heroTitle = companyInfo?.hero_title || 'Build unforgettable digital experiences with modern IT solutions.';
  const heroSubtitle = companyInfo?.hero_subtitle || 'From website development and mobile apps to marketing campaigns and brand design, we make your online journey elegant, scalable and profitable.';

  return (
    <div className="page home-page primary">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow text-danger">Digital transformation for forward-thinking brands</span>
          <h1>{heroTitle}</h1>
          <p>{heroSubtitle}</p>
          <div className="hero-actions">
            <Link to="/contact" className="button button-primary">Get Started</Link>
            <Link to="/services" className="button button-outline">Explore Services</Link>
          </div>
        </div>
        <div className="hero-visual">
          <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" alt="IT Company" />
        </div>
      </section>

      <section className="section-intro">
        <div className="section-copy">
          <h2>Delivering premium IT and digital services for ambitious businesses.</h2>
          <p>We combine strategy, technology, and design to craft digital products that stand out, perform well, and grow your brand.</p>
        </div>
      </section>

      <section className="services-grid-section">
        <div className="section-heading">
          <span className="eyebrow">Our Services</span>
          <h2>Strategic services designed to elevate your presence.</h2>
        </div>
        <div className="service-cards-grid service-highlight-grid">
          {loading ? (
            <p>Loading services…</p>
          ) : services.length > 0 ? (
            services.slice(0, 4).map((service) => (
              <Link to={`/services/${service.slug}`} key={service.id} className="service-card service-card-hero">
                <div className="service-image-card">
                  <img src={service.image_url || service.image} alt={service.title} />
                </div>
                <div className="service-body">
                  <h3>{service.title}</h3>
                  <p>{service.subtitle || service.description}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No active services available at the moment.</p>
          )}
        </div>
      </section>

      <section className="portfolio-section">
        <div className="section-heading">
          <span className="eyebrow">Portfolio</span>
          <h2>Selected work that showcases our creative and technical strength.</h2>
        </div>
        <div className="portfolio-grid">
          {portfolioItems.map((item) => (
            <article key={item.title} className="portfolio-card">
              <img src={item.image} alt={item.title} />
              <div className="portfolio-overlay">
                <span>{item.category}</span>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stats-cta-section">
        <div className="stats-panel">
          <div>
            <h3>120+</h3>
            <p>Projects delivered</p>
          </div>
          <div>
            <h3>40+</h3>
            <p>Happy clients</p>
          </div>
          <div>
            <h3>10 years</h3>
            <p>Industry experience</p>
          </div>
        </div>
        <div className="cta-panel">
          <h2>Ready to launch your next digital product?</h2>
          <p>Work with a team that blends design, development, and marketing into one streamlined experience.</p>
          <Link to="/contact" className="button button-primary">Start Your Project</Link>
        </div>
      </section>

      <section className="reviews-section">
        <div className="section-heading">
          <span className="eyebrow">Client Reviews</span>
          <h2>Trusted by businesses that want quality and results.</h2>
        </div>
        <div className="reviews-grid">
          {loading ? (
            <p>Loading testimonials…</p>
          ) : testimonials.length > 0 ? (
            testimonials.map((review) => (
              <article key={review.id} className="review-card">
                <p>“{review.feedback}”</p>
                <div>
                  <h4>{review.name}</h4>
                  <span>{review.role}{review.company ? `, ${review.company}` : ''}</span>
                </div>
              </article>
            ))
          ) : (
            <p>No testimonials are available right now.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
