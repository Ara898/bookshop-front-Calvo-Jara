import { useState, useEffect } from 'react';
import axios from 'axios';
import "../crud/crud.css"


const Crud = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    year: "",
    author: "",
    price: "",
    page: "",
    poster: null,
    genre: [],
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Lee todos los libros al cargar el componente
    axios.get('http://localhost:3000/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleCreateBook = () => {
    // Valida campos antes de crear un nuevo libro
    const errors = {};
    if (!newBook.title.trim()) {
      errors.title = 'El título es obligatorio';
    }
    if (!newBook.year || !newBook.year.toString().trim()) {
      errors.year = 'El año de edición es obligatorio';
    }
    if (!newBook.price.trim()) {
      errors.price = 'El precio es obligatorio';
    }
    if (!newBook.page.trim()) {
      errors.page = 'La cantidad de página son obligatorias';
    }
    if (!newBook.genre.trim()) {
      errors.genre = 'El género es obligatorio';
    }
    if (!newBook.poster || !(newBook.poster instanceof File) || !newBook.poster.name.trim()) {
      errors.poster = 'Inserte una imagen';
    }
    
    
    // Si hay errores, actualiza el estado y evita la creación del libro
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const formData = new FormData();
    formData.append('title', newBook.title);
    formData.append('year', newBook.year);
    formData.append('author', newBook.author);
    formData.append('price', newBook.price);
    formData.append('page', newBook.page)
    formData.append('genre', newBook.genre);
    formData.append('poster', newBook.poster); 
    



    axios.post('http://localhost:3000/books', formData)
    .then(response => {
      console.log('Book created successfully:', response.data);
      setBooks([...books, response.data]);
    })
    .catch(error => {
      console.error('Error creating book:', error);
      if (error.response && error.response.data) {
        console.error('Validation error details:', error.response.data);
      }
    });
    
// Limpia el formulario después de la creación y resetear los errores
    setNewBook({ title: '', year: '',author: '',  price: '', page:'', genre: '', poster: ''});
    setValidationErrors({});
  };


  const handlePosterChange = event => {
    setNewBook({ ...newBook, poster: event.target.files[0] || null });
  };


  const getCurrentYear = () => {
    return new Date().getFullYear();
  };


  return (
    <div>
      <h2 className="title">Crear Nuevo Libro</h2>
      <form className="crud-form">
      <label className="crud-label">
        Título:
        <input
          className="crud-input"
          type="text"
          value={newBook.title || ''} 
          onChange={e => setNewBook({ ...newBook, title: e.target.value })}
        />
        {validationErrors.title && <p className="validation-error">{validationErrors.title}</p>}
      </label>
        <br />
        <br />
        <label className="crud-label">
          Edición (Año):
          <input
            className="crud-input"
            type="number"
            value={newBook.year}
            onChange={e => {
              const parsedValue = parseInt(e.target.value, 10);
              const minValue = 1000;
              const maxValue = getCurrentYear();
              const validValue = Math.min(Math.max(parsedValue, minValue), maxValue);
              setNewBook({ ...newBook, year: validValue });
            }}
            min="1000"
            max={getCurrentYear()}
          />
          {validationErrors.year && <p className="validation-error">{validationErrors.year}</p>}
        </label>
        <br />
        <label className="crud-label">
          Autor:
          <input
            className="crud-input"
            type="text"
            value={newBook.author || ''}
            onChange={e => setNewBook({ ...newBook, author: e.target.value })}
          />
        {validationErrors.author && <p className="validation-error">{validationErrors.author}</p>}
        </label>
        <br />
        <label className="crud-label">
          Precio:
          <input
            className="crud-input"
            type="number"
            value={newBook.price || ''}
            onChange={e => setNewBook({ ...newBook, price: e.target.value })}
            min="100" 
          />
        {validationErrors.price && <p className="validation-error">{validationErrors.price}</p>}
        </label>
        <br />
        <label className="crud-label">
          Páginas (cantidad):
          <input
            className="crud-input"
            type="number"
            value={newBook.page || ''}
            onChange={e => setNewBook({ ...newBook, page: e.target.value })}
            min="100" 
          />
          {validationErrors.page && <p className="validation-error">{validationErrors.page}</p>}
        </label>
        <br/>
        <label>
          Género:
          <select
            className="crud-input"
            value={newBook.genre}
            onChange={e => setNewBook({ ...newBook, genre: e.target.value })}
          >
            <option value="Ciencia ficción">Ciencia ficción</option>
            <option value="Distopía">Distopía</option>
            <option value="Ensayo">Ensayo</option>
            <option value="Ficción feminista">Ficción feminista</option>
            <option value="Literatura infantil">Literatura infantil</option>
            <option value="Misterio">Misterio</option>
            <option value="Novela">Novela</option>
            <option value="Novela filosófica">Novela filosófica</option>
            <option value="Novela gótica">Novela gótica</option>
            <option value="Novela histórica">Novela histórica</option>            
            <option value="Novela psicológica">Novela psicológica</option>
            <option value="Novela satírica">Novela satírica</option>
            <option value="Novela social">Novela social</option>
            <option value="Policial y Psicológico">Policial y Psicológico</option>
            <option value="Realismo mágico">Realismo mágico</option>
            <option value="Romance">Romance</option>            
            <option value="Suspense">Suspense</option>          
            <option value="Terror">Terror</option>
            <option value="Thriller">Thriller</option>
          </select>
        </label>
        <br />
        <label className="crud-label">
        Portada:
        <input
          className="crud-input"
          type="file"
          onChange={handlePosterChange}
        />
        {validationErrors.poster && <p className="validation-error">{validationErrors.poster}</p>}
      </label>
        <br />
        <button className="crud-button" type="button" onClick={handleCreateBook}>
          Crear Libro
        </button>
      </form>
    </div>
  );
};

export default Crud;