// Array inicial de produtos com ID único (TAREFA 4)
let produtos = [
    {
        id: 1,
        nome: "Notebook Pro 15",
        categoria: "Eletrônicos",
        preco: 4500.00,
        estoque: 10,
        status: "Ativo",
        descricao: "Notebook de alta performance para trabalho e estudos."
    },
    {
        id: 2,
        nome: "Fone Bluetooth Air",
        categoria: "Acessórios",
        preco: 250.00,
        estoque: 25,
        status: "Ativo",
        descricao: "Fone sem fio com cancelamento de ruído ativo."
    },
    {
        id: 3,
        nome: "Smartwatch Fit",
        categoria: "Wearables",
        preco: 590.00,
        estoque: 15,
        status: "Ativo",
        descricao: "Relógio inteligente para monitoramento de saúde e treinos."
    },
    {
        id: 4,
        nome: "Câmera Ultra 4K",
        categoria: "Fotografia",
        preco: 3200.00,
        estoque: 5,
        status: "Inativo",
        descricao: "Câmera compacta com gravação em altíssima definição."
    },
    {
        id: 5,
        nome: "Mochila Tech Impermeável",
        categoria: "Acessórios",
        preco: 220.00,
        estoque: 30,
        status: "Ativo",
        descricao: "Mochila reforçada com compartimento para notebook."
    }
];

// TAREFA 5: Atualiza os cards de resumo de métricas
function atualizarResumo(lista = produtos) {
    const totalProdutosEl = document.getElementById("totalProdutos");
    const produtosAtivosEl = document.getElementById("produtosAtivos");
    const valorEstoqueEl = document.getElementById("valorEstoque");

    if (!totalProdutosEl || !produtosAtivosEl || !valorEstoqueEl) return;

    const total = lista.length;
    const ativos = lista.filter(p => p.status === "Ativo").length;
    const valorTotal = lista.reduce((acc, p) => acc + (p.preco * p.estoque), 0);

    totalProdutosEl.innerText = total;
    produtosAtivosEl.innerText = ativos;
    valorEstoqueEl.innerText = `R$ ${valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// TAREFA 1: Função renderizarProdutos() para atualizar a tela sempre que o array mudar
function renderizarProdutos(listaParaExibir = produtos) {
    const container = document.getElementById("listaProdutos");
    if (!container) return;

    container.innerHTML = "";

    // Atualiza os cards estatísticos
    atualizarResumo(produtos);

    if (listaParaExibir.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5 text-muted">
                <p class="h5">Nenhum produto encontrado.</p>
            </div>
        `;
        return;
    }

    listaParaExibir.forEach((produto) => {
        const col = document.createElement("div");
        col.className = "col-12 col-md-6 col-lg-4 mb-4";

        col.innerHTML = `
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title text-dark font-weight-bold mb-0">${produto.nome}</h5>
                            <span class="badge ${produto.status === 'Ativo' ? 'bg-success' : 'bg-secondary'}">${produto.status}</span>
                        </div>
                        <p class="text-muted small mb-1"><strong>Categoria:</strong> ${produto.categoria}</p>
                        <p class="text-muted small mb-1"><strong>Estoque:</strong> ${produto.estoque} unidades</p>
                        <p class="text-muted small mb-2"><strong>Preço Un.:</strong> R$ ${Number(produto.preco).toFixed(2).replace('.', ',')}</p>
                    </div>

                    <div>
                        <div class="mt-3 pt-3 border-top d-flex justify-content-between align-items-center mb-3">
                            <span class="text-muted small">Total em Estoque:</span>
                            <span class="h6 mb-0 text-primary fw-bold">R$ ${(produto.preco * produto.estoque).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>

                        <!-- TAREFA 3: Botões de ação para Editar e Excluir -->
                        <div class="d-flex gap-2">
                            <button onclick="editarProduto(${produto.id})" class="btn btn-sm btn-outline-warning w-50">Editar</button>
                            <button onclick="excluirProduto(${produto.id})" class="btn btn-sm btn-outline-danger w-50">Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(col);
    });
}

// TAREFA 2: Filtrar produtos pelo nome através do campo de busca
function buscarProdutos() {
    const campoBusca = document.getElementById("campoBusca");
    if (!campoBusca) return;

    const termo = campoBusca.value.toLowerCase().trim();
    const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(termo));
    renderizarProdutos(filtrados);
}

// TAREFA 3: Excluir produto usando o ID único
function excluirProduto(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        produtos = produtos.filter(p => p.id !== id);
        buscarProdutos(); // Re-renderiza respeitando qualquer busca ativa
    }
}

// TAREFA 3: Editar produto usando o ID único
function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    const novoNome = prompt("Novo Nome do Produto:", produto.nome);
    if (novoNome === null || novoNome.trim() === "") return;

    const novoPreco = prompt("Novo Preço (R$):", produto.preco);
    if (novoPreco === null || isNaN(parseFloat(novoPreco))) return;

    const novoEstoque = prompt("Novo Estoque:", produto.estoque);
    if (novoEstoque === null || isNaN(parseInt(novoEstoque, 10))) return;

    // Atualização dos valores do objeto
    produto.nome = novoNome.trim();
    produto.preco = parseFloat(novoPreco);
    produto.estoque = parseInt(novoEstoque, 10);

    buscarProdutos(); // Atualiza a tela imediatamente
}

// Função de cadastro de produtos
function cadastrarProduto(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value;
    const preco = parseFloat(document.getElementById("preco").value);
    const estoque = parseInt(document.getElementById("estoque").value, 10);
    const status = document.getElementById("status").value;

    if (!nome || !categoria || isNaN(preco) || isNaN(estoque) || !status) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // TAREFA 4: Gerar ID único automático (timestamp + random)
    const idUnico = Date.now() + Math.floor(Math.random() * 1000);

    const novoProduto = {
        id: idUnico,
        nome: nome,
        categoria: categoria,
        preco: preco,
        estoque: estoque,
        status: status,
        descricao: `Produto cadastrado da categoria ${categoria}.`
    };

    produtos.push(novoProduto);

    const mensagemSucesso = document.getElementById("mensagemSucesso");
    if (mensagemSucesso) {
        mensagemSucesso.classList.remove("d-none");
        setTimeout(() => mensagemSucesso.classList.add("d-none"), 4000);
    }

    document.getElementById("formCadastro").reset();
}

// Event Listeners Globais
document.addEventListener("DOMContentLoaded", () => {
    renderizarProdutos();

    const formCadastro = document.getElementById("formCadastro");
    if (formCadastro) {
        formCadastro.addEventListener("submit", cadastrarProduto);
    }

    // TAREFA 2: Evento de digitação na busca
    const campoBusca = document.getElementById("campoBusca");
    if (campoBusca) {
        campoBusca.addEventListener("input", buscarProdutos);
    }
});