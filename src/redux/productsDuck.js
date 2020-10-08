const axios = require('axios');
const PRODUCTS_INITIAL_STATE = {
  list:[],
  fetching:false,
  productCart: [],
};
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const UPDATE_CART = 'UPDATE_CART'


export const productsReducer = (state = PRODUCTS_INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        list: action.products,
      };
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        productCart: [...state.productCart, action.payload]
      }
      case UPDATE_CART:
        return {
          ...state,
          productCart: action.payload
        }
    default:
      return state;
  }
};

export const fetchProduct = () => async dispatch => {
  try {
    const response = await axios.get(`https://backend-panel.herokuapp.com/products`);
    const responseFiltered = response.data.result.filter(item => item.price && item.title && item._id)
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      products: responseFiltered
    })
    
  } catch (error) {
    console.error(error);
  }
};
