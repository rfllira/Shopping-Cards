export async function getCategories() {
  try {
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/categories';
    const result = await fetch(endPoint);
    const objectResult = await result.json();
    return objectResult;
  } catch (error) {
    return error;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let result;
  try {
    if (!categoryId) {
      result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID&q=${query}`);
    } else {
      result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
    }
    const obecjtResult = await result.json();
    return obecjtResult;
  } catch (error) {
    return error;
  }
}
