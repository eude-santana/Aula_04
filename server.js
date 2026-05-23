const express = require("express");
const app = express();
const connectDB = require("./config/config");
const Book = require("./models/book");
connectDB();
app.use(express.json());
app.listen(3000, () => console.log("Server running on port 3000"));

app.get("/divide", (req, res) => {
    try {
        const numerador = 10;
        const denominador = 0;

        if (denominador === 0) {
            throw new Error("Não é possível dividir por zero");
            return;
        }
        const resultado = numerador / denominador;
        res.json({resultado})
    } catch (err) {
        res.status(400).json({error: err.message });
    }
})

app.post("/api/books", async (req, res) => {
 try {
   const { title, author, year, genre } = req.body;
   const newBook = new Book({ title, author, year, genre });
   await newBook.save();
   res.status(201).json(newBook);
 } catch (err) {
   res.status(500).json({ error: "Erro ao criar livro" });
 }
});

app.get("/api/books", async (_req, res) => {
 try {
   const books = await Book.find();
   res.json(books);
 } catch (err) {
   res.status(500).json({ error: "Erro ao buscar livros" });
 }
});

app.get("/api/books/:id", async (req, res) => {
 try {
   const { id } = req.params;
   const book = await Book.findById(id);

   if (!book) {
     return res.status(404).json({ error: "Livro não encontrado" });
   }

   res.json(book);
 } catch (err) {
   res.status(500).json({ error: "Erro ao buscar livro" });
 }
});

app.listen(3000, () => console.log("Server running on port 3000"));