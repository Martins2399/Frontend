document.addEventListener('DOMContentLoaded', () => {
    const inputCep = document.querySelector('#cep');
    
    if (inputCep) {
        // Dispara a consulta ao sair do campo de CEP (blur) ou quando atingir 8 dígitos
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
});

// TAREFA 4, 5, 6, 7 e 8: Função consultarCEP usando fetch na API ViaCEP
async function consultarCEP(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Erro ao consultar o serviço de CEP.');
        }

        const dados = await response.json();

        // TAREFA 8: Verificar se o CEP não foi encontrado pela API
        if (dados.erro) {
            mostrarAlertaCep("CEP não encontrado na base de dados dos Correios.", "warning");
            limparCamposEndereco();
            return;
        }

        // TAREFA 7: Preencher automaticamente rua, bairro, cidade e estado
        document.querySelector('#rua').value = dados.logradouro || '';
        document.querySelector('#bairro').value = dados.bairro || '';
        document.querySelector('#cidade').value = dados.localidade || '';
        document.querySelector('#estado').value = dados.uf || '';

        // Ocultar alerta caso estivesse visível
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