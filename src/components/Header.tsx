import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="container mx-auto px-4 py-10 relative">
      <nav className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4"> {/* Link to home */}
          <img
            src="https://raw.githubusercontent.com/RuiRDA/ebenai/refs/heads/main/arts_and_logos/Novo%20logo%20eben%20AI.png"
            alt="Eben AI Solutions Logo"
            className="w-12 h-auto"
          />
          <span className="text-2xl font-bold text-gray-900">Eben AI Solutions</span>
        </Link>
        <div className="hidden md:flex gap-8">
          <a
            href="#services"
            className="text-gray-600 hover:text-primary transition"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Serviços
          </a>
          <a
            href="#about"
            className="text-gray-600 hover:text-primary transition"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Sobre
          </a>
          <a
            href="#contact"
            className="text-gray-600 hover:text-primary transition"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contato
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;