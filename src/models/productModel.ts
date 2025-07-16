import mongoose from 'mongoose';

// Create the User model for the users collection
export function createProductModel(client: mongoose.Connection) {
  return client.model('Product', productSchema);
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minLength: [3, 'Name must be at least 3 characters']
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String
  }
});
