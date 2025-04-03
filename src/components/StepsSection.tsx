import React from 'react';

const steps = [
  {
    title: "Consultoria gratuita",
    description: "Converse com um engenheiro de sistemas real (normalmente +100€/hora) e discuta as necessidades e objetivos do seu projeto. Vamos ouvir atentamente para servir as suas necessidades o melhor possível."
  },
  {
    title: "Análise e Proposta",
    description: "Com base na sua consulta, iremos fornecer uma análise detalhada, incluindo etapas, propostas, orçamento e algumas possíveis modificações ou extensões ao seu sistema."
  },
  {
    title: "Início do projeto",
    description: "Com a proposta alinhada e acertada, agendaremos uma reunião inicial para dar início à implementação."
  }
];

const StepsSection: React.FC = () => {
  return (
    <section id="steps" className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4 text-left">
        <h2 className="text-5xl font-bold mb-4 text-primary">Como funciona</h2>
        <p className="text-xl mb-8 text-gray-600">
          A automação é complicada - mas nós podemos implementá-la por si! <br />Descubra como a IA pode transformar o seu negócio em 3 etapas simples
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          {steps.map((step, index) => (
            <div key={index} className="w-full md:w-1/3 bg-white p-8 rounded-xl shadow-lg">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-primary text-white font-bold text-xl mb-4">
                {index + 1}
              </div>
              <h4 className="text-xl font-bold mb-2">{step.title}</h4>
              <p className="text-gray-600 mb-4">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;