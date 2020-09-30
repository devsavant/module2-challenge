const axios = require('axios');
const PRODUCTS_INITIAL_STATE = {
  list:[],
  fetching:false
};
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';

export const productsReducer = (state = PRODUCTS_INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        list: action.products,
      };
    default:
      return state;
  }
};

export const fetchProduct = () => async dispatch => {
  try {
    const response = await axios.get(`https://backend-panel.herokuapp.com/products`);
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      products: response.data.result
    })
    
  } catch (error) {
    console.error(error);
  }
};
