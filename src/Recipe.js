import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Recipe(){
    const[isSearch,setSearch]=useState("")
    const[searchQuery,setSearchQuery]=useState("")
    const[isdata,setData]=useState([])
    const[isloading,setisloading]=useState(false);

    useEffect(()=>{
        if(!searchQuery){
            return;
        }
        setisloading(true)
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
        .then(res=>(res).json())
        .then((result)=>{
            setData(result.meals||[])
            setisloading(false);

        })
        .catch((error)=>console.error("error fetching",error))
    },[searchQuery])
    const handlerSearch=()=>{
        setSearchQuery(isSearch)
    }
    return(
        <div className={isdata.length === 0 ? "page-container center" : "page-container scroll"}>
        <div className="recipe">
            <h1>My Recipe Finder</h1>
            <div className="input"> 
                <input type="text" value={isSearch}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="Search for a recipe..."
                />
                <button onClick={handlerSearch}>Search</button>

            </div>
            <div className="results"> 
                {isloading ? (
                    <p>Loading the page</p>):
                      isdata.length>0?(
                    isdata.map((meal)=>(
                        <Link key={meal.idMeal} to={`/recipe/${meal.idMeal}`} className="card-link">
                            <h3>{meal.strMeal}</h3>
                            <img src={meal.strMealThumb} alt={meal.strMeal} width="150"/> 
                        </Link>
                    ))
                ):(
                    <p>no recipe found</p>
                )}

            </div>
        </div>
    </div>
    )
}
export default Recipe;