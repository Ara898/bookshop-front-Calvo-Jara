import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'

function NavBar() {

   return (
     <nav>
       <h1 className='Navbar'>Write to Us</h1>
       <NavLink to={"/"}>Inicio</NavLink>
       <NavLink to={"/tienda"}>Tienda</NavLink>
       <NavLink to={"/venta"}>Venta</NavLink>
     </nav>
   );
 }

 export default NavBar;