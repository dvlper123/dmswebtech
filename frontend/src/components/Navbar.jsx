import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact Us' },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="brand-wrap">
        <Link to="/" className="brand-link">
          <div className="brand-mark">DMS</div>
          <div>
            <span>DMS Web Tech</span>
            <small>IT Solutions</small>
          </div>
        </Link>
      </div>

      <button className={`menu-toggle ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
        <span />
        <span />
        <span />
      </button>

      <nav className={`site-nav ${open ? 'open' : ''}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
        <Link to="/contact" className="nav-button" onClick={() => setOpen(false)}>
          Get Started
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
