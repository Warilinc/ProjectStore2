import axios from 'axios'

const getProducts = 'getProducts'
const ProductsSort = 'ProductsSort'
const BusketAdd = 'BasketAdd'
const GetProductsDataServer = 'GetProductsDataServer'
const initialState = {
  list: [],
  busket: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GetProductsDataServer: {
      return state.list === initialState.list ? { ...state, list: action.list } :  state
    }
    case getProducts: {
      return state
    }
    case ProductsSort: {
      return { ...state, list: action.list }
    }
    case BusketAdd: {
      const { add } = action
      return { ...state, busket: add }
    }
    default:
      return state
  }
}

export function getProductsDataServ() {
  return (dispatch) => {
    axios.get(`/api/products`).then((it) => {
      dispatch({ type: GetProductsDataServer, list: it.data })
    })
  }
}
export function getProductsData() {
  return (dispatch) => {
    dispatch({ type: getProducts })
  }
}
export function sortAlph() {
  return (dispatch, getState) => {
    const store = getState()

    const sortfunc = (a, b) => {
      if (a.title < b.title) {
        return -1
      }
      if (a.title > b.title) {
        return 1
      }
      return 0
    }
    const { list } = store.GetProducts
    const arr = list.sort(sortfunc)
    dispatch({ type: ProductsSort, list: arr })
  }
}
export function sortPrice() {
  return (dispatch, getState) => {
    const store = getState()

    const sortfunc = (a, b) => {
      return a.price - b.price
    }
    const { list } = store.GetProducts
    const arr = list.sort(sortfunc)
    dispatch({ type: ProductsSort, list: arr })
  }
}
export function Busket(id, count) {
  return (dispatch, getState) => {
    const store = getState()
    const cart = store.GetProducts.busket
    let add
    if (typeof cart[id] === 'undefined') {
      add = { ...cart, [id]: 1 }
    } else {
      add = { ...cart, [id]: cart[id] + count }
    }
    if (add[id] === 0) delete add[id]
    dispatch({ type: BusketAdd, add })
  }
}

export function PriceCorr(type) {
  return (dispatch, getState) => {
    const store = getState()
    let cart = store.GetProducts.list

    if (type !== 'EUR') {
      axios.get(`/api/currency_convertor/EUR/${type}/1`).then((itD) => {
        const cor = itD.data.rates[type]

        cart = cart.map((obj) => {
          const it = obj
          it.Currency = type
          it.CorrectPrice = (cor * it.price).toFixed(2) || 'error'
          return it
        })

        dispatch({ type: ProductsSort, list: cart })
      })
    } else {
      cart = cart.map((obj) => {
        const it = obj
        it.Currency = type
        it.CorrectPrice = it.price || 'error'
        return it
      })

      dispatch({ type: ProductsSort, list: cart })
    }
  }
}
