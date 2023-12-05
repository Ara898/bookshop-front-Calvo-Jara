import mysql from 'mysql2/promise'

//Creamos una constante para la configuración con nuestra DB
const dbConfig ={
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS,
    port: '3306',
    database: "books",
    }
    
export const connection = mysql.createPool(dbConfig);
