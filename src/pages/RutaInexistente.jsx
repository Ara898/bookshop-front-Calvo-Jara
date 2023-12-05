import '../componentes/NonExistRoute/NonExistRoute.css'
import Navbar from '../componentes/navbar/Navbar';
import NonExistentRoute from '../componentes/NonExistRoute/NonExistRoute'
import image from '../assets/pngwing.com.png'
import { Link } from "react-router-dom";


const RutaInexistente = () => {
    return (
        <div>
            <Navbar></Navbar>
            <NonExistentRoute></NonExistentRoute>
            <img src={image} className='imagen-error'></img>
            <Link to="/" className='botones-paginacion'>
            <button className='boton'>Ir a la página principal</button>
            </Link>
        </div>
    )
}

export default RutaInexistente