import React,{ useEffect, useState,useContext }  from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Items from '../components/Items'
import Footer from '../components/Footer'
import itemContext from "../Context/ItemContext";


const Home = () => {
  const context = useContext(itemContext)
  const {addItem,getItems,items} = context
  const navigate = useNavigate()
  useEffect(() => {
    let token = localStorage.getItem("inventoryToken");
    if (!token) {
      navigate("/login")
    }
    getItems()
  },[]);
  return (
    <div>
      <Header/>
      <Hero />
      <Items/>
      <Footer/>
    </div>
  )
}

export default Home
