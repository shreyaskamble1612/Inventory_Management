import React,{ useEffect, useState }  from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Items from '../components/Items'
import Footer from '../components/Footer'

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    let token = localStorage.getItem("inventoryToken");
    if (!token) {
      navigate("/login")
    }
  },[]);
  return (
    <div>
      <Header/>
      <Hero/>
      <Items/>
      <Footer/>
    </div>
  )
}

export default Home
