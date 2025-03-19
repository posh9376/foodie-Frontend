import React, {useState, useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";
import Navbar from "./components/Navbar";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  //store the recipes in local storage on load
  useEffect(()=>{
    const fetchRecipes = async ()=>{
      if (!localStorage.getItem('recipes')){
        try{
          const response = await fetch("https://foodie-backend-0vyk.onrender.com/api/foods/");
          if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          console.log("recipes",data);
          localStorage.setItem('recipes', JSON.stringify(data));
        }catch (error){
          console.error("Error fetching recipes:", error)
        }
      }
    }
    fetchRecipes()
  },[]) // Runs only once on mount

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>
        <Pages isLoggedIn={isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
