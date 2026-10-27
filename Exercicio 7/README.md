# Sistema de Cadastro de Produtos - Exercício 7

## Objetivo do Sistema
O **TechStore System** é uma aplicação web responsiva para gerenciamento e cadastro de produtos de uma loja fictícia. Foi desenvolvido utilizando HTML5 semântico, CSS3 externo, framework Bootstrap 5 via CDN, manipulação dinâmica do DOM em JavaScript e a API de `localStorage` para a persistência dos dados no navegador.

## Páginas e Estrutura do Projeto
- `index.html`: Página inicial com apresentação do sistema e atalhos rápidos.
- `cadastro.html`: Formulário de cadastro de novos produtos com validação.
- `lista.html`: Painel de controle com cards estáticos/resumo, campo de busca em tempo real, edição e exclusão de produtos.
- `contato.html`: Formulário para suporte e contato.
- `css/style.css`: Estilizações adicionais e personalizadas.
- `js/script.js`: Lógica do sistema, manipulação de arrays, objetos, loops e integração com `localStorage`.

## Funcionalidades Implementadas
1. **Persistência de Dados (`localStorage`):** Salva e recupera as alterações de produtos (`salvarProdutos()` e `carregarProdutos()`) para que os dados permaneçam mesmo após atualizar ou fechar o navegador.
2. **Cadastro com Validação:** Lê os dados do formulário, valida os campos e insere novos produtos no array principal com IDs únicos.
3. **Listagem e Busca em Tempo Real:** Filtra a exibição dos produtos instantaneamente pelo nome através do campo de busca.
4. **Edição e Exclusão:** Permite alterar dados (nome, preço e estoque) ou remover produtos individualmente.
5. **Dashboard de Resumo:** Calcula dinamicamente o total de itens, a quantidade de produtos ativos e o valor total estimado do estoque em R$.

## Como Executar o Projeto
1. Clone ou faça o download deste repositório (`frontend`).
2. Navegue até a pasta `frontend/Exercicio 7/`.
3. Abra o arquivo `index.html` em qualquer navegador web moderno.