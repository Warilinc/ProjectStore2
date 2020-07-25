// import axios from 'axios'

const SaveLogs = 'SaveLogs'
const getLogs = 'getLogs'

const initialState = {
  logs:{
    action:[],
    time:[]
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SaveLogs: {
      return {...state, logs: action.logs}
    }
    case getLogs : {
      return state
    }
    default:
      return state
  }
}

export function logsSave(action, time) {
  return (dispatch, getState) => {
    // axios.post('/api/logs', {action,time}, {'Content-Type':'application/x-www-form-urlencoded'})
    const store = getState()
    const { logs } = store.LogsCompiler
    const arr = {
      action:[...logs.action, action],
      time:[...logs.time, time]
    }

    dispatch({ type: SaveLogs, logs: arr })
  }
}
