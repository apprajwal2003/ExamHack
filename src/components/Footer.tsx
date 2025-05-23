export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-800 pt-6 pb-8 text-center text-sm text-gray-500">
      <div className="space-y-1">
        <p>
          For any bugs Contact:{" "}
          <span className="text-indigo-400">A P Prajwal</span>,{" "}
          <a
            href="tel:9353015330"
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            9353015330
          </a>
        </p>
        <p>
          Made with - <span className="text-red-500">☠️</span>
        </p>
      </div>
    </footer>
  );
}
