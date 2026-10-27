import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';
import { buscarTarefasExternas } from '../services/api';
import { supabase } from '../services/supabaseClient';

export default function CardsSection() {
  const [tarefas, setTarefas] = useState([]);
  const [filtro, setFiltro] = useState('todas');
  const [carregandoApi, setCarregandoApi] = useState(false);

  // Carregar dados do Banco (Supabase) ao iniciar o componente
  useEffect(() => {
    async function carregarDadosBanco() {
      const { data, error } = await supabase.from('tarefas').select();
      if (!error && data) {
        setTarefas(data);
      }
    }
    carregarDadosBanco();
  }, []);

  // Função para importar tarefas da API Externa com fetch
  const handleImportarApi = async () => {
    setCarregandoApi(true);
    const tarefasApi = await buscarTarefasExternas();
    // Adiciona as tarefas da API sem duplicar se já existirem
    setTarefas(prev => [...tarefasApi, ...prev]);
    setCarregandoApi(false);
  };

  const toggleConcluida = (id) => {
    setTarefas(tarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t));
  };

  const excluirTarefa = async (id) => {
    await supabase.from('tarefas').delete(id);
    setTarefas(tarefas.filter(t => t.id !== id));
  };

  const tarefasFiltradas = tarefas.filter(t => {
    if (filtro === 'pendentes') return !t.concluida;
    if (filtro === 'concluidas') return t.concluida;
    return true;
  });

  return (
    <section id="dashboard" className="container my-5 py-4">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-dark">Painel Integrado (API & Banco de Dados)</h2>
        <p className="text-muted">Gerencie dados sincronizados com o Supabase e consuma endpoints REST externos via fetch.</p>
      </div>

      {/* Botões de Ação e Sincronização */}
      <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
        <button 
          onClick={handleImportarApi} 
          disabled={carregandoApi}
          className="btn btn-dark fw-bold px-4"
        >
          {carregandoApi ? 'Sincronizando API...' : '📥 Importar Tarefas da API'}
        </button>
      </div>

      {/* Botões de Filtro */}
      <div className="d-flex justify-content-center gap-2 mb-5">
        <button onClick={() => setFiltro('todas')} className={`btn ${filtro === 'todas' ? 'btn-primary' : 'btn-outline-primary'} fw-bold px-3`}>
          Todas ({tarefas.length})
        </button>
        <button onClick={() => setFiltro('pendentes')} className={`btn ${filtro === 'pendentes' ? 'btn-warning text-dark' : 'btn-outline-warning'} fw-bold px-3`}>
          Pendentes ({tarefas.filter(t => !t.concluida).length})
        </button>
        <button onClick={() => setFiltro('concluidas')} className={`btn ${filtro === 'concluidas' ? 'btn-success' : 'btn-outline-success'} fw-bold px-3`}>
          Concluídas ({tarefas.filter(t => t.concluida).length})
        </button>
      </div>

      {/* Renderização dos Cards */}
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
            <p className="text-muted fs-5">Nenhuma tarefa encontrada.</p>
          </div>
        )}
      </div>
    </section>
  );
}