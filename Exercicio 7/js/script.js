// Chave do localStorage
const CHAVE_LOCAL_STORAGE = "techstore_produtos";

// Array inicial de produtos padrão para inicializar o sistema caso o localStorage esteja vazio
const produtosIniciais = [
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

// Variable global que armazenará os produtos carregados
let produtos = [];

// TAREFA 1: Implementar salvarProdutos() usando localStorage.setItem e JSON.stringify
function salvarProdutos() {
    localStorage.setItem(CHAVE_LOCAL_STORAGE, JSON.stringify(produtos));
}

// TAREFA 2: Implementar carregarProdutos() usando localStorage.getItem e JSON.parse
function carregarProdutos() {
    const dadosSalvos = localStorage.getItem(CHAVE_LOCAL_STORAGE);
    if (dadosSalvos) {
        try {
            produtos = JSON.parse(dadosSalvos);
        } catch (e) {
            console.error("Erro ao carregar dados do localStorage:", e);
            produtos = [...produtosIniciais];
            salvarProdutos();
        }
    } else {
        // Se não houver dados, carrega os produtos padrão e salva no localStorage
        produtos = [...produtosIniciais];
        salvarProdutos();
    }
}

// Atualiza os cards estatísticos de resumo
function atualizarResumo(lista = produtos) {
    const totalProdutosEl = document.getElementById("totalProdutos");
    const produtosAtivosEl = document.getElementById("produtosAtivos");
    const valorEstoqueEl = document.getElementById("valorEstoque");

    if (!totalProdutosEl || !produtosAtivosEl || !valorEstoqueEl) return;

    const total = lista.length;
    const ativos = lista.filter(p => p.status === "Ativo").length;
    const valorTotal = lista.reduce((acc, p) => acc + (Number(p.preco) * Number(p.estoque)), 0);

    totalProdutosEl.innerText = total;
    produtosAtivosEl.innerText = ativos;
    valorEstoqueEl.innerText = `R$ ${valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Renderiza a lista de produtos na interface
function renderizarProdutos(listaParaExibir = produtos) {
    const container = document.getElementById("listaProdutos");
    if (!container) return;

    container.innerHTML = "";
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
                            <span class="h6 mb-0 text-primary fw-bold">R$ ${(Number(produto.preco) * Number(produto.estoque)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>

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

// Função de busca
function buscarProdutos() {
    const campoBusca = document.getElementById("campoBusca");
    if (!campoBusca) return;

    const termo = campoBusca.value.toLowerCase().trim();
    const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(termo));
    renderizarProdutos(filtrados);
}

// TAREFA 3: Excluir produto e atualizar o localStorage
function excluirProduto(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        produtos = produtos.filter(p => p.id !== id);
        salvarProdutos(); // Atualiza o localStorage
        buscarProdutos(); // Re-renderiza a tela
    }
}

// TAREFA 3: Editar produto e atualizar o localStorage
function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    const novoNome = prompt("Novo Nome do Produto:", produto.nome);
    if (novoNome === null || novoNome.trim() === "") return;

    const novoPreco = prompt("Novo Preço (R$):", produto.preco);
    if (novoPreco === null || isNaN(parseFloat(novoPreco))) return;

    const novoEstoque = prompt("Novo Estoque:", produto.estoque);
    if (novoEstoque === null || isNaN(parseInt(novoEstoque, 10))) return;

    produto.nome = novoNome.trim();
    produto.preco = parseFloat(novoPreco);
    produto.estoque = parseInt(novoEstoque, 10);

    salvarProdutos(); // Atualiza o localStorage
    buscarProdutos(); // Atualiza a tela
}

// TAREFA 3: Cadastrar produto e atualizar o localStorage
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
    salvarProdutos(); // Salva no localStorage

    const mensagemSucesso = document.getElementById("mensagemSucesso");
    if (mensagemSucesso) {
        mensagemSucesso.classList.remove("d-none");
        setTimeout(() => mensagemSucesso.classList.add("d-none"), 4000);
    }

    document.getElementById("formCadastro").reset();
}

// Inicialização dos Scripts e Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    // TAREFA 2: Carrega os produtos salvos no localStorage
    carregarProdutos();

    // Renderiza a listagem na página lista.html
    renderizarProdutos();

    // Event listener do formulário de cadastro em cadastro.html
    const formCadastro = document.getElementById("formCadastro");
    if (formCadastro) {
        formCadastro.addEventListener("submit", cadastrarProduto);
    }

    // Event listener do campo de busca em lista.html
    const campoBusca = document.getElementById("campoBusca");
    if (campoBusca) {
        campoBusca.addEventListener("input", buscarProdutos);
    }
});