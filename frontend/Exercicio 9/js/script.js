document.addEventListener('DOMContentLoaded', () => {
    // Código anterior (Consulta CEP e Cadastro)
    const inputCep = document.querySelector('#cep');
    if (inputCep) {
        inputCep.addEventListener('blur', () => {
            const cepLimpo = inputCep.value.replace(/\D/g, '');
            if (cepLimpo.length === 8) {
                consultarCEP(cepLimpo);
            } else if (cepLimpo.length > 0) {
                mostrarAlertaCep("CEP inválido. Digite 8 dígitos numéricos.", "danger");
            }
        });
    }

    const formCadastro = document.querySelector('#formCadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Cadastro realizado com sucesso!');
            formCadastro.reset();
        });
    }

    // Inicialização da Página de Demonstração de API (api-demo.html)
    const listaDemoTarefas = document.querySelector('#listaDemoTarefas');
    if (listaDemoTarefas) {
        carregarTarefasDemo();

        const btnRecarregar = document.querySelector('#btnRecarregar');
        if (btnRecarregar) {
            btnRecarregar.addEventListener('click', carregarTarefasDemo);
        }
    }
});

// Função de Consulta de CEP (Parte 2)
async function consultarCEP(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao consultar o serviço de CEP.');
        const dados = await response.json();

        if (dados.erro) {
            mostrarAlertaCep("CEP não encontrado na base de dados dos Correios.", "warning");
            limparCamposEndereco();
            return;
        }

        document.querySelector('#rua').value = dados.logradouro || '';
        document.querySelector('#bairro').value = dados.bairro || '';
        document.querySelector('#cidade').value = dados.localidade || '';
        document.querySelector('#estado').value = dados.uf || '';
        ocultarAlertaCep();
    } catch (error) {
        console.error("Erro na requisição:", error);
        mostrarAlertaCep("Não foi possível realizar a consulta do CEP. Verifique sua conexão.", "danger");
        limparCamposEndereco();
    }
}

function limparCamposEndereco() {
    document.querySelector('#rua').value = '';
    document.querySelector('#bairro').value = '';
    document.querySelector('#cidade').value = '';
    document.querySelector('#estado').value = '';
}

function mostrarAlertaCep(mensagem, tipo) {
    const alerta = document.querySelector('#alertaCep');
    if (alerta) {
        alerta.className = `alert alert-${tipo}`;
        alerta.innerText = mensagem;
        alerta.classList.remove('d-none');
    }
}

function ocultarAlertaCep() {
    const alerta = document.querySelector('#alertaCep');
    if (alerta) {
        alerta.classList.add('d-none');
        alerta.innerText = '';
    }
}

// ==========================================
// PARTE 3: DEMONSTRAÇÃO DE API (JSONPlaceholder)
// ==========================================

async function carregarTarefasDemo() {
    const container = document.querySelector('#listaDemoTarefas');
    const alertaApi = document.querySelector('#alertaApi');

    if (!container) return;

    // Estado de carregamento
    container.innerHTML = `
        <div class="col-12 text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Carregando...</span>
            </div>
            <p class="text-muted mt-2">Buscando tarefas da API...</p>
        </div>
    `;

    if (alertaApi) alertaApi.classList.add('d-none');

    try {
        // TAREFA 4 e 5: Fetch e response.json()
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const todasTarefas = await response.json();

        // TAREFA 6: Pegar pelo menos 6 tarefas (ex: as primeiras 6)
        const tarefasLimitadas = todasTarefas.slice(0, 6);

        container.innerHTML = '';

        tarefasLimitadas.forEach(tarefa => {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-4';

            // TAREFA 7: Mostrar se cada tarefa está concluída ou pendente com badges visuais
            const statusBadge = tarefa.completed 
                ? '<span class="badge bg-success">Concluída</span>' 
                : '<span class="badge bg-warning text-dark">Pendente</span>';

            col.innerHTML = `
                <div class="card h-100 shadow-sm border-0">
                    <div class="card-body d-flex flex-column justify-content-between p-3">
                        <div>
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <span class="text-muted small">ID: #${tarefa.id}</span>
                                ${statusBadge}
                            </div>
                            <h5 class="card-title text-dark fw-bold fs-6 mb-3">${tarefa.title}</h5>
                        </div>
                        <div class="pt-2 border-top text-muted small">
                            Usuário ID: ${tarefa.userId}
                        </div>
                    </div>
                </div>
            `;

            container.appendChild(col);
        });

    } catch (error) {
        // TAREFA 8: Tratamento de erro com try/catch
        console.error("Erro ao carregar tarefas da API:", error);
        container.innerHTML = '';
        if (alertaApi) {
            alertaApi.className = "alert alert-danger";
            alertaApi.innerText = "Erro ao carregar dados da API externa. Verifique sua conexão ou tente novamente mais tarde.";
            alertaApi.classList.remove('d-none');
        }
    }
}