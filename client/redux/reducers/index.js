import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import GetProducts from './GetProducts'
import LogsCompiler from './LogsCompiler'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    GetProducts,
    LogsCompiler
  })

export default createRootReducer
