import express from 'express';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import cache from '../utils/cache.js';

const router = express.Router();

// --- ALGORITHM: RECOMMENDATION ENGINE ---
router.get('/recommendations', async (req, res) => {
  try {
    // 1. Fetch all products (In a real app, we might limit this query for performance)
    const products = await Product.find({});
    
    // 2. Simulate User Preferences (In a real app, this comes from req.user.likedCategories)
    // For this demo, let's assume the "algorithm" detects a trend towards 'women's' wear if not logged in,
    // or uses a query param ?category=men to simulate personalization.
    const preferredCategory = req.query.category || null;

    // 3. Calculate Scores
    const scoredProducts = products.map(p => {
      let score = 0;

      // A. Popularity Weighting
      score += (p.likes || 0) * 2;   // Likes are worth 2 points
      score += (p.views || 0) * 1;   // Views are worth 1 point

      // B. Recency Boost (Cold Start Fix)
      if (p.isNew) score += 5;

      // C. Personalization Boost
      if (preferredCategory && p.category === preferredCategory) {
        score += 15; // Huge boost for preferred category
      }

      return { ...p.toObject(), score };
    });

    // 4. Sort by Score (Descending) and take top 3
    scoredProducts.sort((a, b) => b.score - a.score);
    const recommendations = scoredProducts.slice(0, 3);

    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Products (Cached)
router.get('/', async (req, res) => {
  try {
    const cachedProducts = cache.get('all_products');
    if (cachedProducts) {
      return res.json(cachedProducts);
    }

    const products = await Product.find();
    cache.set('all_products', products);
    
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Single Product (Cached by ID)
router.get('/:id', async (req, res) => {
  try {
    const cacheKey = `product_${req.params.id}`;
    const cachedProduct = cache.get(cacheKey);

    if (cachedProduct) {
      // Increment views even if cached (asynchronously update DB)
      Product.updateOne({ id: req.params.id }, { $inc: { views: 1 } }).exec();
      return res.json(cachedProduct);
    }

    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Increment view count
    product.views += 1;
    await product.save();

    cache.set(cacheKey, product);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Toggle Like (Interaction Endpoint)
router.post('/:id/like', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Simple toggle logic: In a real app, we check if user already liked it.
    // Here we just increment to feed the algorithm.
    product.likes += 1;
    await product.save();

    // Invalidate caches because score changed
    cache.del('all_products');
    cache.del(`product_${req.params.id}`);

    res.json({ likes: product.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create Product (Protected: Admin Only)
router.post('/', protect, admin, async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    cache.del('all_products');
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update Product (Protected: Admin Only)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: req.params.id }, 
      req.body, 
      { new: true }
    );
    cache.del('all_products');
    cache.del(`product_${req.params.id}`);
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Product (Protected: Admin Only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.params.id });
    cache.del('all_products');
    cache.del(`product_${req.params.id}`);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;