function About() {
  return (
    <div className="page about-page">
      <section className="page-hero secondary-hero">
        <div>
          <span className="eyebrow">About Digital Apex</span>
          <h1>We help brands build modern digital experiences that grow fast.</h1>
          <p>Our team blends technology, design, and marketing to craft digital products that are efficient, beautiful, and results-driven.</p>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <span className="eyebrow">Our Story</span>
          <h2>Founded for one purpose: make technology feel effortless and powerful.</h2>
        </div>
        <div className="feature-grid">
          <article>
            <h3>Our Approach</h3>
            <p>We start with your goals, then design a strategy that aligns design, engineering, and marketing with measurable growth.</p>
          </article>
          <article>
            <h3>Our Process</h3>
            <p>From discovery and concept to launch and optimization, every phase is tailored for speed, clarity, and impact.</p>
          </article>
          <article>
            <h3>Our Promise</h3>
            <p>Your digital presence should work for you. We deliver polished products that attract audiences, convert leads, and feel premium.</p>
          </article>
        </div>
      </section>

      <section className="mission-section">
        <div className="mission-copy">
          <span className="eyebrow">Why choose us</span>
          <h2>We build future-ready digital experiences with a human-first mindset.</h2>
          <p>Every solution is designed for clarity, performance, and long-term business value. Our technology choices are modern, flexible, and easy to manage.</p>
          <div className="mission-list">
            <div>
              <strong>Strategic planning</strong>
              <p>We align every project with your commercial goals and audience needs.</p>
            </div>
            <div>
              <strong>Creative execution</strong>
              <p>Design systems and brand assets are built to feel premium, consistent, and memorable.</p>
            </div>
            <div>
              <strong>Growth-focused delivery</strong>
              <p>We keep performance, engagement, and conversion at the center of every build.</p>
            </div>
          </div>
        </div>
        
      </section>
    </div>
  );
}

export default About;
