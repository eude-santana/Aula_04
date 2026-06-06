const express = require("express");
const router = express.Router();
const validateTitle = require("../middlewares/validateTitle");
const Book = require("../models/book");

const bookController = require('../controllers/bookController');
router.post("/books", validateTitle, bookController.createBook);

router.post("/books", validateTitle, async (req, res) => {
 try {
   const { title, author, year, genre } = req.body;
   const newBook = new Book({ title, author, year, genre });
   await newBook.save();
   res.status(201).json(newBook);
 } catch (err) {
   res.status(500).json({ error: "Erro ao criar livro" });
 }
});

module.exports = router