import React,{ useEffect, useState }  from 'react'
import {useNavigate} from 'react-router-dom'

const Home = () => {
  const [inventoryToken, setInventoryToken] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    let token = localStorage.getItem("inventoryToken");
    if (token) {
      setInventoryToken(token);
    }
    if(!inventoryToken){
      navigate("/login")
    }
  },[]);
  return (
    <div>
      Home Page
    </div>
  )
}

export default Home
