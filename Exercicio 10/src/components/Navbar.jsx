import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold fs-4" href="#home">🚀 TaskMaster Pro</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link active" href="#home">Início</a></li>
            <li className="nav-item"><a className="nav-link" href="#features">Recursos</a></li>
            <li className="nav-item"><a className="nav-link" href="#dashboard">Dashboard</a></li>
            <li className="nav-item"><a className="nav-link" href="#contato">Contato</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}