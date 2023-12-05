// Importamos la función 'z' de 'zod' para validar esquemas de datos de manera declarativa
import { z } from "zod";

//Se define el esquema id  y book donde se indica de que tipo será cada campo.
const idSchema = z.object({
    id: z.string(),
});

const bookSchema = z.object({
    title: z.string({ required_error: "Field is required" }),
    year: z.number().int().min(1895).max(currentYear),
    author: z.string({ required_error: "Field is required" }),
    price: z.number().int().positive().min(100),
    page: z.number().int().positive().max(3500),
    poster: z.string().url(),
    genre: z
        .enum([
        "Ciencia ficción",
        "Distopía",
        "Ensayo",
        "Fantasía",
        "Ficción feminista",
        "Ficción postapocalíptica",
        "Literatura infantil",
        "Misterio",
        "Novela",
        "Novela filosófica",
        "Novela gótica",
        "Novela histórica",
        "Novela psicológica",
        "Novela satírica",
        "Novela social",
        "Policial y Psicológico",
        "Realismo mágico",
        "Romance",
        "Suspense",
        "Terror",
        "Thriller",
        ])
        .array(),
});

//Utilizamos el método safeParse para realizar validaciones y que las mismas indiquen si fueron exitosas o no
export function validateBook(object) {
    return bookSchema.safeParse(object);
}

export function validateId(object) {
    return idSchema.safeParse(object);
}