// TAREFA 1: Array com pelo menos cinco produtos fictícios
const produtos = [
    {
        nome: "Notebook Pro 15",
        preco: 4500.00,
        categoria: "Eletrônicos",
        descricao: "Notebook de alta performance para trabalho e estudos."
    },
    {
        nome: "Fone Bluetooth Air",
        preco: 250.00,
        categoria: "Acessórios",
        descricao: "Fone sem fio com cancelamento de ruído ativo."
    },
    {
        nome: "Smartwatch Fit",
        preco: 590.00,
        categoria: "Wearables",
        descricao: "Relógio inteligente para monitoramento de saúde e treinos."
    },
    {
        nome: "Câmera Ultra 4K",
        preco: 3200.00,
        categoria: "Fotografia",
        descricao: "Câmera compacta com gravação em altíssima definição."
    },
    {
        nome: "Mochila Tech Impermeável",
        preco: 220.00,
        categoria: "Acessórios",
        descricao: "Mochila reforçada com compartimento para notebook."
    }
];

// Função para exibir a lista de produtos dinamicamente na página lista.html
function renderizarProdutos() {
    // TAREFA 2: Capturar a área id="listaProdutos"
    const container = document.getElementById("listaProdutos");

    // Garantir que a execução só ocorra na página lista.html
    if (!container) return;

    // Limpar conteúdo anterior
    container.innerHTML = "";

    // TAREFA 3 e 4: Percorrer o array com forEach e montar os cards dinamicamente
    produtos.forEach((produto) => {
        // TAREFA 5: Estrutura de grid responsiva usando Bootstrap (col-12, col-md-6, col-lg-4)
        const col = document.createElement("div");
        col.className = "col-12 col-md-6 col-lg-4 mb-4";

        col.innerHTML = `
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title text-dark font-weight-bold mb-0">${produto.nome}</h5>
                            <span class="badge bg-primary">${produto.categoria}</span>
                        </div>
                        <p class="card-text text-muted small">${produto.descricao}</p>
                    </div>
                    <div class="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                        <span class="text-muted small">Preço:</span>
                        <span class="h5 mb-0 text-success fw-bold">R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(col);
    });
}

// Executar a renderização após o carregamento do DOM
document.addEventListener("DOMContentLoaded", renderizarProdutos);