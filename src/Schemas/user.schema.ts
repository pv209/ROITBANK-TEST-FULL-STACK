import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String,
  github: Object,
  addressInfo: Object,
});
