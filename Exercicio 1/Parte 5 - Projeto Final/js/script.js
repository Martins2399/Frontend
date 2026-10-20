// Interação simples em JavaScript atrelada ao botão na página
document.getElementById('meuBotao').addEventListener('click', function() {
    const mensagem = document.getElementById('mensagemInterativa');
    mensagem.textContent = "Parabéns! Você acionou a interação em JavaScript com sucesso!";
    mensagem.style.color = "#2a9d8f";
});