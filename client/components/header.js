import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import axios from 'axios'
import { sortPrice, sortAlph, PriceCorr, getProductsData } from '../redux/reducers/GetProducts'
import { logsSave } from '../redux/reducers/LogsCompiler'

const Header = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductsData())
  })
  const busketlist = useSelector((s) => s.GetProducts.busket)
  const productlist = useSelector((s) => s.GetProducts.list)

  const busketvalue = `${Object.keys(busketlist).reduce((acc, rec) => {
    // eslint-disable-next-line no-param-reassign
    acc += busketlist[rec]
    return acc
  }, 0)} goods`

  const busketprice = `${Object.keys(busketlist)
    .reduce((acc, rec) => {
      const CorPrice =
        productlist.find((it) => it.id === rec).CorrectPrice ||
        productlist.find((it) => it.id === rec).price
      // eslint-disable-next-line no-param-reassign
      acc += busketlist[rec] * CorPrice
      return acc
    }, 0)
    .toFixed(2)}`

  // const Price_to_USD = () => {}
  // const Price_to_EUR = () => {}
  // const Price_to_CAD = () => {}

  //  const Sort_by_NAME = () => {
  //       return dispatch(getProductsData())
  //   }
  // const Sort_by_PRICE = () => {
  //   useEffect(() => {
  //     return dispatch(sortPrice())
  //   })
  // }
  // onClick = {() =>
  // axios.post(`/api/logs/${+ new Date}/${}`)
  // }

  return (
    <nav className="flex items-center justify-between flex-wrap text-white bg-purple-500 p-5">
      <div className="flex items-center flex-shrink-0 text-white mr-6 text-2xl">
        <Link to="/" id="brand-name" onClick={() => {}}>
          Warilinc production
        </Link>
      </div>
      <Link
        to="/busket"
        className="flex items-center flex-shrink-0 text-white mr-2 text-l"
        onClick={() => {}}
      >
        Number of goods:
        <div id="order-count">{busketvalue}</div>
      </Link>
      <div className="inline-flex">
        <div className="flex items-center flex-shrink-0 text-white mr-2 text-l">Price in:</div>
        <button
          onClick={() => {
            dispatch(PriceCorr('USD'))
            dispatch(logsSave('Change Currency to USD ', new Date()))
          }}
          type="button"
          className="bg-purple-700 hover:bg-purple-600 text-gray-200 font-bold py-2 px-4 rounded-l"
        >
          USD
        </button>
        <button
          onClick={() => {
            dispatch(PriceCorr('EUR'))
            dispatch(logsSave('Change Currency to EUR ', new Date()))
          }}
          type="button"
          className="bg-purple-700 hover:bg-purple-600 text-gray-200 font-bold py-2 px-4"
        >
          EUR
        </button>
        <button
          onClick={() => {
            dispatch(PriceCorr('CAD'))
            dispatch(logsSave('Change Currency to CAD ', new Date()))
          }}
          type="button"
          className="bg-purple-700 hover:bg-purple-600 text-gray-200 font-bold py-2 px-4 rounded-r"
        >
          CAD
        </button>
      </div>
      <div className="inline-flex">
        <div className="flex items-center flex-shrink-0 text-white mr-2 text-l">Sort by:</div>
        <Link
          to="#"
          onClick={() => {
            dispatch(sortAlph())
            dispatch(getProductsData())
            dispatch(logsSave('Change sort Alphabet ', new Date()))
          }}
          id="sort-name"
          type="button"
          className="bg-purple-700 hover:bg-purple-600 text-gray-200 font-bold py-2 px-4 rounded-l"
        >
          Alphabet
        </Link>
        <Link
          to="#"
          onClick={() => {
            dispatch(sortPrice())
            dispatch(getProductsData())
            dispatch(logsSave('Change sort Price ', new Date()))
          }}
          id="sort-price"
          type="button"
          className="bg-purple-700 hover:bg-purple-600 text-gray-200 font-bold py-2 px-4 rounded-r"
        >
          Price
        </Link>
      </div>
      <div className="flex items-center flex-shrink-0 text-white mr-2 text-l">
        Full Price:
        <Link to="/busket" id="" onClick={() => {}}>
          {busketprice}
        </Link>
      </div>
    </nav>
  )
}

export default React.memo(Header)
