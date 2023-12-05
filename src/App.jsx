import './index.css';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Tienda from './pages/Tienda.jsx';
import BooksList from './componentes/productos/Bookslist';
import RutaInexistente from './pages/RutaInexistente.jsx';
import Venta from './pages/Venta.jsx';


function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route> 
          <Route path="/tienda" element={<Tienda/>}></Route>
          <Route path="/productos" element={<BooksList/>}></Route>
          <Route path="/venta" element={<Venta/>}></Route>
          <Route path="*" element={<RutaInexistente/>}></Route>
        </Routes>
    </BrowserRouter>
    </>
  );
}


export default App ;