import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CardsSection from './components/CardsSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />
      <main className="flex-fill">
        <Hero />
        <CardsSection />
      </main>
      <Footer />
    </div>
  );
}