import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './User';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

  async create(user: User) {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, user: User) {
    await this.userModel.updateOne({ _id: id }, user).exec();
    return this.findOne(id);
  }

  async remove(id: string) {
    return await this.userModel.deleteOne({ _id: id }).exec();
  }
}
