# Exercício 2 - Comparação entre Layout em Tabela e Layout Semântico

## 1. Por que o Table-Based Layout é uma técnica antiga?
O uso de tabelas (`<table>`) para criar layouts completos de páginas web era comum nos anos 1990 e início dos anos 2000 devido à falta de recursos avançados de CSS na época. Essa prática tornou-se obsoleta porque:
* **Falta de Semântica:** As tabelas foram criadas exclusivamente para exibir dados tabulares (como planilhas), e não para estruturar o design de uma página.
* **Inacessibilidade:** Leitores de tela para pessoas com deficiência visual têm grande dificuldade em navegar por páginas que usam tabelas aninhadas para posicionamento visual.
* **Dificuldade de Manutenção e Responsividade:** Alterar o visual exigia modificar todo o código HTML. Além disso, reordenar colunas em telas de celulares era extremamente complexo.

## 2. Dificuldades Encontradas na Adaptação
* **Rigidez de Estilo:** Necessidade de utilizar atributos visuais obsoletos diretamente no HTML (como `border`, `cellpadding`, `width`, `colspan`).
* **Código Poluído:** A estrutura rápida fica cheia de tags `<tr>` e `<td>` misturando conteúdo e apresentação visual no mesmo arquivo.

## 3. Comparação com a Estrutura Semântica Moderna
| Aspecto | Layout em Tabela (Antigo) | Estrutura Semântica Moderna |
| :--- | :--- | :--- |
| **Tags Utilizadas** | `<table>`, `<tr>`, `<td>`, `<th>` | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` |
| **Organização** | Conteúdo e layout misturados | Separação clara entre HTML (estrutura) e CSS (estilo) |
| **Acessibilidade** | Baixa acessibilidade | Alta acessibilidade para leitores de tela e SEO |
| **Responsividade** | Muito difícil em dispositivos móveis | Fácil adaptação com CSS (Flexbox / CSS Grid) |