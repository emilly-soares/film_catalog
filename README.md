# 🎬 Catálogo de Filmes

## Descrição

Este é um projeto de catálogo de filmes desenvolvido em React.js e Typescript, utilizando uma variedade de Hooks para gerenciar o estado e o ciclo de vida dos componentes. A aplicação permite listar, adicionar, editar, e excluir filmes, além de exibir detalhes sobre cada filme.

## Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu ambiente.

## Como Executar

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/emilly-soares/film_catalog.git
    ```

2. **Navegue até o diretório do projeto:**

    ```bash
    cd film-catalog
    ```

3. **Instale as dependências:**

    ```bash
    npm install
    ```

4. **Execute a aplicação:**

    ```bash
    npm run dev
    ```

5. **Abra o navegador e acesse o link disbonibilizado no terminal para visualizar a aplicação.**

## Funcionalidades

- **Lista de Filmes:** Exibe uma lista de filmes com título e imagem do cartaz.

- **Detalhes do Filme:** Ao clicar em um filme, exibe detalhes adicionais como sinopse, elenco, avaliação, categoria, estreia, e duração.

- **Cadastro de Filmes:** Permite cadastrar novos filmes através de um formulário.

- **Edição de Filmes:** Permite editar informações de filmes existentes.

- **Exclusão de Filmes:** Permite remover filmes da lista.

## Requisitos Técnicos

- **Utilização de useMemo:** Otimiza o desempenho na renderização da lista de filmes.

- **Utilização de useRef:** Referencia elementos DOM necessários, como o botão "Voltar ao topo".

- **Utilização de useCallback:** Evita a criação desnecessária de funções anônimas, otimizando as funções de manipulação de eventos.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está sob a licença [MIT](LICENSE).
