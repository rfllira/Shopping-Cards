const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');
localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  const localStorageSimulator = require('../mocks/localStorageSimulator');
  const saveCartItems = require('../helpers/saveCartItems');
  localStorageSimulator('setItem');
  describe('4 - Teste a função saveCartItems', () => {
    
    it("Teste se, ao executar saveCartItems o localStorage.setItem é chamado", () => {
      expect.assertions(1);
      saveCartItems('<ol><li>Item</li></ol>');
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  
    it("Teste se ao executar saveCartItems o localStorage.setItem é chamado com dois parâmetros", () => {
      expect.assertions(1);
      saveCartItems('<ol><li>Item</li></ol>');
      expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
    });
  });
});
