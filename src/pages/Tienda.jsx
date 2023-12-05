import Navbar from '../componentes/navbar/Navbar';
import BooksList from '../componentes/productos/Bookslist';
import Footer from '../componentes/footer/Footer';

const Tienda = () => {
    return( 
        <>
        <Navbar/>
        <BooksList /> 
        <Footer></Footer>
        </>
    );
};

export default Tienda;
