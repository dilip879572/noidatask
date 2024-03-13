 
import React, { useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import '../styles/Header.css'

function Header() {
 
  return (
   <div className="navbars ">
  

   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
     <b  style={{"color":"red"}}>TASK</b>
    </a>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        

         
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to='/'>
         Home
          </Link>
        </li>

        {/* <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to='/viewblog'>
          viewblog
          </Link>
        </li> */}
        

        
      </ul>
     
    </div>
  </div>
</nav>

  
   </div>
  );
}

export default Header;





