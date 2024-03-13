import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from "./components/pages/Header";
import Home from "./components/pages/Home";
import AddBlog from "./components/pages/AddBlog";
import ViewBlog from "./components/pages/ViewBlog"; 
import ViewBlogDesc from "./components/pages/ViewBlogDesc"; 
import './App.css';

 
function App() {
  return (
    <>
    <div className="">
    <BrowserRouter>
      <Header/>
   
      <Routes>
      <Route path="/" element={<Home/>}/>
       <Route path="/addblog" element={<AddBlog/>}/>
        <Route path="/viewblog" element={<Home/>}/>
        <Route path="/link/:id" element={<ViewBlogDesc/>}/>     
      </Routes> 
       </BrowserRouter> 
    </div>
    
    </>
  )
}

export default App;
