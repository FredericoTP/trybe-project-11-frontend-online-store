# :computer: Trybe-11-Project-FrontEnd-Online-Store :computer:

Nesse projeto foi desenvolvida uma versão simplificada de uma loja online sem persistência no banco de dados. A pessoa usuária pode:
 - Buscar produtos por termos e categorias a partir da API do Mercado Livre;
 - Interagir com os produtos buscados de modo a adicioná-los e removê-los de um carrinho de compras em diferentes quantidades;
 - Visualizar detalhes e avaliações prévias de um produto, bem como criar novas avaliações e;
 - Simular a finalização da compra dos itens selecionados.

O projeto foi feito em equipe e trabalhamos utilizando a metodologia Kanban. Membros da equipe:
 - Frederico Tavares
 - Sophia Siqueira
 - Pedro Portilho
 - Nathalia Marana
 - Arthur Oldenburg

# Acesse o projeto clicando [aqui](https://fredericotp.github.io/trybe-project-11-frontend-online-store/)! :green_heart:

<br />

<details>
<summary>
  
## 1- Requisitos
  
</summary>
 
### 1. Implemente o módulo de acesso à api do Mercado Livre

<details>
<summary>Implemente um módulo que acessa a API do Mercado Livre:</summary>

- Utilize (**OBRIGATORIAMENTE**) o arquivo `src/services/api.js` para acessar a API do Mercado Livre em sua aplicação;
- Utilize (**OBRIGATORIAMENTE**) o módulo **[Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)** para realizar as requisições;
- <details><summary>Você deve (<b>OBRIGATORIAMENTE</b>) implementar as funções <code>getCategories()</code> e <code>getProductsFromCategoryAndQuery()</code> que estão no arquivo <code>src/services/api.js</code>:</summary>

  ```javascript
  export async function getCategories() {
    // Implemente aqui
  }
  export async function getProductsFromCategoryAndQuery(/* categoryId, query */) {
    // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
    // Essa função será chamada em vários momentos do projeto para buscar os produtos pela categoria e querys
    // Dentro da função você pode usar condicionais definir qual API utilizar
  }
  ```
  Essas funções devem realizar uma chamada para a [API do Mercado Livre](#-Documentação-da-API-do-Mercado-Livre) e retornar uma [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) com os dados de resultado. Com essa implementação, o uso dessas funções deve ser algo parecido com o exemplo abaixo:

  ```javascript
  import * as api from './services/api'
  api.getCategories().then(categories => { console.log(categories) })
  ```

  A variável `categories` deve conter o objeto JSON com as categorias obtidas através da chamada da API do Mercado Livre:

  ```json
  [
    {
        "id": "MLB5672",
        "name": "Acessórios para Veículos"
    },
    {
        "id": "MLB271599",
        "name": "Agro"
    },
    {
        "id": "MLB1403",
        "name": "Alimentos e Bebidas"
    }
  ]
  ```
  </details>
  
- Sinta-se livre para criar novas funções neste arquivo, mas apenas as funções <code>getCategories()</code> e <code>getProductsFromCategoryAndQuery()</code> serão avaliadas.
</details>

---

### 2. Crie uma página de listagem de produtos vazia

A tela principal da plataforma é a de **listagem de produtos**, onde a pessoa usuária poderá buscar produtos para adicionar ao carrinho, além de filtrar suas buscas.

<details><summary>Crie o campo de busca da tela principal, que será utilizado para listar os produtos encontrados:</summary>

  * Esta página deve ficar no path `/`, renderizável a partir do acesso ao componente `<App />`;
  * Inicialmente a listagem de produtos deve estar vazia;
  * Quando a lista estiver vazia, a página deve mostrar a mensagem `"Digite algum termo de pesquisa ou escolha uma categoria."`;
  * Adicione o atributo `data-testid` com o valor `home-initial-message` no elemento da mensagem.
</details>

---

### 3. Crie a página do carrinho de compras

A pessoa usuária poderá adicionar produtos em seu carrinho de compras, a partir da listagem dos produtos.

Crie uma tela que representará o carrinho de compras da aplicação. Além disso, na tela principal, crie um botão que redireciona à página do carrinho de compras. Inicialmente, o carrinho deve estar vazio.

<details><summary> Crie uma tela que represente o carrinho de compras:</summary>

  * Quando não existirem produtos no carrinho de compras, a página deve exibir a mensagem `"Seu carrinho está vazio"`;
  * Adicione o atributo `data-testid` com o valor `shopping-cart-empty-message` no elemento da mensagem.

</details>

<details><summary> Na tela principal, crie um elemento que redirecione a pessoa usuária à página do carrinho de compras:</summary>

  * O elemento deve estar visível na página inicial (listagem de produtos);
  * Este elemento também deverá estar presente na página de detalhes de um produto, mas não se preocupe com isso neste momento, estará descrito em um requisito posterior;
  * Adicione o atributo `data-testid` com o valor `shopping-cart-button` no elemento que redireciona à pagina de carrinho de compras. 
  
  :warning: **Atenção!** O **elemento** que faz o direcionamento para a página do carrinho é quem deve conter o `data-testid`. Se você fizer isso com um `<Link />`, por exemplo, é este quem deve conter o `data-testid`.

</details>

---

### 4. Liste as categorias de produtos disponíveis via API na página principal

A tela principal (listagem dos produtos) deve conter uma lista de categorias, que será utilizada para filtrar a busca por categoria. As categorias podem ser obtidas pela API do Mercado Livre. A requisição para essa API deve ser feita uma única vez, após o carregamento da tela.

<details><summary> Na tela principal, liste as categorias obtidas pela API do Mercado Livre:</summary>
  
  * :eyes: **De olho na dica**: Posteriormente as categorias serão utilizadas para realizar novas requisições para listar produtos. Ou seja, elas serão clicáveis para aplicar um filtro de categoria. **Sugerimos a utilização do elemento do tipo `button` ou do tipo `radio button` para listar as categorias. Por hora, neste requisito, será avaliado apenas a listagem das categorias, conforme protótipo.**
  * Adicione o atributo `data-testid` com o valor `category` nos elementos que receberão o nome da categoria. **Atenção!** Caso você opte por utilizar `radio buttons` para realizar a listagem, as `labels` dos elementos que deverão receber o `data-testid`, e não se esqueça da propriedade `htmlFor`.

</details>

---

## 5. Liste os produtos buscados por termos, com os dados resumidos, associados a esses termos

A alma da aplicação é a sua lógica de busca e listagem de produtos. Após digitar seus termos no `input` da tela principal e clicar no botão de busca, uma requisição deverá ser feita à API do Mercado Livre, tendo como parâmetros a frase digitada. Os produtos retornados pela API devem ser listados na tela.

<details><summary> Na tela principal, crie a listagem dos produtos recebidos pela API do Mercado Livre ao clicar no botão de busca:</summary>

  * A tela principal deve possuir um elemento `input` com o atributo `data-testid="query-input"`;
  * A tela principal deve possuir um elemento com o atributo `data-testid="query-button"` que, ao ser clicado, dispara a chamada para a API com o termo de busca pesquisado (ou seja, com o valor digitado no `input`);
  * Renderize na tela uma exibição resumida de todos os produtos retornados pela API, contendo o nome, a imagem e o preço de cada produto;
  * Adicione o atributo `data-testid="product"` nos elementos que possuem os dados dos produtos;
  * Caso a busca não retorne resultados, renderize na tela o texto <code>"Nenhum produto foi encontrado"</code>.
</details>

---

### 6. Selecione uma categoria e mostre somente os produtos daquela categoria

Quando a pessoa usuária clicar em uma das categorias listadas na tela principal, a aplicação deverá listar todos os produtos encontrados daquela categoria.

<details><summary> Na tela principal, ao clicar em uma das categorias listadas, crie a listagem dos produtos dessa categoria:</summary>

  * Ao clicar em uma das categorias listadas, faça uma requisição à API do Mercado Livre e renderize na tela uma exibição resumida de todos os produtos retornados dessa categoria, contendo o nome, a imagem e o preço de cada produto;
  * Adicione o atributo `data-testid="product"` nos elementos que possuem os dados dos produtos;
  * :eyes: **De olho na dica**: Lembre-se de consultar os endpoints da API para encontrar a requisição de busca por categoria (mais informações na [documentação da API](#documentação-da-api-do-mercado-livre), na seção **Desenvolvimento**).
</details>

---

### 7. Redirecione para uma tela com a exibição detalhada ao clicar na exibição resumida de um produto

Agora que a listagem dos produtos está criada, você deverá criar a página de detalhes de um produto. 

Ao clicar "no card" de um produto, a pessoa usuária deve ser direcionada para uma página contendo o nome, uma imagem, o preço e a especificação técnica desse produto. Além disso, essa página deve ter um botão que, ao clicar, a pessoa usuária deve ser redirecionada para a página do carrinho de compras.

<details><summary> Ao clicar em "um card" de um produto (o elemento com <code>data-testid="product"</code>), a pessoa usuária deve ser redirecionada para uma página contendo os detalhes do produto:</summary>

  * Adicione o atributo `data-testid="product-detail-link"` no elemento que, ao ser clicado, enviará a pessoa usuária para a página de detalhes do produto. Você deve adicionar esse atributo para todos os produtos;
  * A página de detalhes deve possuir o nome, a imagem, o preço e qualquer outra informação adicional do produto que você desejar;
  * Adicione o atributo `data-testid="product-detail-name"` no elemento que, na tela de detalhes, possui o nome do produto;
  * Adicione o atributo `data-testid="product-detail-image"` no elemento que, na tela de detalhes, possui a imagem do produto;
  * Adicione o atributo `data-testid="product-detail-price"` no elemento que, na tela de detalhes, possui o preço do produto;
  * Adicione o atributo `data-testid="shopping-cart-button"` ao botão que, ao ser clicado, redireciona para a página do carrinho de compras.
</details>

---

### 8. Adicione produtos ao carrinho a partir da tela de listagem de produtos

A pessoa usuária pode adicionar um produto ao carrinho de compras a partir da página principal contendo a listagem dos produtos.

Todos os produtos que foram adicionados ao carrinho devem aparecer na tela do Carrinho de Compras.

* Lembrete: Quando renderizamos os itens da categoria, os dados dos produtos já estão dentro da sua aplicação. Pense em como armazenar eles sem a necessidade de fazer outra requisição.

<details><summary> Na tela principal, crie um elemento em cada produto que, ao ser clicado, adiciona o produto ao carrinho de compras:</summary>

  * Adicione o atributo `data-testid="product-add-to-cart"` no elemento que executa a ação de adicionar o produto ao carrinho de compras.

  * Ao adicionar o produto no carrinho, salve ele também no local storage.
</details>


<details><summary> Na tela do Carrinho de Compras, renderize todos os produtos que foram adicionados ao carrinho:</summary>
  
  * Os produtos na tela do Carrinho de Compras devem possuir o nome, o preço e a quantidade;
  * Adicione o atributo `data-testid="shopping-cart-product-name"` no elemento que possui o nome do produto na tela do carrinho de compras. Você deve adicionar esse atributo para todos os produtos na tela do carrinho;
  * Adicione o atributo `data-testid="shopping-cart-product-quantity"` no elemento que possui a quantidade do produto na tela do carrinho de compras. Você deve adicionar esse atributo para todos os produtos na tela do carrinho.
</details>

---

### 9. Adicione um produto ao carrinho a partir de sua tela de exibição detalhada

A partir da tela de detalhes de um produto, deve ser possível adicioná-lo ao carrinho de compras.

<details><summary> Na tela de detalhes de um produto, crie um elemento que adicione o produto ao carrinho:</summary>

  * Adicione o atributo `data-testid="product-detail-add-to-cart"` no elemento que possui a ação de adicionar o produto ao carrinho de compras.
  * Ainda na tela de detalhes de um produto, adicione um elemento que, ao ser clicado, redireciona a pessoa usuária para a tela de carrinho. Esse elemento precisa ter o atributo `data-testid="shopping-cart-button"`.
  * Ao adicionar o produto no carrinho, salve ele também no local storage.
</details>
<details><summary> Na tela do carrinho de compras, renderize todos os produtos adicionados ao carrinho:</summary>

  * Os produtos na tela do Carrinho de Compras devem possuir o nome, o preço e a quantidade;
  * Adicione o atributo `data-testid="shopping-cart-product-name"` no elemento que possui o nome do produto na tela do carrinho de compras. Você deve adicionar esse atributo para todos os produtos na tela do carrinho;
  * Adicione o atributo `data-testid="shopping-cart-product-quantity"` no elemento que possui a quantidade do produto na tela do carrinho de compras. Você deve adicionar esse atributo para todos os produtos na tela do carrinho.
</details>

---

### 10. Visualize a lista de produtos adicionados ao carrinho em sua página e permita a manipulação da sua quantidade

Ao entrar na página, todos os produtos salvos no local storage devem ser renderizados.

Na tela do Carrinho de Compras, deve ser possível aumentar e/ou diminuir a quantidade do produto. Também deve ser possível excluir um produto do carrinho.

<details><summary> Na página do carrinho de compras, crie dois elementos para cada produto que, ao serem clicados, diminuem ou aumentam a quantidade desse produto presente no carrinho:</summary>

  * Adicione elementos na página do carrinho de compras para aumentar ou diminuir a quantidade de cada produto presente no carrinho;
  * A quantidade mínima de um produto no carrinho deve ser `1`;
  * Adicione o atributo `data-testid="product-increase-quantity"` no elemento que aumenta a quantidade de um produto. Adicione esse elemento para cada produto;
  * Adicione o atributo `data-testid="product-decrease-quantity"` no elemento que diminui a quantidade de um produto. Adicione esse elemento para cada produto;
  * Adicione o atributo `data-testid="remove-product"` no elemento que remove o produto do carrinho. Adicione esse elemento para cada produto.
      * É possível remover um item do carrinho de compras. Essa remoção deve refletir o local storage.
</details>

---

### 11. Avalie e comente acerca de um produto em sua tela de exibição detalhada

Na tela de detalhes de um produto, deve existir um formulário para adicionar avaliações sobre ele. Este formulário deve conter um campo para o e-mail da pessoa avaliadora, uma nota entre 1 e 5 e um campo para comentários sobre o produto. Além disso, os campos `e-mail` e `nota` devem ser obrigatórios e o e-mail deve ser válido (exemplo: `teste@trybe.com`).

A lista de avaliações já realizadas devem ser renderizadas na tela de detalhes do produto caso a pessoa usuária recarregue a página.

<details><summary> Na tela de detalhes de um produto, crie um formulário para adicionar avaliações:</summary>

  * Crie um `input` com o atributo `data-testid="product-detail-email"`, onde a pessoa usuária colocará o email;
  * Crie 5 elementos contendo o atributo `data-testid="${index}-rating"`, com o `${index}` indo de 1 a 5, para a pessoa escolher qual nota dar ao produto. **Neste formulário, os 5 elementos precisam ser renderizados na tela, independente da nota atribuída pela pessoa avaliadora**;
  * Adicione um campo de texto com o atributo `data-testid="product-detail-evaluation"` para a pessoa usuária escrever algo sobre o produto;
  * Adicione um botão com o atributo `data-testid="submit-review-btn"` para a pessoa usuária enviar a avaliação.
</details>

<details><summary>Avalie se o formulário é valido:</summary>

  - Ao clicar no botão com o atributo `data-testid="submit-review-btn"`, **caso algum campo não esteja preenchido ou possua algum campo inválido**, um elemento contendo a mensagem `Campos inválidos` deve ser renderizado. Este elemento deve possuir o atributo `data-testid="error-msg"`;
</details>

<details><summary> Renderize as avaliações criadas a partir do formulário:</summary>

  * Ao clicar no botão com o atributo `data-testid="submit-review-btn"`, as informações inseridas no formulário deverão ser renderizadas na tela de detalhes do produto, abaixo do formulário, e os campos de texto do formulário devem ser limpos;
  * As avaliações devem ser salvas no **local storage**;
  * As chaves das avaliações no local storage devem ser o **id do produto**;
  * Os valores das avaliações no local storage devem ter o sequinte formato:
  ```js
  [
    { 
      email: 'email@email.com',
      text: 'Algum texto',
      rating: '5',
    },
  ]
  ```

  ![Tela - Detalhamento do produto com avaliações pregressas](./wireframes/card_11.3.png)
  * O `e-mail` da avaliação deve conter o `data-testid="review-card-email"`;
  * A `nota` da avaliação deve conter o `data-testid="review-card-rating"`;
  * O `comentario` da avaliação deve conter o `data-testid="review-card-evaluation"`.
  
</details>

---

### 12. Finalize a compra vendo um resumo dela, preenchendo os seus dados e escolhendo a forma de pagamento

Crie uma tela para a finalização da compra, que deve ser acessada a partir da tela do Carrinho de Compras. A tela deve conter um formulário para adicionar as informações do comprador e um resumo dos produtos que foram adicionados ao carrinho. Após finalizar a compra, caso o formulário esteja validado, o carrinho deve ser esvaziado e a pessoa usuária deve ser redirecionada pala a tela principal (listagem dos produtos).

<details><summary> Na tela do carrinho de compras, crie um elemento para finalizar a compra:</summary>
  
  * Este elemento, ao ser clicado, deve redirecionar a pessoa usuária à página de _checkout_;
  * Adicione o atributo `data-testid="checkout-products"` no elemento que leva a pessoa à página de _checkout_.
</details>

<details><summary> Na tela de <i>checkout</i>, mostre um resumo dos produtos adicionados ao carrinho</summary>

  - Ao acessar a tela de checkout, o nome dos produtos que estão no carrinho deverão estar na tela. Você pode adicionar qualquer outra informação sobre os produtos, mas apenas o **nome** é obrigatório.
</details>

<details><summary> Na tela de <i>checkout</i>, crie um formulário para a pessoa usuária adicionar os seus dados pessoais:</summary>

  * <details><summary> O formulário precisa possuir os seguintes campos:</summary>

    - Nome Completo: este elemento deve possuir o atributo `data-testid="checkout-fullname"`;
    - Email: este elemento deve possuir o atributo `data-testid="checkout-email"`;
    - CPF: este elemento deve possuir o atributo `data-testid="checkout-cpf"`;
    - Telefone: este elemento deve possuir o atributo `data-testid="checkout-phone"`;
    - CEP: este elemento deve possuir o atributo `data-testid="checkout-cep"`;
    - Endereço: este elemento deve possuir o atributo `data-testid="checkout-address"`.
    - <details><summary> Método de pagamento: este elemento deve ser um <code>input</code> do tipo <code>radio</code> e conter 4 opções:</summary>

      - Boleto, que deve possuir o atributo `data-testid="ticket-payment"`;
      - Visa, que deve possuir o atributo `data-testid="visa-payment"`;
      - MasterCard, que deve possuir o atributo `data-testid="master-payment"`;
      - Elo, que deve possuir o atributo `data-testid="elo-payment"`;
      </details>
    - Um botão para submeter o formulário, contendo o atributo `data-testid="checkout-btn"`
    </details>
  
  * Todos os campos do formulário são obrigatórios e precisam ser preenchidos para finalizar o checkout;
</details>


<details><summary> Ao clicar no botão para submeter o formulário:</summary>
  
  - Caso algum campo não esteja preenchido, um elemento contendo a mensagem `Campos inválidos` deve ser renderizado. Este elemento deve possuir o atributo `data-testid="error-msg"`;
  - Caso todos os campos estejam preenchidos, a pessoa usuária deve ser redirecionada para a tela principal (listagem de produtos) e o carrinho deve ser esvaziado. :bulb: Ou seja, caso a pessoa usuária acesse a página do carrinho de compras após finalizar o checkout, a mensagem `Seu carrinho está vazio` deverá estar na tela.
</details>

---

## Requisitos Bônus

### 13. Mostre junto ao ícone do carrinho a quantidade de produtos dentro dele, em todas as telas em que ele aparece

Adicione junto ao elemento que redireciona à página do carrinho de compras, um número contendo a quantidade total de itens armazenados no carrinho. Esse número deve aparecer em todas as páginas em que esse elemento está presente.

<details><summary> Adicione a quantidade de produtos armazenados no carrinho:</summary>

  * Esse elemento deve ser visível da página de listagem de produtos e da página de detalhes de produto;
  * Adicione o atributo `data-testid="shopping-cart-size"` no elemento que contém a quantidade de produtos presente no carrinho;
  * O valor do elemento que contém o `data-testid="shopping-cart-size"`  deve ser adicionado no local storage.
  * A quantidade a ser exibida é o número total de itens, ou seja, se a pessoa adiciona o produtoA 5 vezes e o produtoB 2 vezes, o valor a ser exibido é 7.
</details>

---

### 14. Limite a quantidade de produtos adicionados ao carrinho pela quantidade disponível em estoque

Na **tela do carrinho de compras** já é possível aumentar ou diminuir a quantidade dos produtos. Agora você deve limitar a quantidade máxima que a pessoa usuária pode adicionar ao carrinho de acordo com a quantidade em estoque disponível de cada produto.

<details><summary> Na <strong>tela do carrinho de compras</strong>, crie um limite para a quantidade máxima dos produtos: </summary>

  * Ao clicar no elemento q possui o atributo `data-testid="product-increase-quantity"` para aumentar a quantidade de um produto no carrinho, o valor não pode ser superior a sua quantidade disponível em estoque;
  * :eyes: **Dica**: Você pode encontrar esse valor na chave `"available_quantity"`, disponível na API do Mercado Livre.
</details>

---

### 15. Mostre quais produtos tem o frete grátis

Alguns produtos possuem o frete grátis. Adicione essa informação nesses produtos, tanto na tela de listagem dos produtos quanto na tela de detalhes de um produto.

<details><summary> Adicione a informação de frete grátis aos produtos que o possuem:</summary>

  * Adicione um elemento que mostre essa informação para cada produto que possua frete grátis na tela de listagem de produtos;
  * Essa informação pode ser adicionada também à tela de detalhes do produto, mas isso não será avaliado;
  * Adicione o atributo `data-testid="free-shipping"` no elemento que apresenta essa informação para todos os produtos que possuam frete grátis;
  * Para os produtos que não possuem frete grátis, você não precisa adicionar nenhum novo elemento.
</details>

---

</details>
<br />

## 2- Nota do Projeto

## 100% :heavy_check_mark:

![Project-FrontEnd-Online-Store-Grade](https://github.com/FredericoTP/trybe-project-11-frontend-online-store/blob/main/images/frontend-online-store-grade.png?raw=true)

<br />

## 3- Preview

![Project-FrontEnd-Online-Store-Preview1](https://github.com/FredericoTP/trybe-project-11-frontend-online-store/blob/main/images/store-preview1.png?raw=true)
<br />
![Project-FrontEnd-Online-Store-Preview2](https://github.com/FredericoTP/trybe-project-11-frontend-online-store/blob/main/images/store-preview2.png?raw=true)
<br />
![Project-FrontEnd-Online-Store-Preview3](https://github.com/FredericoTP/trybe-project-11-frontend-online-store/blob/main/images/store-preview3.png?raw=true)
<br />
![Project-FrontEnd-Online-Store-Preview4](https://github.com/FredericoTP/trybe-project-11-frontend-online-store/blob/main/images/store-preview4.png?raw=true)
