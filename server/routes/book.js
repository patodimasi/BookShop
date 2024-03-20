const express = require("express");
const router = express.Router();


const BookController = require("../controllers/book");
const multerMiddleware = require('../middleware/multerMiddleware');

router.get("/search-books/:libro", BookController.conseguirLibros)
router.post("/add-book", BookController.agregarLibro)
router.put("/edit-book", BookController.editarLibro)
router.delete("/delete-books", BookController.borrarLibros)
router.post("/api/upload", multerMiddleware, BookController.subirImagen)

module.exports = router;
