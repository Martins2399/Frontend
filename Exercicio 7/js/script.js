// Array inicial de produtos
const produtos = [
    {
        nome: "Notebook Pro 15",
        categoria: "Eletrônicos",
        preco: 4500.00,
        estoque: 10,
        status: "Ativo",
        descricao: "Notebook de alta performance para trabalho e estudos."
    },
    {
        nome: "Fone Bluetooth Air",
        categoria: "Acessórios",
        preco: 250.00,
        estoque: 25,
        status: "Ativo",
        descricao: "Fone sem fio com cancelamento de ruído ativo."
    },
    {
        nome: "Smartwatch Fit",
        categoria: "Wearables",
        preco: 590.00,
        estoque: 15,
        status: "Ativo",
        descricao: "Relógio inteligente para monitoramento de saúde e treinos."
    },
    {
        nome: "Câmera Ultra 4K",
        categoria: "Fotografia",
        preco: 3200.00,
        estoque: 5,
        status: "Ativo",
        descricao: "Câmera compacta com gravação em altíssima definição."
    },
    {
        nome: "Mochila Tech Impermeável",
        categoria: "Acessórios",
        preco: 220.00,
        estoque: 30,
        status: "Ativo",
        descricao: "Mochila reforçada com compartimento para notebook."
    }
];

// Função para renderizar os produtos na lista.html
function renderizarProdutos() {
    const container = document.getElementById("listaProdutos");
    if (!container) return;

    container.innerHTML = "";

    produtos.forEach((produto) => {
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
                    </div>
                    <div class="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                        <span class="text-muted small">Preço:</span>
                        <span class="h5 mb-0 text-primary fw-bold">R$ ${Number(produto.preco).toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(col);
    });
}

// TAREFA 3: Função cadastrarProduto() para ler, validar e criar o objeto produto
function cadastrarProduto(event) {
    // TAREFA 2: Prevenir a recarga da página ao enviar o formulário
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value;
    const preco = parseFloat(document.getElementById("preco").value);
    const estoque = parseInt(document.getElementById("estoque").value, 10);
    const status = document.getElementById("status").value;

    // Validação básica dos campos
    if (!nome || !categoria || isNaN(preco) || isNaN(estoque) || !status) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Montar o objeto produto
    const novoProduto = {
        nome: nome,
        categoria: categoria,
        preco: preco,
        estoque: estoque,
        status: status,
        descricao: `Produto cadastrado da categoria ${categoria}.`
    };

    // TAREFA 4: Adicionar o novo objeto ao array produtos usando push()
    produtos.push(novoProduto);

    // TAREFA 5: Mostrar mensagem de sucesso e limpar o formulário
    const mensagemSucesso = document.getElementById("mensagemSucesso");
    if (mensagemSucesso) {
        mensagemSucesso.classList.remove("d-none");

        setTimeout(() => {
            mensagemSucesso.classList.add("d-none");
        }, 4000);
    }

    // Limpar os campos do formulário
    document.getElementById("formCadastro").reset();
}

// Event Listeners para inicialização dos scripts na página correspondente
document.addEventListener("DOMContentLoaded", () => {
    // Renderiza a lista se estiver em lista.html
    renderizarProdutos();

    // TAREFA 2: Capturar o evento submit do formulário se estiver em cadastro.html
    const formCadastro = document.getElementById("formCadastro");
    if (formCadastro) {
        formCadastro.addEventListener("submit", cadastrarProduto);
    }
});