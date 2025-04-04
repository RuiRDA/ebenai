import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Info, AlertCircle } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  whatsapp: string;
  countryCode: string;
  gdprConsent: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    whatsapp: '',
    countryCode: '351', // Default to Portugal
    gdprConsent: false,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
    } else if (formData.countryCode === '351' && !/^9\d{2}\s?\d{3}\s?\d{3}$/.test(formData.whatsapp)) {
      errors.whatsapp = 'Número português inválido (formato: 9XX XXX XXX)';
    } else if (formData.countryCode === '55' && !/^\d{2}\s?(9?\d{4}\s?\d{4})$/.test(formData.whatsapp)) {
      errors.whatsapp = 'Número brasileiro inválido (formato: XX 9XXXX XXXX)';
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
        countryCode: '351', // Reset to default
        gdprConsent: false
      });
      setFormErrors({}); // Clear errors on success
    } catch (error) {
      console.error('Form submission error:', error);
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
    
    // Set max length based on country code
    const maxLength = formData.countryCode === '55' ? 11 : 9;
    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
    }
    
    // Format phone number with spaces
    if (formData.countryCode === '55') {
      // Brazil format: XX 9XXXX XXXX or XX XXXX XXXX
      value = value.replace(/(\d{2})?(\d{4,5})?(\d{4})?/, function(_, p1, p2, p3) {
        const parts = [];
        if (p1) parts.push(p1);
        if (p2) parts.push(p2);
        if (p3) parts.push(p3);
        return parts.join(' ');
      });
    } else {
      // Portugal format: 9XX XXX XXX
      value = value.replace(/(\d{3})?(\d{3})?(\d{3})?/, function(_, p1, p2, p3) {
        const parts = [];
        if (p1) parts.push(p1);
        if (p2) parts.push(p2);
        if (p3) parts.push(p3);
        return parts.join(' ');
      });
    }
    
    setFormData(prev => ({ ...prev, whatsapp: value }));
    if (formErrors.whatsapp) {
      setFormErrors(prev => ({ ...prev, whatsapp: '' }));
    }
  };

  return (
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
                className={`w-full px-4 py-3 rounded-lg border ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'} bg-white focus:outline-none focus:ring-2 ${formErrors.fullName ? 'focus:ring-red-500' : 'focus:ring-primary'} transition-all`}
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
                className={`w-full px-4 py-3 rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} bg-white focus:outline-none focus:ring-2 ${formErrors.email ? 'focus:ring-red-500' : 'focus:ring-primary'} transition-all`}
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
              </label>
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, countryCode: e.target.value }));
                    setFormErrors(prev => ({ ...prev, whatsapp: '' }));
                  }}
                  className="w-24 px-3 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="351">🇵🇹 +351</option>
                  <option value="55">🇧🇷 +55</option>
                </select>
                <div className="relative flex-1">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleWhatsAppChange}
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border ${formErrors.whatsapp ? 'border-red-500' : 'border-gray-300'} bg-white focus:outline-none focus:ring-2 ${formErrors.whatsapp ? 'focus:ring-red-500' : 'focus:ring-primary'} transition-all`}
                    placeholder={formData.countryCode === '351' ? '912 345 678' : '11 98765 4321'}
                  />
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-600">
                {formData.countryCode === '351'
                  ? 'Digite seu número WhatsApp português (9 dígitos)'
                  : 'Digite seu número WhatsApp brasileiro (com DDD)'}
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
                  name="gdprConsent" // Added name attribute
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
                  <Link
                    to="/privacy-policy"
                    className="text-primary hover:text-primary-dark ml-1"
                  >
                    Política de Privacidade
                  </Link>
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
  );
};

export default ContactForm;