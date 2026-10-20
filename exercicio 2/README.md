# Exercício 2 - Comparação entre Divs e HTML Semântico

## 1. Diferença entre `<div>` e HTML Semântico

* **Tag `<div>`**:
  - É um contêiner **genérico** e sem valor semântico.
  - Não passa nenhuma informação para o navegador, leitores de tela ou mecanismos de busca (SEO) sobre o tipo de conteúdo que contém.
  - Deve ser usada como última opção, apenas para fins de agrupamento e estilização quando não houver tag específica.

* **HTML Semântico** (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`):
  - Oferece **significado explícito** ao conteúdo.
  - Melhora drasticamente a **acessibilidade** (ajudando leitores de tela para pessoas com deficiência visual).
  - Facilita a **manutenção do código** e a leitura por outros desenvolvedores.
  - Otimiza o **SEO**, ajudando motores de busca (como o Google) a indexar a página corretamente.

---

## 2. Estrutura Utilizada na Parte 2

* `<header>`: Cabeçalho com o título principal.
* `<nav>`: Menu de navegação com lista de links.
* `<main>`: Conteúdo principal único do documento.
* `<section>`: Seções temáticas ("Sobre" e "Módulos").
* `<article>`: Blocos de conteúdo autônomo dentro dos módulos.
* `<footer>`: Rodapé do documento.