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
      answer: 'Podemos economizar centenas de horas de trabalho manual para os seus funcionários, automatizando tarefas repetitivas e entediantes, como prospecção outbound, atendimento ao cliente, agendamentos, criação de conteúdo, entre outros. Ao implementar estas soluções, não apenas aumentamos a eficiência, mas também fazemos com que a sua equipa tenha mais tempo disponível para se concentrar em atividades mais estratégicas e criativas, gerando resultados ainda mais impactantes para o seu negócio.',
    },
    {
      question: 'Quanto tempo demora a criar o meu projeto?',
      answer: 'Normalmente, as nossas soluções são totalmente implementadas entre 1 a 2 semanas, englobando todo o processo de desenvolvimento e integração. Com uma abordagem ágil e eficiente, garantimos que a sua equipa possa começar a beneficiar dos nossos serviços rapidamente, sem comprometer a qualidade ou a precisão das entregas.',
    },
    {
      question: 'Qual é a minha garantia?',
      answer: 'Oferecemos 30 dias de garantia após a implementação da sua solução de IA, com reembolso total caso não fique totalmente satisfeito com os resultados obtidos. Queremos garantir que a sua experiência seja positiva e que os benefícios da nossa solução atendam plenamente às suas necessidades.',
    },
    {
      question: 'Como é que as Soluções de IA são criadas?',
      answer: 'Nós passamos pelo processo de planeamento e arquitetura do projeto com a nossa equipa e levamos o projeto para plataformas de integração de sistemas e IA, como o make.com, n8n, flowise, entre outros.',
    },
    {
      question: 'Como será a nossa comunicação?',
      answer: 'Para a maioria das empresas, a nossa comunicação será feita diretamente pelo WhatsApp. Além disso, durante o desenvolvimento do projeto e fase de testes, oferecemos suporte contínuo para acompanhar atualizações, resolver possíveis erros de sistema e garantir que o progresso esteja sempre alinhado com os objetivos estabelecidos.',
    },
    {
      question: 'E se algo der errado com a automação?',
      answer: 'Seremos notificados imediatamente sempre que ocorrer algum problema no sistema e resolveremos rapidamente, garantindo que a operação continue a funcionar sem interrupções.',
    },
    {
      question: 'Preciso de conhecimentos técnicos para usar os sistemas automatizados?',
      answer: 'Nós temos um processo de entrega simples e transparente que instrui a sua equipa a utilizar os sistemas que entregamos, sem precisar de saber programar ou investir dezenas de horas para aprender novas ferramentas.',
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