import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav>
      <div className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1 className='Navbar'>Write to Us</h1>
      <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <NavLink to={"/"} onClick={toggleMobileMenu}>Home</NavLink>
        <NavLink to={"/tienda"} onClick={toggleMobileMenu}>Store</NavLink>
        <NavLink to={"/venta"}>Venta</NavLink>
        <NavLink to={"/Cart"} onClick={toggleMobileMenu}>Cart</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;