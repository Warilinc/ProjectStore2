/* eslint-disable no-console */
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import axios from 'axios'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { readFile,  writeFile,  unlink } = require('fs').promises

const Root = () => ''

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

const removeLogs = () => {
  unlink(`${__dirname}/logs.json`)
}

const saveLogs = (logs) => {
  return writeFile(`${__dirname}/logs.json`, JSON.stringify(logs), { encoding: 'utf8' }).then(
    () => logs
  )
}

const getLogs = () => {
  return readFile(`${__dirname}/logs.json`)
    .then((data) => JSON.parse(data))
    .catch(() => {
      return []
    })
}

server.get('/api/products', async (req, res) => {
  const prod = await readFile(`${__dirname}/data.json`)
    .then((data) => JSON.parse(data))
    .catch(() => {
      return []
    })
  res.json(prod)
  res.end()
})

server.get('/api/currency_convertor/:from/:to/:cost', async (req, res) => {
  const { from, to } = req.params
  await axios
    .get(`https://api.exchangeratesapi.io/latest?symbols=${to}&base=${from}`)
    .then((it) => res.json(it.data))

   res.end()
})

server.post('/api/logs', async (req, res) => {
  const { time, action } = await req.body
  const logs = await getLogs()
  await saveLogs([...logs, { action, time }])
  res.json({ status: 'succsesfull' })
  res.end()
})

server.get('/api/logs', async (req, res) => {
  res.json(await getLogs())
  res.end()
})

server.delete('/api/logs', async (req, res) => {
  await removeLogs()
  res.json({ status: 'succsesfull' })
  res.end()
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
