
require("../mocks/fetchSimulator");
const { fetchProducts } = require("../helpers/fetchProducts");
const computadorSearch = require("../mocks/search");

describe("1 - Teste a função fecthProducts", () => {
  
  it("Teste se fetchProducts é uma função;", () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toEqual("function");
  });
  
  it('Testa quando Eecute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada;', async () => {
    expect.assertions(1);
    await fetchProducts("computador");
    expect(await fetch).toHaveBeenCalled();
  }); 
  
  it('Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint', async () => {
    expect.assertions(1);
    const query = "computador";
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
     fetchProducts("computador");
    expect(fetch).toHaveBeenCalledWith(url);
  });
  
  it('Teste se o retorno da função fetchProducts com o argumento "computador"é igual a computadorSearch', 
  async () => {
    const response = await fetchProducts('computador')
    expect(response).toEqual(computadorSearch)
  })

  it("Teste se, ao chamar a função fetchProducts sem argumento, retorna a menssagem e erro", 
  async ()=> {
    try {
      await fetchProducts()
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'))
    }
  })
});