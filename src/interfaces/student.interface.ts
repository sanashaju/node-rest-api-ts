import { Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  marks: number;
  class: string;
}

export interface StudentRequestBody {
  name: string;
  marks: number;
  class: string;
}

export interface StudentQuery {
  class?: string;
}
