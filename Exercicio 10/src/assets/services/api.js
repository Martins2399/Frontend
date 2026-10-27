// Serviço para consumo de API externa (JSONPlaceholder / Tarefas Públicas)
export async function buscarTarefasExternas() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }
    const dados = await response.json();
    // Mapeando para o formato padrão do TaskMaster Pro
    return dados.map(item => ({
      id: `api-${item.id}`,
      titulo: item.title,
      descricao: `Tarefa importada da API externa (User ID: ${item.userId})`,
      prioridade: item.completed ? 'Baixa' : 'Média',
      concluida: item.completed,
      origem: 'API Externa'
    }));
  } catch (error) {
    console.error("Erro ao buscar tarefas da API externa:", error);
    return [];
  }
}