const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
   title: { type: String, required: [true, "O título é obrigatório"], minlength: [3, "O título deve ter pelo menos 3 caracteres"]}, // Título do livro
   author: { type: String, required: [true, "O autor é obrigatório"], minlength: [3, "O nome do autor deve ter pelo menos 3 caracteres"]}, // Autor
   year: { type: Number, required: [true, "O ano de publicação é obrigatório"], min: [1000, "Ano inválido"], max: [new Date().getFullYear(), "O ano não pode ser no futuro"]}, // Ano de publicação
   genre: { type: String, required: [true, "O gênero é obrigatório"] },  // Gênero
   createdAt: { type: Date, default: Date.now }  // Data de criação
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;