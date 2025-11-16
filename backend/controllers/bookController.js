const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get popular books
// @route   GET /api/books/popular
// @access  Public
exports.getPopularBooks = async (req, res) => {
  try {
    // Get top 10 most popular books
    const books = await Book.find({}).sort({ popularityScore: -1 }).limit(10);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- ADMIN ONLY ROUTES ---

// @desc    Add a new book
// @route   POST /api/books
// @access  Private/Admin
exports.addBook = async (req, res) => {
  try {
    const { title, author, year, description, coverImageUrl, category } = req.body;
    const book = new Book({
      title,
      author,
      year,
      description,
      coverImageUrl,
      category,
      // status defaults to 'available'
    });
    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
exports.updateBook = async (req, res) => {
  try {
    const { title, author, year, description, coverImageUrl, status, category } = req.body;
    const book = await Book.findById(req.params.id);

    if (book) {
      book.title = title || book.title;
      book.author = author || book.author;
      book.year = year || book.year;
      book.description = description || book.description;
      book.coverImageUrl = coverImageUrl || book.coverImageUrl;
      book.status = status || book.status;
      book.category = category || book.category;

      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      await book.remove();
      res.json({ message: 'Book removed' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};