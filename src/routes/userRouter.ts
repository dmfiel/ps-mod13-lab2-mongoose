import express from 'express';
import { db } from '../services/dbSetup';

const router = express.Router();
// const client=getClient();

// create a new user /api/users
router.post('/', async (req, res) => {
  try {
    console.log('Creating new user', req.body);
    const newUser = new db.user(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// get all users  /api/users
router.get('/', async (req, res) => {
  try {
    const users = await db.user.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
});

// get an user by the id  /api/users/id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await db.user.findById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
});

export default router;
