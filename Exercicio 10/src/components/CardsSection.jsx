import React from 'react';

export default function CardsSection() {
  const recursos = [
    {
      titulo: "Gestão por Prioridade",
      descricao: "Classifique suas tarefas pendentes e concluídas em níveis de urgência (Alta, Média e Baixa).",
      icone: "🎯",
      badge: "Produtividade"
    },
    {
      titulo: "Acompanhamento em Tempo Real",
      descricao: "Monitore o progresso geral dos projetos e métricas de conclusão de forma totalmente visual.",
      icone: "📊",
      badge: "Analytics"
    },
    {
      titulo: "Interface Responsiva",
      descricao: "Desenvolvido com Bootstrap 5 e React para rodar perfeitamente em desktops, tablets e smartphones.",
      icone: "📱",
      badge: "Moderno"
    }
  ];

  return (
    <section id="features" className="container my-5 py-4">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-dark">Recursos Principais do TaskMaster Pro</h2>
        <p className="text-muted">Tudo o que você precisa para manter o controle absoluto das suas demandas.</p>
      </div>

      <div className="row g-4">
        {recursos.map((rec, index) => (
          <div key={index} className="col-12 col-md-4">
            <div className="card h-100 shadow-sm border-0 p-3 text-center bg-white hover-card">
              <div className="card-body">
                <div className="display-4 mb-3">{rec.icone}</div>
                <span className="badge bg-primary mb-2">{rec.badge}</span>
                <h3 className="card-title h5 fw-bold text-dark mb-3">{rec.titulo}</h3>
                <p className="card-text text-muted">{rec.descricao}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}