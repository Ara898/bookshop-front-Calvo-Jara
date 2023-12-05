import Navbar from '../componentes/navbar/Navbar';


const Home = () => {
    return (
        <div>
            <Navbar/> 
            <h1 className='Navbar'>Cada libro es una nueva aventura</h1>
            <div className="padre">
                    <div className="hijo">
                        <img src='https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2022/03/libros-antiguos-2644117.jpg?tf=1200x' className='imagen-inicio'/>
                    </div>
            </div>
        </div>
     );
  };


export default Home;
