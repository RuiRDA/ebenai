import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center mb-4">
          {/* Left Side - Logo, Description, and Email */}
          <div className="flex items-start gap-2">
            <img
              src="https://raw.githubusercontent.com/RuiRDA/ebenai/refs/heads/main/arts_and_logos/Novo%20logo%20eben%20AI.png"
              alt="Eben AI Solutions Logo"
              className="w-8 h-auto"
            />
            <div>
              <span className="text-md font-bold text-gray-900 block">
                Eben AI Solutions
              </span>
              <p className="text-gray-600 text-sm">
                Agentes de inteligência artificial avançados <br />para empresas e negócios.
              </p>
              <a href="mailto:info@ebenaisolutions.com" className="text-gray-600 text-sm hover:text-primary">
                Envie-nos um e-mail: info@ebenaisolutions.com
              </a>
            </div>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex justify-center gap-8 text-gray-600 pl-4 md:pl-8">
            <a href="#home" className="hover:text-primary transition">Início</a>
            <a href="#services" className="text-gray-600 hover:text-primary transition">Serviços</a>
            <a href="#about" className="text-gray-600 hover:text-primary transition">Sobre</a>
            <a href="#contact" className="text-gray-600 hover:text-primary transition">Contato</a>
            <a href="/privacy-policy" className="text-gray-600 hover:text-primary transition">Termos</a>
          </div>

          {/* Right Side - Social Media Icons */}
          <div className="flex justify-end gap-4">
            {/* Commented out LinkedIn Icon
            <a href="#" className="text-gray-600 hover:text-primary transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            */}
            <a href="#" className="text-gray-600 hover:text-primary transition">
              {/* Instagram Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition">
              {/* YouTube Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
              </svg>
            </a>
          </div>
        </div>
        <hr className="mb-4 border-gray-300" />
        <p className="text-gray-600 text-center text-sm">
          © 2025 Todos Os Direitos Reservados Por EBEN IA SOLUTIONS
        </p>
      </div>
    </footer>
  );
};

export default Footer;