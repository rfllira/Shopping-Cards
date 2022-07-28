const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  edit: 0,
  expenseToEdit: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_MONEY':
    return {
      ...state,
      currencies: action.currency,
    };

  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case 'CHANGE_EXPENSES':
    return {
      ...state,
      editor: true,
      edit: action.edit,
      expenseToEdit: action.expense,
    };

  case 'NEW_EXPENSES':
    return {
      ...state,
      expenses: state.expenses.map((eachExpense) => {
        if (eachExpense.id === action.payload.id) {
          return action.payload;
        }
        return eachExpense;
      }),
      expenseToEdit: {},
      editor: false,
    };

  default:
    return {
      ...state,
    };
  }
};

export default wallet;
