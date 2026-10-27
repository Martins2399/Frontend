import React from 'react';

export default function CardItem({ tarefa, onToggleConcluida, onExcluir }) {
  const badgePrioridade = 
    tarefa.prioridade === 'Alta' ? 'bg-danger' : 
    tarefa.prioridade === 'Média' ? 'bg-warning text-dark' : 'bg-info text-dark';

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className={`card h-100 shadow-sm border-0 p-3 bg-white hover-card ${tarefa.concluida ? 'border-success opacity-75' : ''}`}>
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className={`badge ${badgePrioridade}`}>{tarefa.prioridade}</span>
              <span className={`badge ${tarefa.concluida ? 'bg-success' : 'bg-secondary'}`}>
                {tarefa.concluida ? 'Concluída' : 'Pendente'}
              </span>
            </div>
            <h3 className={`card-title h5 fw-bold text-dark mb-2 ${tarefa.concluida ? 'text-decoration-line-through text-muted' : ''}`}>
              {tarefa.titulo}
            </h3>
            <p className="card-text text-muted small mb-3">{tarefa.descricao}</p>
          </div>

          <div className="d-flex gap-2 pt-2 border-top">
            <button 
              onClick={() => onToggleConcluida(tarefa.id)} 
              className={`btn btn-sm ${tarefa.concluida ? 'btn-outline-secondary' : 'btn-success'} flex-fill fw-bold`}
            >
              {tarefa.concluida ? 'Desmarcar' : 'Concluir'}
            </button>
            <button 
              onClick={() => onExcluir(tarefa.id)} 
              className="btn btn-sm btn-outline-danger flex-fill fw-bold"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}