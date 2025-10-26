import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AppRoutes from './components/AppRoutes';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
      <BrowserRouter>
        <NavBar />
        <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <AppRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
