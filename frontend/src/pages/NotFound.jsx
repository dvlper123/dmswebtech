import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page notfound-page">
      <section className="page-hero secondary-hero">
        <div>
          <span className="eyebrow">404</span>
          <h1>Page not found</h1>
          <p>It looks like the page you were looking for does not exist.</p>
          <Link to="/" className="button button-primary">Return home</Link>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
