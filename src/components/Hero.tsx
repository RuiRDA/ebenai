import React from "react";
import { ChevronRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10 relative">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text leading-normal">
          Otimize os resultados do seu negócio com IA
        </h1>
        <p className="text-xl mb-8 text-gray-600">
          Faça mais vendas no piloto automático e converta mais leads para o seu
          negócio com um "funcionário" digital que nunca dorme, não tira férias
          e não reclama!
        </p>
        <button
          className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 mx-auto transition"
          onClick={() => {
            document.getElementById('contact')?.scrollIntoView({
              behavior: 'smooth'
            });
          }}
        >
          Comece Agora
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
