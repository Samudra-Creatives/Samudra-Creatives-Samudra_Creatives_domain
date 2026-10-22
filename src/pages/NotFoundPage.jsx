import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="categories-empty categories-empty--page">
      <h1>Page not found</h1>
      <p>The page you are looking for is not available.</p>
      <Link to="/" className="categories-button">Return Home</Link>
    </main>
  );
}
