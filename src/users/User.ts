import { Document } from 'mongoose';

export class User extends Document {
  name: string;
  age: number;
  address: string;
  github: object;
  addressInfo: object;
}
