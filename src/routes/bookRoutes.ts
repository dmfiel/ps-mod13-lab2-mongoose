import express from 'express';
import { db } from '../services/dbSetup';

const router = express.Router();
// const client=getClient();

// create a new book POST /books
router.post('/', async (req, res) => {
  try {
    console.log('Creating new book', req.body);
    const newbook = new db.book(req.body);
    await newbook.save();

    if (newbook) res.status(201).json(newbook);
    else res.status(500).json({ message: `Unable to create book.` });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// update a book PUT /books/id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Querying books for id: ${id} and updating book: `, req.body);
  try {
    const options = { new: true }; // Return the book *after* the update
    const book = await db.book.findByIdAndUpdate(id, req.body, options);

    // console.log(book);
    if (book) res.status(204).json({ message: 'Updated book.' });
    else res.status(500).json({ message: 'Unable to update book.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// get all books  /books
router.get('/', async (req, res) => {
  try {
    const match = {};
    for (const param in req.query)
      if (req.query[param]) match[param] = req.query[param];

    const books = await db.book.find(match);

    if (books) {
      res.json(books);
      console.log(`Query returned (${books.length}) books.`);
    } else res.status(500).json({ message: `Unable to show books.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
});

// get an book by the id  /books/id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Querying books for id: ${id}`);
  try {
    const book = await db.book.findById(id);

    if (book) res.json(book);
    else res.status(500).json({ message: `Unable to find book (${id}).` });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
});

// delete a book by the id  /books/id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Deleting book id: ${id}`);
  try {
    const book = await db.book.findByIdAndDelete(id);

    if (book) res.json(book);
    else res.status(500).json({ message: `Unable to find book (${id}).` });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
});

export default router;
