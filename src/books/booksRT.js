import { Router } from "express";
import { BookCt } from "./booksCt.js";
import { searchRouter } from "./searchRt.js";

export const router = Router();

router.get("/tienda", BookCt.getAll);

router.get("/:id", BookCt.getById);

router.post("/", BookCt.addOne);

router.use("/books", booksRouter);

router.use("/search", searchRouter);

