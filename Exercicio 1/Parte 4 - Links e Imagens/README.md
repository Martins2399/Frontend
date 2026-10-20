# Exercício 1 - Parte 4: Links e Imagens em HTML

## Como Identificar e Corrigir uma Imagem Quebrada no HTML

Se uma imagem não estiver sendo exibida corretamente em uma página web ou no GitHub, siga este checklist para diagnosticar e corrigir o problema:

1. **Verificar o caminho do arquivo (`src`):**
   * Confirme se o caminho relativo está correto. Se a imagem estiver em uma pasta chamada `img` no mesmo nível do HTML, o atributo deve ser `src="img/nome-da-imagem.png"`.

2. **Atenção ao Diferencial entre Maiúsculas e Minúsculas (*Case Sensitivity*):**
   * Servidores e o GitHub são sensíveis a maiúsculas/minúsculas. Certifique-se de que a extensão e o nome batem exatamente (`imagem.png` é diferente de `imagem.PNG` ou `Imagem.png`).

3. **Verificar o Envio ao Repositório (*Git*):**
   * Certifique-se de que o arquivo da imagem não foi ignorado e que foi devidamente incluído no commit (`git add .` e `git push`).

4. **Verificar o Atributo `alt`:**
   * Sempre mantenha um texto alternativo e descritivo no atributo `alt`. Se a imagem por algum motivo falhar, o usuário ou leitor de tela entenderá o conteúdo que deveria estar ali.