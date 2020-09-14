import React,{useEffect,useState} from 'react';
import './App.css';
import Recipe from './Recipe'

export default function App() {

  const APP_ID = 'f1889d34';
  const APP_KEY = 'ed2a6d906c3b09d3d073af549857f195';
  
  const [recipes,setRecipes] = useState([]);
  const [search,setSearch] = useState("");
  const [query,setQuery] = useState("chicken");

  useEffect(()=>{
     getRecipes();
  },[query])

  const getRecipes = async() =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
    console.log(query);
  }

  

  return (
    <div className="App">
        <form onSubmit={getSearch} className="search-form">
          <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder="Enter the ingredients.."></input>
          <button className="search-button" type="submit">Search</button>
        </form>
    <div className="recipes">
        {recipes.map(recipe => (
          <Recipe title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image} 
          key={recipe.recipe.label}
          ingredients = {recipe.recipe.ingredients}/>
        ))}
    </div>
    </div>
  )
}


