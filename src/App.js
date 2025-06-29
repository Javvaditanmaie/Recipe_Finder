
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Recipe from'./Recipe'

import './Recipe.css';

import RecipeDetail from './RecipeDetail';
import  './RecipeDetails.css';
function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Recipe/>}/>

        <Route path="/recipe/:id" element={<RecipeDetail/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
