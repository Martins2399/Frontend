import React, { useState } from 'react';
import CardItem from './CardItem';

export default function CardsSection() {
  // Estado inicial com array de objetos simulando tarefas do TaskMaster Pro
  const [tarefas, setTarefas] = useState([
    { id: 1, titulo: 'Configurar Arquitetura React', descricao: 'Estruturar pastas e componentes base do projeto final.', prioridade: 'Alta', concluida: true },
    { id: 2, titulo: 'Implementar Bootstrap 5', descricao: 'Aplicar classes responsivas e grid system nos componentes.', prioridade: 'Média', concluida: false },
    { id: 3, titulo: 'Criar Filtro de Tarefas', descricao: 'Adicionar interatividade usando o hook useState.', prioridade: 'Alta', concluida: false },
    { id: 4, titulo: 'Otimizar responsividade mobile', descricao: 'Testar visualização em diferentes tamanhos de tela.', prioridade: 'Baixa', concluida: false },
  ]);

  // Estado para controlar o filtro ativo ('todas', 'pendentes', 'concluidas')
  const [filtro, setFiltro] = useState('todas');

  // Funções de Interação (useState)
  const toggleConcluida = (id) => {
    setTarefas(tarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t));
  };

  const excluirTarefa = (id) => {
    setTarefas(tarefas.filter(t => t.id !== id));
  };

  // Filtragem dinâmica com base no estado 'filtro'
  const tarefasFiltradas = tarefas.filter(t => {
    if (filtro === 'pendentes') return !t.concluida;
    if (filtro === 'concluidas') return t.concluida;
    return true; // 'todas'
  });

  return (
    <section id="dashboard" className="container my-5 py-4">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-dark">Painel de Tarefas Dinâmico</h2>
        <p className="text-muted">Gerencie suas demandas utilizando componentes com props e estado em React.</p>
      </div>

      {/* Botões de Filtro (Interação com useState) */}
      <div className="d-flex justify-content-center gap-2 mb-5">
        <button 
          onClick={() => setFiltro('todas')} 
          className={`btn ${filtro === 'todas' ? 'btn-primary' : 'btn-outline-primary'} fw-bold px-3`}
        >
          Todas ({tarefas.length})
        </button>
        <button 
          onClick={() => setFiltro('pendentes')} 
          className={`btn ${filtro === 'pendentes' ? 'btn-warning text-dark' : 'btn-outline-warning'} fw-bold px-3`}
        >
          Pendentes ({tarefas.filter(t => !t.concluida).length})
        </button>
        <button 
          onClick={() => setFiltro('concluidas')} 
          className={`btn ${filtro === 'concluidas' ? 'btn-success' : 'btn-outline-success'} fw-bold px-3`}
        >
          Concluídas ({tarefas.filter(t => t.concluida).length})
        </button>
      </div>

      {/* Renderização condicional dos Cards via Props */}
      <div className="row g-4">
        {tarefasFiltradas.length > 0 ? (
          tarefasFiltradas.map(tarefa => (
            <CardItem 
              key={tarefa.id} 
              tarefa={tarefa} 
              onToggleConcluida={toggleConcluida} 
              onExcluir={excluirTarefa} 
            />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className="text-muted fs-5">Nenhuma tarefa encontrada para este filtro.</p>
          </div>
        )}
      </div>
    </section>
  );
}