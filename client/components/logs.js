import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Dummy = () => {
  const LogsList = () => {
    const [logs, setLogs] = useState([])
    useEffect(() => {
      axios.get(`/api/logs`).then((it) => {
        setLogs(it.data)
      })
    })
    return (
      <table className="border">
        <tr>
          <th className="border">Action</th>
          <th className="border">Time</th>
        </tr>
        {logs.map((log) => {
          return (
            <tr key={log.time}>
              <td className="border">{log.action}</td>
              <td className="border">{log.time}</td>
            </tr>
          )
        })}
      </table>
    )
  }

  return (
    <div>
      <LogsList />
    </div>
  )
}

Dummy.propTypes = {}

export default React.memo(Dummy)
