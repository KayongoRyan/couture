import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Keeping string ID to match frontend types easily
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  secondaryImage: { type: String },
  isNew: { type: Boolean, default: false },
  // Interaction Metrics for Recommendation Algorithm
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 }
});

const Product = mongoose.model('Product', productSchema);
export default Product;