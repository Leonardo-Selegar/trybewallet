export const GET_EMAIL = 'SAVE_USER';
export const REQUEST_API = 'REQUEST_API';
export const GET_RESPONSE = 'GET_RESPONSE';
export const FORM_RESPONSE = 'FORM_RESPONSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const getEmail = (payload) => ({
  type: GET_EMAIL,
  payload,
});

export const requestAPI = () => ({
  type: REQUEST_API,
});

export const getResponse = (response) => ({
  type: GET_RESPONSE,
  payload: Object.keys(response).filter((item) => item !== 'USDT'),
});

export const formResponse = (state, response) => ({
  type: FORM_RESPONSE,
  payload: { ...state, exchangeRates: response },
});

export const fetchAPI = () => async (dispatch) => {
  dispatch(requestAPI());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json();
  return dispatch(getResponse(result));
};

export const formApiRequest = (state) => async (dispatch) => {
  dispatch(requestAPI());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json();
  dispatch(formResponse(state, result));
};

export const removeExpense = (expense) => ({
  type: REMOVE_EXPENSE,
  payload: expense.id,
});
