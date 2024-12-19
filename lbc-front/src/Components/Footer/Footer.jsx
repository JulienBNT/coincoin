import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Le Coin-Coin des Bonnes Affaires. Tous droits réservés.
        </p>
        <div className="flex space-x-4 mt-2">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Facebook"
          >
            Facebook
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Twitter"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
