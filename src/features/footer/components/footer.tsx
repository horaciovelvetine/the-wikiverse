/**
 * Footer component for the site.
 *
 * Renders a footer bar with copyright information and a link to the creator's GitHub.
 */

export function Footer() {
  return (
    <footer className="w-full py-2 flex justify-center items-center bg-transparent">
      <span className="text-lg text-gray-700 font-semibold tracking-tighter">
        &copy; {new Date().getFullYear()} Created by{" "}
        <a
          className="inline-link"
          href="https://github.com/horaciovelvetine"
          target="_blank"
          rel="noopener noreferrer"
        >
          @horaciovelvetine
        </a>
      </span>
    </footer>
  );
}
