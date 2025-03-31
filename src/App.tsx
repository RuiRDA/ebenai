import React, { useState } from 'react';
import { Notebook as Robot, Sparkles, Code, ChevronRight, MessageSquare, Cpu, LineChart, Phone, Info, AlertCircle } from 'lucide-react';
import PrivacyPolicy from './PrivacyPolicy';
import FAQSection from './FAQSection';

interface FormData {
  fullName: string;
  email: string;
  whatsapp: string;
  gdprConsent: boolean;
}

interface FormErrors {
  [key: string]: string;
}

function App() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    whatsapp: '',
    gdprConsent: false,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (showPrivacyPolicy) {
    return (
      <>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <button
              onClick={() => setShowPrivacyPolicy(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              Voltar
            </button>
          </div>
        </nav>
        <div className="pt-16">
          <PrivacyPolicy />
        </div>
      </>
    );
  }

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Nome completo é obrigatório';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido';
    }

    if (!formData.whatsapp.trim()) {
      errors.whatsapp = 'WhatsApp é obrigatório';
    } else if (!/^\+351\s?9\d{2}\s?\d{3}\s?\d{3}$/.test(formData.whatsapp)) {
      errors.whatsapp = 'Número WhatsApp português inválido';
    }



    if (!formData.gdprConsent) {
      errors.gdprConsent = 'Deve aceitar a política de privacidade';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      try {
        const response = await fetch('https://n8n.ebenaisolutions.pt/webhook/form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          whatsapp: '',
          gdprConsent: false
        });
      } catch (error) {
        console.error('Form submission error:', error);
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (!value.startsWith('351') && value.length > 0) {
      value = '351' + value;
    }
    if (value.length > 12) {
      value = value.slice(0, 12);
    }
    // Format: +351 9XX XXX XXX
    if (value.length > 3) {
      value = '+' + value.replace(/(\d{3})(\d{3})?(\d{3})?(\d{3})?/, function(_, p1, p2, p3, p4) {
        const parts = [p1];
        if (p2) parts.push(p2);
        if (p3) parts.push(p3);
        if (p4) parts.push(p4);
        return parts.join(' ');
      });
    }
    setFormData(prev => ({ ...prev, whatsapp: value }));
  };

  return (
    <div id="home" className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Background Texture */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#00000010 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      ></div>

      {/* Hero Section */}
      <header className="container mx-auto px-4 py-10 relative">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-4">
            <img 
              src= "https://github.com/RuiRDA/ebenai/blob/main/src/favicon_io/logo_eben_ai_1024x1024.png?raw=true"
              alt="Eben AI Solutions Logo"
              className="w-12 h-auto"
            />
            <span className="text-2xl font-bold text-gray-900">Eben AI Solutions</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#services" className="text-gray-600 hover:text-primary transition">Serviços</a>
            <a href="#about" className="text-gray-600 hover:text-primary transition">Sobre</a>
            <a href="#contact" className="text-gray-600 hover:text-primary transition">Contato</a>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text leading-normal">
          Otimize os resultados do seu negócio com IA
          </h1>
          <p className="text-xl mb-8 text-gray-600">
          Faça mais vendas no piloto automático e converta mais leads para o seu negócio com um "funcionário" digital que nunca dorme, não tira férias e não reclama!
          </p>
          <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 mx-auto transition">
            Comece Agora
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Os Nossos Serviços</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
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
            ].map((service, index) => (
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

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-6">Transformamos o poder da inteligência artificial em resultados reais para o seu negócio.</h2>
              <p className="mb-6 text-gray-600">
              Na Eben AI, unimos tecnologia de ponta e soluções personalizadas para acelerar o seu negócio e aumentar a eficiência da sua empresa. Sem complicações, apenas resultados.
              </p>
              <div className="grid gap-4">
                {[
                  { icon: <Sparkles className="w-6 h-6" />, text: "Tecnologia avançada" },
                  { icon: <Code className="w-6 h-6" />, text: "Otimização de processos" },
                  { icon: <Cpu className="w-6 h-6" />, text: "Infraestrutura robusta" }
                ].map((item, index) => (
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

      {/* Steps Section */}
      <section id="steps" className="py-20 bg-gray-50 relative">
        <div className="container mx-auto px-4 text-left">
          <h2 className="text-5xl font-bold mb-4 text-primary">Como funciona</h2>
          <p className="text-xl mb-8 text-gray-600">
            A automação é complicada - mas nós podemos implementá-la por si! <br />Descubra como a IA pode transformar o seu negócio em 3 etapas simples
          </p>
     
          <div className="flex flex-col md:flex-row justify-center gap-8">
            {/* Step 1 */}
            <div className="w-full md:w-1/3 bg-white p-8 rounded-xl shadow-lg">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-primary text-white font-bold text-xl mb-4">
                1
              </div>
              <h4 className="text-xl font-bold mb-2">Consultoria gratuita</h4>
              <p className="text-gray-600 mb-4">
                Converse com um engenheiro de sistemas real (normalmente +100€/hora) e discuta as necessidades e objetivos do seu projeto. Vamos ouvir atentamente para servir as suas necessidades o melhor possível.
              </p>
            </div>
            {/* Step 2 */}
            <div className="w-full md:w-1/3 bg-white p-8 rounded-xl shadow-lg">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-primary text-white font-bold text-xl mb-4">
                2
              </div>
              <h4 className="text-xl font-bold mb-2">Análise e Proposta</h4>
              <p className="text-gray-600 mb-4">
                Com base na sua consulta, iremos fornecer uma análise detalhada, incluindo etapas, propostas, orçamento e algumas possíveis modificações ou extensões ao seu sistema.
              </p>
            </div>
            {/* Step 3 */}
            <div className="w-full md:w-1/3 bg-white p-8 rounded-xl shadow-lg">
              <div className="flex justify-center items-center w-12 h-12 rounded-full bg-primary text-white font-bold text-xl mb-4">
                3
              </div>
              <h4 className="text-xl font-bold mb-2">Início do projeto</h4>
              <p className="text-gray-600 mb-4">
                Com a proposta alinhada e acertada, agendaremos uma reunião inicial para dar início à implementação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 relative">
        {/* Dot pattern background */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        ></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 text-5xl">Vamos Conversar?</h2>
          <p className="mb-12 max-w-2xl mx-auto text-center text-gray-700 text-lg leading-relaxed">
          Investimos fortemente no início de cada projeto, assumindo 100% do risco para que você não precise (eses projetos podem levar semanas ou até meses). Por causa disso, trabalhamos com apenas um número reduzido de empresas em cada mês, para entregar resultados incomparáveis e com a máxima qualidade.
          Comece por preencher o nosso formulário:
          </p>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome Completo */}
              <div className="relative">
                <label className="block text-sm font-medium mb-2">
                  Nome Completo <span className="text-red-500">*</span>
                  <button
                    type="button"
                    className="ml-2 inline-flex items-center"
                    title="Digite seu nome completo"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="João Silva"
                />
                {formErrors.fullName && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <label className="block text-sm font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                  <button
                    type="button"
                    className="ml-2 inline-flex items-center"
                    title="Digite seu email profissional"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="joao.silva@empresa.com"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* WhatsApp */}
              <div className="relative">
                <label className="block text-sm font-medium mb-2">
                  WhatsApp <span className="text-red-500">*</span>
                  <button
                    type="button"
                    className="ml-2 inline-flex items-center"
                    title="Digite seu número WhatsApp português"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleWhatsAppChange}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="+351 912 345 678"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Digite seu número WhatsApp português
                </p>
                {formErrors.whatsapp && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.whatsapp}
                </p>
                )}
              </div>




              {/* RGPD Consent */}
              <div className="md:col-span-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.gdprConsent}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, gdprConsent: e.target.checked }));
                      if (formErrors.gdprConsent) {
                        setFormErrors(prev => ({ ...prev, gdprConsent: '' }));
                      }
                    }}
                    className="mt-1"
                  />
                  <span className="text-sm">
                    Concordo com o processamento dos meus dados pessoais de acordo com a 
                    <button
                      type="button"
                      onClick={() => setShowPrivacyPolicy(true)}
                      className="text-primary hover:text-primary-dark ml-1"
                    >
                      Política de Privacidade
                    </button>
                    <span className="text-red-500 ml-1">*</span>
                  </span>
                </label>
                {formErrors.gdprConsent && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.gdprConsent}
                </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:-translate-y-1 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <p className="mt-4 text-green-500 text-center">
                    Mensagem enviada com sucesso! Entraremos em contato em breve.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="mt-4 text-red-500 text-center">
                    Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>

     <FAQSection></FAQSection> 

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center mb-4">
            {/* Left Side - Logo, Description, and Email */}
            <div className="flex items-start gap-2">
              <img
                src="https://github.com/RuiRDA/ebenai/blob/main/src/favicon_io/logo_eben_ai_1024x1024.png?raw=true"
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
  
              <button
                      type="button"
                      onClick={() => setShowPrivacyPolicy(true)}
                      className="text-primary hover:text-primary-dark ml-1"
                    >
                      Termos
                    </button>
            </div>

            {/* Right Side - Social Media Icons */}
            <div className="flex justify-end gap-4">

          {/*   
           <a href="#" className="text-gray-600 hover:text-primary transition">
            
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              */}    
              <a href="#" className="text-gray-600 hover:text-primary transition">
                    {/* Instagram Icon  */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary transition">
                    {/* YouTube Icon  */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
    </div>
  );
}

export default App;