import React from 'react';
import { Sparkles, Code, Cpu } from 'lucide-react';

const features = [
  { icon: <Sparkles className="w-6 h-6" />, text: "Tecnologia avançada" },
  { icon: <Code className="w-6 h-6" />, text: "Otimização de processos" },
  { icon: <Cpu className="w-6 h-6" />, text: "Infraestrutura robusta" }
];

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6">Transformamos o poder da inteligência artificial em resultados reais para o seu negócio.</h2>
            <p className="mb-6 text-gray-600">
              Na Eben AI, unimos tecnologia de ponta e soluções personalizadas para acelerar o seu negócio e aumentar a eficiência da sua empresa. Sem complicações, apenas resultados.
            </p>
            <div className="grid gap-4">
              {features.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-600">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <img
              src="https://raw.githubusercontent.com/RuiRDA/ebenai/refs/heads/main/src/ebenai-connections.webp"
              alt="AI Technology"
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;