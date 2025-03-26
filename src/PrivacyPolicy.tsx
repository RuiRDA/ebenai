import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Recolha e Utilização de Informação</h2>
          <p className="mb-4 text-gray-600">
            A Eben AI Solutions recolhe informações pessoais que você fornece voluntariamente ao utilizar nosso site e serviços. Estas informações podem incluir:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-600">
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone/WhatsApp</li>
            <li>Informações da empresa</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Política de Cookies</h2>
          <p className="mb-4 text-gray-600">
            Utilizamos cookies para melhorar sua experiência de navegação. Os cookies são pequenos arquivos de texto armazenados no seu dispositivo que nos ajudam a:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-600">
            <li>Manter sua sessão ativa</li>
            <li>Lembrar suas preferências</li>
            <li>Analisar como você usa nosso site</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Medidas de Proteção de Dados</h2>
          <p className="mb-4 text-gray-600">
            Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Seus Direitos</h2>
          <p className="mb-4 text-gray-600">
            De acordo com o RGPD, você tem os seguintes direitos:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-600">
            <li>Direito de acesso aos seus dados pessoais</li>
            <li>Direito de retificação</li>
            <li>Direito ao apagamento ("direito a ser esquecido")</li>
            <li>Direito à limitação do tratamento</li>
            <li>Direito de portabilidade dos dados</li>
            <li>Direito de oposição</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Informações de Contato</h2>
          <p className="mb-4 text-gray-600">
            Para exercer seus direitos ou esclarecer dúvidas sobre nossa política de privacidade, entre em contato conosco:
          </p>
          <div className="text-gray-600">
            <p>Email: privacy@ebenai.com</p>
            <p>Telefone: +351 912 345 678</p>
            <p>Endereço: Rua Example, 123, Lisboa, Portugal</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;