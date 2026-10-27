import React from 'react';

export default function Hero() {
  return (
    <header id="home" className="bg-primary text-white text-center py-5 shadow-sm">
      <div className="container py-4">
        <h1 className="display-4 fw-bold mb-3">Gerencie Projetos e Tarefas com Eficiência</h1>
        <p className="lead mb-4 col-lg-8 mx-auto">
          O <strong>TaskMaster Pro</strong> é a solução definitiva em React para organizar fluxos de trabalho, acompanhar prazos e impulsionar a produtividade da sua equipe em tempo real.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <a href="#features" className="btn btn-light btn-lg fw-bold text-primary px-4">Ver Recursos</a>
          <a href="#dashboard" className="btn btn-outline-light btn-lg fw-bold px-4">Acessar Painel</a>
        </div>
      </div>
    </header>
  );
}