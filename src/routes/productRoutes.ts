import express from 'express';
import { db } from '../services/dbSetup';

const router = express.Router();
// const client=getClient();

// create a new product /products
router.post('/', async (req, res) => {
  try {
    console.log('Creating new product', req.body);
    const newProduct = new db.product(req.body);
    await newProduct.save();

    if (newProduct) res.status(201).json(newProduct);
    else res.status(500).json({ message: `Unable to create product.` });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// get all products  /products
router.get('/', async (req, res) => {
  try {
    const match = {};
    const sortBy = {};
    for (const param in req.query) {
      const value = req.query[param];
      if (value)
        switch (param.toLowerCase()) {
          case 'sortby':
            for (const sortField of value.toString().split(',')) {
              const [field, direction] = sortField.split('_');
              sortBy[field] = direction === 'asc' ? 1 : -1;
            }
            break;
          case 'min':
            if (!match['price']) match['price'] = {};
            match['price']['$gte'] = value;
            break;
          case 'max':
            if (!match['price']) match['price'] = {};
            match['price']['$lte'] = value;
            break;
          default:
            // match[param] = value;
            match[param] = { $eq: value };
        }
    }
    console.log('Query: ', match);
    console.log('Sort: ', sortBy);
    const products = await db.product.find(match).sort(sortBy);

    if (products) {
      res.json(products);
      console.log(`Query returned (${products.length}) products.`);
    } else res.status(500).json({ message: `Unable to show products.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
});

// get an product by the id  /products/id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await db.product.findByIdAndDelete(id);

    if (product) res.json(product);
    else res.status(500).json({ message: `Unable to delete product (${id}).` });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
});

// Add sample products to database  GET /api/products/seed
router.get('/seed', async (req, res) => {
  try {
    //await db.product.deleteMany({});

    const sampleProducts = [
      { name: 'Wireless Mouse', price: 25.99, category: 'Electronics' },
      { name: 'Bluetooth Speaker', price: 49.99, category: 'Electronics' },
      { name: 'Yoga Mat', price: 19.99, category: 'Fitness' },
      { name: 'Running Shoes', price: 89.99, category: 'Footwear' },
      { name: 'Coffee Maker', price: 39.99, category: 'Kitchen' },
      { name: 'Notebook Pack', price: 12.99, category: 'Stationery' },
      { name: 'Desk Lamp', price: 22.99, category: 'Home' },
      { name: 'Water Bottle', price: 9.99, category: 'Fitness' },
      { name: 'Backpack', price: 34.99, category: 'Accessories' },
      { name: 'Smartwatch', price: 129.99, category: 'Electronics' }
    ];

    const createdProducts = await db.product.insertMany(sampleProducts);
    res
      .status(201)
      .json({ message: 'Seed successful', products: createdProducts });
  } catch (error) {
    res.status(500).json({ message: 'Seed failed', error: error.message });
  }
});

export default router;
