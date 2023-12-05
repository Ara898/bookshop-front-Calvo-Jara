import { connection } from "../../db_config.js";

//Aca se realizara los modelos de consultas a nuestra DB
export class BooksModel {


    static async getAll(author){
        if (!author) {
            const [books, _info] = await
            connection.query(
                `SELECT
                b.title,
                GROUP_CONCAT(g.name SEPARATOR ', ') AS genres,
                b.year,
                b.author,
                b.poster,
                b.price,
                b.page,
                BIN_TO_UUID(b.id) AS id
            FROM
                books b
            JOIN
                book_genres bg ON bg.book_id = b.id
            JOIN
                genres g ON bg.genre_id = g.id
                
            GROUP BY b.id
            ORDER BY b.title`);
            return books.length ? books : null;
        }

        const [books, _info] = await connection.query(
            `SELECT
            b.title,
            GROUP_CONCAT(g.name SEPARATOR ', ') AS genres,
            b.year,
            b.author,
            b.poster,
            b.price,
            b.page,
            BIN_TO_UUID(b.id) AS id
        FROM
            books b
        JOIN
            book_genres bg ON bg.book_id = b.id
        JOIN
            genres g ON bg.genre_id = g.id        
            WHERE author LIKE '%' ? '%'
            GROUP BY b.id;
        `,
            [author]
        );
        return books.length ? books : null;
    }

 
    static async getById(id) {
        const [books, _info] = await connection.query(
    `     
    SELECT title, year, author, BIN_TO_UUID(id) as id, poster, price, page  FROM books WHERE id = UUID_TO_BIN(?)`,
        [id]
        );
        return books;
        }


    static async deleteOne(id) {
        const [info] = await connection.query(
            `DELETE FROM books WHERE books.id = UUID_TO_BIN(?)`,
            [id]
            );
            return info.affectedRows;
        }



    static async addOne(books) {
        const {title, year, author, poster, price, page, genre} = books;
        
        const result = await connection.query(
            `
            INSERT INTO books (title, year, author, poster, price, page) 
            VALUES (?,?,?,?,?,?)`,
            [title, year, author, poster, price, page]
            );
            for (const gen of genre) {
                await connection.query(
                `
                INSERT INTO book_genres (book_id, genre_id) SELECT b.id, g.id
                FROM books b JOIN genres g ON b.title = ? AND g.name IN ('${gen}')`,
                [title]
                );
            }
            return result ? result : null;
        }



    static async updateOne(id, partialBook) {
            let queryString = "";
            for (const key in partialBook) {
                queryString += `${key} = '${partialBook[key]}', `;
            }
            queryString = queryString.slice(0, -2);
            const [result, _info] = await connection.query(
                `UPDATE books SET ${queryString} WHERE books.id = UUID_TO_BIN(?)`,
                [id]
            );
            return result.affectedRows;
        }
        
        static async searchByTitle(title) {
            const [books, _info] = await connection.query(
                `SELECT * FROM books WHERE title LIKE ?`,
                [`%${title}%`]
            );
    
            return books.length ? books : null;
        }
}


//manejo de datos con formularios en react