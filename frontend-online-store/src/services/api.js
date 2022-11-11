export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(url);
  const json = await response.json();

  return json;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  if (!categoryId) {
    url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  }
  if (!query) {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  }

  const response = await fetch(url);
  const json = await response.json();

  return json;
}

export async function getProductById() {
  const url = 'https://api.mercadolibre.com/items/$PRODUCT_ID';
  const response = await fetch(url);
  const json = await response.json();

  return json;
}
