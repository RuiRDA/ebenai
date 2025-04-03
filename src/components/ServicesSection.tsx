import React from 'react';
import { Notebook as Robot, MessageSquare, LineChart } from 'lucide-react';

const services = [
  {
    icon: <Robot className="w-12 h-12 text-primary" />,
    title: "Sistemas Automatizados",
    description: "Criamos um agente de IA que conecta com as ferramentas e aplicações utilizadas na sua empresa para agir como um funcionário real e aumentar os seus resultados."
  },
  {
    icon: <MessageSquare className="w-12 h-12 text-primary" />,
    title: "Conversas com Agentes IA",
    description: "Criamos \"funcionários\" digitais realistas para conversar e converter os seus leads 24/7 por texto ou áudio, 365 dias por ano, sem folgas e sem reclamar."
  },
  {
    icon: <LineChart className="w-12 h-12 text-primary" />,
    title: "Prospeção Ativa",
    description: "Criamos sistemas de agendamento para que os seus clientes possam fazer marcações em qualquer momento do dia, sem intervenção de funcionários."
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Os Nossos Serviços</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl hover:transform hover:-translate-y-2 transition duration-300 shadow-lg relative z-10"
            >
              {service.icon}
              <h3 className="text-xl font-bold mt-4 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;