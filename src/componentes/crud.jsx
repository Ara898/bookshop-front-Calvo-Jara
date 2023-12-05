import { useState, useEffect } from 'react';
import axios from 'axios';
import "../componentes/crud.css"

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

  const handleUpdateBook = (bookId, updatedBook) => {
    // Actualizar un libro existente
    axios.put(`http://localhost:3000/books/${bookId}`, updatedBook)
      .then(response => {
        const updatedBooks = books.map(book => (book.id === bookId ? response.data : book));
        setBooks(updatedBooks);
      })
      .catch(error => console.error('Error updating book:', error));
  };

  const handleDeleteBook = bookId => {
    // Eliminar (DELETE) un libro existente
    axios.delete(`http://localhost:3000/books/${bookId}`)
      .then(response => {
        if (response.status === 200) {
          const updatedBooks = books.filter(book => book.id !== bookId);
          setBooks(updatedBooks);
        }
      })
      .catch(error => console.error('Error deleting book:', error));
  };

  const handlePosterChange = event => {
    setNewBook({ ...newBook, poster: event.target.files[0] });
  };

  return (
    <div>
      <h2>Libros en lista:</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
                <div className='imagen-venta'>
                  <img className='imagen-venta' src={book.poster} alt={book.title} />
                </div>
            <strong>{book.title}</strong> <br></br>
            {book.author} | {book.genres} | ${book.price} <br></br>
            <button className="boton-crud" onClick={() => handleUpdateBook(book.id, { title: 'Updated Title', author: 'Updated Author', genre: 'Updated Genre', price: 'Updated Price' })}>
              Actualizar
            </button>
            <button className="boton-crud" onClick={() => handleDeleteBook(book.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h2>Crear Nuevo Libro</h2>
      <form>
        <label>
          Título:
          <input
            type="text"
            value={newBook.title}
            onChange={e => setNewBook({ ...newBook, title: e.target.value })}
          />
        </label>
        <br />
        <label>
          Autor:
          <input
            type="text"
            value={newBook.author}
            onChange={e => setNewBook({ ...newBook, author: e.target.value })}
          />
        </label>
        <br />
        <label>
          Género:
          <input
            type="text"
            value={newBook.genres}
            onChange={e => setNewBook({ ...newBook, genres: e.target.value })}
          />
        </label>
        <br />
        <label>
          Precio:
          <input
            type="text"
            value={newBook.price}
            onChange={e => setNewBook({ ...newBook, price: e.target.value })}
          />
        </label>
        <br />
        <label>
          Póster:
          <input 
          type="file"  
          accept="image/*" 
          onChange={e => setNewBook({ ...newBook, poster: e.target.value})}
          />
        </label>
        <br/>
        <button className="boton-crud" type="button"  onClick={handleCreateBook}>
          Crear Libro
        </button>
      </form>
    </div>
  );
};

export default Crud;
