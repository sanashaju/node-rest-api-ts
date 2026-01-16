import { Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  author: string;
  price: number;
  category?: string;
  publisher?: string;
  isbn?: string;
  stock?: number;
}

export interface ProductRequestBody {
  title: string;
  author: string;
  price: number;
  category?: string;
  publisher?: string;
  isbn?: string;
  stock?: number;
}

export interface CreateProductDTO {
  title: string;
  author: string;
  price: number;
  category?: string;
  publisher?: string;
  isbn?: string;
  stock: number;
}

export interface UpdateProductDTO {
  title?: string;
  author?: string;
  price?: number;
  category?: string;
  publisher?: string;
  isbn?: string;
  stock?: number;
}
