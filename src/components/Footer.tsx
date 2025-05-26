export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-800 pt-6 pb-8 text-center text-sm text-gray-500">
      <div className="space-y-1">
        <p>
          For any bugs Contact: <span className="text-indigo-400">Mee!</span>,{" "}
          <a
            href="mailto:examhack001@gmail.com"
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            examhack001@gmail.com
          </a>
        </p>
        <p>
          Made with - <span className="text-red-500">☠️</span>
        </p>
      </div>
    </footer>
  );
}
