import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import axios from 'axios'

import { getProductsDataServ, getProductsData, Busket } from '../redux/reducers/GetProducts'

const Dummy = () => {
  const [state, setState] = useState(0)
  const dispatch = useDispatch()
  useEffect(() => {
    if (state === 0) dispatch(getProductsDataServ())
    if (state === 1) dispatch(getProductsData())
    setState(1)
  })
  const prodlist = useSelector((s) => s.GetProducts.list)
  const busketlist = useSelector((s) => s.GetProducts.busket)
  const Card = (props) => {
    const { product } = props
    return (
      <div className="card flex flex-wrap flex-col max-w-sm rounded overflow-hidden shadow-lg m-4 ">
        <img className="card__image flex" src={product.image} alt="Goods" />
        <div className="px-6 py-4 flex flex-wrap flex-col">
          <div className="flex items-center font-bold text-gray-700 text-base ">
            <div className="card__title flex-wrap">{product.title}</div>
          </div>
          <div className="flex items-center text-gray-700 text-base">
            Price:{' '}
            <div className="card__price flex-wrap">{product.CorrectPrice || product.price}</div>
          </div>
          <div className="flex items-center text-gray-700 text-base">
            Currency: <div className="currency flex-wrap">{product.Currency || 'EUR'}</div>
          </div>
          <div className="flex items-center text-gray-700 text-base">
            In busket:{' '}
            <div className="card__product-amount flex-wrap">{busketlist[product.id] || 0}</div>
          </div>
          <button
            onClick={ () => {

              dispatch(Busket(product.id, 1))
            }}
            type="button"
            className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-1 px-2 border border-gray-400 rounded shadow flex-wrap"
          >
            Add to cart
          </button>
        </div>
      </div>
    )
  }
  const CardMaster = () => {
    return (
      <div key={prodlist} className="content-start flex flex-wrap flex-1">
        {prodlist.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    )
  }
  return (
    <div className="flex flex-row flex-wrap">
      <CardMaster />
    </div>
  )
}

Dummy.propTypes = {}

export default React.memo(Dummy)
