import NavBar from "../componentes/navbar/Navbar";
import Crud from "../componentes/crud";

const Venta = () => {
    return(
    <>
        <NavBar/>
        <h1 className='Navbar'>El lugar donde podes darle una segunda vida a tu libro</h1>
        <Crud></Crud>
    </>
    );
};

export default Venta;