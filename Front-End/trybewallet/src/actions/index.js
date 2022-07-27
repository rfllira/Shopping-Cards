export function createLogin(email) {
  return {
    type: 'CREATE_PAGELOGIN',
    email,
  };
}

const newCurrency = (currency) => ({
  type: 'SAVE_MONEY',
  currency,
});

export const fetchCurrencies = () => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json()
      .then((data) => dispatch(newCurrency(Object.keys(data)
        .filter((coins) => (coins !== 'USDT'))))));
};

export const editExpense = (editId, expense) => ({
  type: 'CHANGE_EXPENSES',
  editId,
  expense,
});

export const actualExpense = (expense) => ({
  type: 'NEW_EXPENSES',
  payload: expense,
});

export const addArrayExpense = (expense) => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => (response.json()
      .then((dataArray) => dispatch({
        type: 'ADD_EXPENSE',
        payload: { ...expense, exchangeRates: dataArray,
        },
      }))
    ));
};
