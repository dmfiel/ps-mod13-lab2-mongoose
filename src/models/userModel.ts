import mongoose from 'mongoose';

// Create the User model for the users collection
export function createUserModel(client: mongoose.Connection) {
  return client.model('User', userSchema);
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minLength: [3, 'Username must be at least 3 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true, // Converts email to lowercase
    match: [/.+@.+\..+/, 'Please enter a valid email address'] // Regex for email format
  },
  age: {
    type: Number,
    min: [18, 'Must be at least 18 years old'], // Minimum value
    max: 120 // Maximum value
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin'], // The value must be one of these strings
      message: '{VALUE} is not a supported role'
    },
    default: 'user' // If not provided, defaults to 'user'
  },
  createdAt: {
    type: Date,
    default: () => Date.now(), // Sets the value to the current date/time
    immutable: true // Cannot be changed after creation
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});
