import { useState, useEffect } from 'react';
import axios from 'axios';
import "../crud/crud.css"


const Crud = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', genre: '', price: '' });

  useEffect(() => {
    // Leer todos los libros al cargar el componente
    axios.get('http://localhost:3000/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleCreateBook = () => {
    // Crear un nuevo libro

    const formData = new FormData();
    formData.append('title', newBook.title);
    formData.append('author', newBook.author);
    formData.append('genre', newBook.genres);
    formData.append('price', newBook.price);
    formData.append('poster', newBook.poster); 


      axios.post('http://localhost:3000/books', newBook)
      .then(response => setBooks([...books, response.data]))
      .catch(error => console.error('Error creating book:', error));

    // Limpiar el formulario después de la creación
    setNewBook({ title: '', author: '', genres: '', price: '', poster: ''});
  };

  const handlePosterChange = event => {
    setNewBook({ ...newBook, poster: event.target.files[0] });
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
            value={newBook.title}
            onChange={e => setNewBook({ ...newBook, title: e.target.value })}
          />
        </label>
        <br />
        <label className="crud-label">
          Autor:
          <input
            className="crud-input"
            type="text"
            value={newBook.author}
            onChange={e => setNewBook({ ...newBook, author: e.target.value })}
          />
        </label>
        <br />
        <label className="crud-label">
          Género:
          <input
            className="crud-input"
            type="text"
            value={newBook.genres}
            onChange={e => setNewBook({ ...newBook, genres: e.target.value })}
          />
        </label>
        <br />
        <label className="crud-label">
          Precio:
          <input
            className="crud-input"
            type="text"
            value={newBook.price}
            onChange={e => setNewBook({ ...newBook, price: e.target.value })}
          />
        </label>
        <br />
        <label className="crud-label">
          Póster:
          <input
            className="crud-input"
            type="file"
            accept="image/*"
            onChange={e => setNewBook({ ...newBook, poster: e.target.files[0] })}
          />
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