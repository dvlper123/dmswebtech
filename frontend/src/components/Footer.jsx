import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h3>Digital Apex</h3>
          <p>IT solutions crafted to help brands grow online with modern design, scalable development, and marketing excellence.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <p>hello@digitalapex.com</p>
          <p>+91 98765 43210</p>
          <p>New Delhi, India</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Digital Apex. Designed for growth.</p>
      </div>
    </footer>
  );
}

export default Footer;
