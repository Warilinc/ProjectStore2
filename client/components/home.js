import React from 'react'
import { Route } from 'react-router-dom'
import Head from './head'
import Header from './header'
import Busket from './busket'
import Shop from './shop'
// import wave from '../assets/images/wave.jpg'

const Home = () => {
  return (
    <div>
      <Head title="Hello" />
      <Header />
      <Route exact path="/" component={() => <Shop />} />
      <Route exact path="/busket" component={() => <Busket />} />
    </div>
  )
}

Home.propTypes = {}

export default Home
