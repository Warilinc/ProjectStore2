import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import axios from 'axios'
import { Busket } from '../redux/reducers/GetProducts'

const Dummy = () => {
  const dispatch = useDispatch()

  const busketlist = useSelector((s) => s.GetProducts.busket)
  const productlist = useSelector((s) => s.GetProducts.list)

  const TotalPrice = `${Object.keys(busketlist)
    .reduce((acc, rec) => {
      const CorPrice =
        productlist.find((it) => it.id === rec).CorrectPrice ||
        productlist.find((it) => it.id === rec).price
      // eslint-disable-next-line no-param-reassign
      acc += busketlist[rec] * CorPrice
      return acc
    }, 0)
    .toFixed(2)}`

  const Good = (props) => {
    const { product } = props
    return (
      <div className="card flex w-full flex-wrap max-w-sm rounded overflow-hidden shadow-lg">
        <img className="product__image w-full " src={product.image} alt="Goods" />
        <div className="px-6 py-4">
          <div className="flex items-center font-bold text-gray-700 text-base ">
            Name: <div className="product__title">{product.title}</div>
          </div>
          <div className="flex items-center text-gray-700 text-base">
            Price: <div className="product__price">{product.CorrectPrice || product.price}</div>
          </div>
          <div className="flex items-center text-gray-700 text-base">
            Total Price:{' '}
            <div className="product__total_price">
              {((product.CorrectPrice || product.price) * busketlist[product.id] || 0).toFixed(2)}
            </div>
          </div>
          <div className="flex items-center text-gray-700 text-base">
            Currency: <div className="currency">{product.Currency || 'EUR'}</div>
          </div>
          <div className="flex items-center text-gray-700 text-base">
            In busket: <div className="product__amount">{busketlist[product.id] || 0}</div>
          </div>
          <button
            onClick={ () => {

              return dispatch(Busket(product.id, -1))
            }}
            type="button"
            className="product__remove bg-white hover:bg-gray-100 text-gray-700 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          >
            Remove from cart
          </button>
        </div>
      </div>
    )
  }
  const GoodsMaster = () => {
    const goods = productlist.filter(
      (it) => Object.keys(busketlist).indexOf(it.id) >= 0
    ) /* <div>{goods.map((product) => (<Good key={(product.image, product.title, product.price, product.id)} />))}</div> */
    return (
      <div>
        {goods.map((product) => (
          <Good key={product} product={product} />
        ))}
      </div>
    )
  }
  return (
    <div>
      <GoodsMaster />
      <nav className="self-end flex items-center justify-between flex-wrap  bg-grey-200 p-5 bottom-0">
        <div className="flex items-center flex-shrink-0 mr-6 text-2xl">Total price:</div>
        <div id="total-amount" className="flex items-center flex-shrink-0 mr-6 text-2xl">
          {TotalPrice}
        </div>
      </nav>
    </div>
  )
}

Dummy.propTypes = {}

export default React.memo(Dummy)
