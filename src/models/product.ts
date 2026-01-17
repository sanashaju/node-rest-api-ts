import mongoose, { Model, Schema } from 'mongoose';
import { IProduct } from '../interfaces/product.interface.js';

// ✅ Define schema
const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, minlength: 2 },
    author: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: String,
    publisher: String,
    isbn: { type: String, unique: true },
    stock: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// ✅ Create model
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;
