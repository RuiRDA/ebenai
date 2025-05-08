import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import routing components

// Import section components
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import StepsSection from './components/StepsSection';
import ReviewsSection from './components/ReviewsSection'; // Added import for ReviewsSection
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import FAQSection from './FAQSection'; // Keep existing import
import PrivacyPolicy from './PrivacyPolicy'; // Keep existing import

// Main page component, now much simpler
function MainPage() {
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

      <Header />
      <main> {/* Wrap sections in main for semantic HTML */}
        <Hero />
        <ServicesSection />
        <AboutSection />
        <StepsSection />
        <ReviewsSection /> {/* Added ReviewsSection component */}
        <ContactForm />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}

// App component remains the same for routing
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}

export default App;