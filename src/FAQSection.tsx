import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: 'Como a Eben AI pode ajudar o meu negócio?',
      answer: 'Podemos economizar centenas de horas de trabalho manual para sua equipe, automatizando tarefas repetitivas e tediosas, como prospecção outbound, atendimento ao cliente e criação de conteúdo. Ao implementar essas soluções, não apenas aumentamos a eficiência, mas também liberamos sua equipe para se concentrar em atividades mais estratégicas e criativas, gerando resultados ainda mais impactantes para o seu negócio.',
    },
    {
      question: 'Quanto tempo leva para criar meu projeto?',
      answer: 'Normalmente, nossas soluções são totalmente implementadas em até 7 dias, englobando todo o processo de desenvolvimento e integração. Com uma abordagem ágil e eficiente, garantimos que sua equipe possa começar a se beneficiar das melhorias rapidamente, sem comprometer a qualidade ou a precisão das entregas.',
    },
    {
      question: 'Qual a minha garantia?',
      answer: 'Oferecemos 30 dias de garantia após a implementação da sua solução de IA, com reembolso total caso você não esteja completamente satisfeito com os resultados obtidos. Queremos garantir que sua experiência seja positiva e que os benefícios da nossa solução atendam plenamente às suas expectativas.',
    },
    {
      question: 'Como vocês criam suas Soluções?',
      answer: 'Nós passamos pelo processo de planejamento e escopo do projeto com nosso time de desenvolvedores profissionais e levamos o projeto para plataformas de integração de sistemas & Al, como make.com, n8n, flowise.',
    },
    {
      question: 'Como nos comunicamos?',
      answer: 'Para a maioria das empresas, nossa comunicação será feita diretamente pelo WhatsApp. Além disso, oferecemos suporte contínuo para acompanhar atualizações, resolver possíveis gargalos e garantir que o progresso esteja sempre em linha com os objetivos estabelecidos',
    },
    {
      question: 'E se algo der errado com a automação?',
      answer: 'Seremos notificados imediatamente sempre que ocorrer algum problema no sistema e resolveremos rapidamente, garantindo que a operação continue funcionando sem interrupções.',
    },
    {
      question: 'Preciso de conhecimentos técnicos para usar os sistemas automatizados?',
      answer: 'Nós temos um processo de entrega transparente que instrui o seu time a utilizar os sistemas que entregamos, sem precisar saber programar ou investir dezenas de horas para aprender novas ferramentas.',
    },
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Perguntas frequentes</h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={() => toggleItem(index)}
                className="flex items-center justify-between w-full px-6 py-4 text-left bg-white focus:outline-none transition duration-200 hover:bg-gray-50"
              >
                <span className="text-lg font-medium">{item.question}</span>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div
                className={`px-6 py-4 bg-gray-50 transition-all duration-200 ${
                  openIndex === index ? 'block' : 'hidden'
                }`}
              >
                <p className="text-gray-700">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;