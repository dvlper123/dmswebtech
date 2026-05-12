import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCompanyInfo, getServices, getTestimonials } from '../api.js';
import '../bs.css';

const portfolioItems = [
  {
    title: 'Enterprise Platform',
    category: 'Web Development',
    image:
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Brand Identity Pack',
    category: 'Graphic Design',
    image:
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Mobile App Launch',
    category: 'App Development',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Digital Campaign Success',
    category: 'Marketing',
    image:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da4?auto=format&fit=crop&w=1200&q=80',
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
        const [serviceResults, testimonialResults, companyResult] =
          await Promise.all([
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

  const heroTitle =
    companyInfo?.hero_title ||
    'Build unforgettable digital experiences with modern IT solutions.';

  const heroSubtitle =
    companyInfo?.hero_subtitle ||
    'From website development and mobile apps to marketing campaigns and brand design, we make your online journey elegant, scalable and profitable.';

  return (
    <div className="page home-page primary">

      {/* HERO SECTION */}
      <section className="hero-section py-5">
        <div className="container">
          <div className="row align-items-center gy-5">

            <div className="col-12 col-lg-6">
              <div className="hero-copy text-center text-lg-start">
                <span className="eyebrow text-danger fw-bold d-block mb-3">
                  Digital transformation for forward-thinking brands
                </span>

                <h1 className="display-4 fw-bold mb-4">
                  {heroTitle}
                </h1>

                <p className="lead mb-4">
                  {heroSubtitle}
                </p>

                <div className="hero-actions d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                  <Link
                    to="/contact"
                    className="btn btn-danger px-4 py-2"
                  >
                    Get Started
                  </Link>

                  <Link
                    to="/services"
                    className="btn btn-outline-dark px-4 py-2"
                  >
                    Explore Services
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="hero-visual text-center">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
                  alt="IT Company"
                  className="img-fluid rounded-4 shadow"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="section-intro py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="section-copy">
                <h2 className="fw-bold mb-4">
                  Delivering premium IT and digital services for ambitious businesses.
                </h2>

                <p className="lead">
                  We combine strategy, technology, and design to craft digital
                  products that stand out, perform well, and grow your brand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="services-grid-section py-5 bg-light">
        <div className="container">

          <div className="section-heading text-center mb-5">
            <span className="eyebrow text-danger fw-bold d-block mb-2">
              Our Services
            </span>

            <h2 className="fw-bold">
              Strategic services designed to elevate your presence.
            </h2>
          </div>

          <div className="row g-4">
            {loading ? (
              <div className="col-12 text-center">
                <p>Loading services…</p>
              </div>
            ) : services.length > 0 ? (
              services.slice(0, 4).map((service) => (
                <div
                  className="col-12 col-md-6 col-lg-3"
                  key={service.id}
                >
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-decoration-none text-dark"
                  >
                    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden service-card service-card-hero">

                      <div className="service-image-card">
                        <img
                          src={service.image_url || service.image}
                          alt={service.title}
                          className="card-img-top img-fluid"
                          style={{
                            height: '220px',
                            objectFit: 'cover',
                          }}
                        />
                      </div>

                      <div className="card-body service-body">
                        <h3 className="h5 fw-bold mb-3">
                          {service.title}
                        </h3>

                        <p className="text-muted mb-0">
                          {service.subtitle || service.description}
                        </p>
                      </div>

                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No active services available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section className="portfolio-section py-5">
        <div className="container">

          <div className="section-heading text-center mb-5">
            <span className="eyebrow text-danger fw-bold d-block mb-2">
              Portfolio
            </span>

            <h2 className="fw-bold">
              Selected work that showcases our creative and technical strength.
            </h2>
          </div>

          <div className="row g-4">
            {portfolioItems.map((item) => (
              <div
                className="col-12 col-md-6"
                key={item.title}
              >
                <article className="portfolio-card position-relative overflow-hidden rounded-4 shadow">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid w-100"
                    style={{
                      height: '350px',
                      objectFit: 'cover',
                    }}
                  />

                  <div className="portfolio-overlay position-absolute bottom-0 start-0 w-100 p-4 text-white"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    }}
                  >
                    <span className="small d-block mb-2">
                      {item.category}
                    </span>

                    <h3 className="h4 fw-bold mb-0">
                      {item.title}
                    </h3>
                  </div>

                </article>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* STATS + CTA */}
      <section className="stats-cta-section py-5 bg-dark text-white">
        <div className="container">

          <div className="row g-4 align-items-center">

            <div className="col-lg-6">
              <div className="stats-panel row text-center g-4">

                <div className="col-4">
                  <h3 className="fw-bold display-6">120+</h3>
                  <p className="mb-0">Projects delivered</p>
                </div>

                <div className="col-4">
                  <h3 className="fw-bold display-6">40+</h3>
                  <p className="mb-0">Happy clients</p>
                </div>

                <div className="col-4">
                  <h3 className="fw-bold display-6">10 years</h3>
                  <p className="mb-0">Industry experience</p>
                </div>

              </div>
            </div>

            <div className="col-lg-6">
              <div className="cta-panel text-center text-lg-start">
                <h2 className="fw-bold mb-4">
                  Ready to launch your next digital product?
                </h2>

                <p className="mb-4">
                  Work with a team that blends design, development, and
                  marketing into one streamlined experience.
                </p>

                <Link
                  to="/contact"
                  className="btn btn-danger px-4 py-2"
                >
                  Start Your Project
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="reviews-section py-5">
        <div className="container">

          <div className="section-heading text-center mb-5">
            <span className="eyebrow text-danger fw-bold d-block mb-2">
              Client Reviews
            </span>

            <h2 className="fw-bold">
              Trusted by businesses that want quality and results.
            </h2>
          </div>

          <div className="row g-4">
            {loading ? (
              <div className="col-12 text-center">
                <p>Loading testimonials…</p>
              </div>
            ) : testimonials.length > 0 ? (
              testimonials.map((review) => (
                <div
                  className="col-12 col-md-6 col-lg-4"
                  key={review.id}
                >
                  <article className="review-card h-100 bg-white shadow-sm rounded-4 p-4 border">

                    <p className="mb-4">
                      “{review.feedback}”
                    </p>

                    <div>
                      <h4 className="h6 fw-bold mb-1">
                        {review.name}
                      </h4>

                      <span className="text-muted small">
                        {review.role}
                        {review.company
                          ? `, ${review.company}`
                          : ''}
                      </span>
                    </div>

                  </article>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No testimonials are available right now.</p>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}

export default Home;
