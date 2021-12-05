import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './User';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

  async findByName(name: string) {
    return this.userModel.findOne({ name }).exec();
  }

  async create(user: User) {
    const exists = await this.findByName(user.name);
    if (exists) {
      return this.update(user);
    }

    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async update(user: User) {
    await this.userModel.updateOne({ name: user.name }, user).exec();
    return this.findByName(user.name);
  }

  async remove(id: string) {
    return await this.userModel.deleteOne({ _id: id }).exec();
  }
  async removeAll() {
    return this.userModel.deleteMany({}).exec();
  }
}
