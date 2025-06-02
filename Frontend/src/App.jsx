import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import AllRecipes from './pages/AllRecipes';
 
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SplashScreen/>} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/all' element={<AllRecipes/>}/>
        <Route path='/recipe/:id' element={<DetailsPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App