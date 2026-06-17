const Book = require("../models/book");

const createBook = async (req, res) => {
 try {
   const { title, author, year, genre } = req.body;
   const newBook = new Book({ title, author, year, genre });
   await newBook.save();
   res.status(201).json(newBook);
 } catch (err) {
   res.status(500).json({ error: "Erro ao criar livro" });
 }
};

const listBooks = async (req, res) => {
try {
	let query = {};
	if (req.query.title) {
		query.title = { $regex: req.query.title, $options: "i" };
	}
	if (req.query.author) {
		query.author = req.query.author;
	}

  let sort = {};
   if (req.query.sortBy) {
     const sortField = req.query.sortBy;
     const sortOrder = req.query.order === 'desc' ? -1 : 1;
     sort[sortField] = sortOrder;
   }

   const pageNumber = parseInt(req.query.pageNumber) || 1;
   const pageSize = parseInt(req.query.pageSize) || 5;
   const skip = (pageNumber - 1) * pageSize;

	const books = await Book.find(query).skip(skip).limit(pageSize);
	res.json(books);
} catch (err) {
	res.status(500).json({ error: "Erro ao buscar livros" });
}
};

module.exports = { createBook };

//module.exports = { listBooks };