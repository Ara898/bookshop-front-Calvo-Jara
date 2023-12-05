import NavBar from "../componentes/navbar/Navbar";
import Crud from "../componentes/crud/crud";
import Footer from "../componentes/footer/Footer";


const Venta = () => {
    return(
    <>
        <NavBar/>
        <h1 className='phrase'>El lugar donde podes darle una segunda vida a tu libro</h1>
        <Crud></Crud>
        <Footer/>
    </>
    );
};

export default Venta;