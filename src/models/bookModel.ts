import mongoose from 'mongoose';

// Create the User model for the users collection
export function createBookModel(client: mongoose.Connection) {
  return client.model('Book', bookSchema);
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minLength: [3, 'Title must be at least 3 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    minLength: [3, 'Author must be at least 3 characters']
  },
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true
  },
  publishedDate: {
    type: Date
  },
  inStock: {
    type: Boolean,
    default: true
  }
});
