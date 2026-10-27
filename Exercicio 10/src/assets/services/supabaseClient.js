// Simulação de Cliente Supabase / Persistência Local Avançada para o Projeto
// Nota: Em produção real, utilize createClient de '@supabase/supabase-js' com suas credenciais.

const CHAVE_STORAGE = "taskmaster_pro_supabase_db";

export const supabase = {
  // Simula consulta (SELECT) no Supabase
  async from(tabela) {
    return {
      async select() {
        try {
          const dadosSalvos = localStorage.getItem(`${CHAVE_STORAGE}_${tabela}`);
          const data = dadosSalvos ? JSON.parse(dadosSalvos) : [
            { id: 1, titulo: 'Configurar Banco Supabase', descricao: 'Estabelecer conexão com tabelas relacionais.', prioridade: 'Alta', concluida: true, origem: 'Banco' },
            { id: 2, titulo: 'Validar Autenticação e RLS', descricao: 'Garantir segurança nas requisições.', prioridade: 'Média', concluida: false, origem: 'Banco' }
          ];
          return { data, error: null };
        } catch (error) {
          return { data: [], error };
        }
      },
      async insert(novaTarefa) {
        try {
          const dadosSalvos = localStorage.getItem(`${CHAVE_STORAGE}_${tabela}`);
          let lista = dadosSalvos ? JSON.parse(dadosSalvos) : [];
          const itemComId = { id: Date.now(), ...novaTarefa, origem: 'Banco' };
          lista.unshift(itemComId);
          localStorage.setItem(`${CHAVE_STORAGE}_${tabela}`, JSON.stringify(lista));
          return { data: [itemComId], error: null };
        } catch (error) {
          return { data: null, error };
        }
      },
      async delete(id) {
        try {
          const dadosSalvos = localStorage.getItem(`${CHAVE_STORAGE}_${tabela}`);
          if (dadosSalvos) {
            let lista = JSON.parse(dadosSalvos);
            lista = lista.filter(item => item.id !== id);
            localStorage.setItem(`${CHAVE_STORAGE}_${tabela}`, JSON.stringify(lista));
          }
          return { error: null };
        } catch (error) {
          return { error };
        }
      }
    };
  }
};