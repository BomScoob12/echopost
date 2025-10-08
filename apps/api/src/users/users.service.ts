import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { UserDocument, User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserResponseType } from '@echopost/shared-types';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create({
      ...createUserDto,
    });
    return createdUser;
  }

  async save(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  async findOne({ ...args }): Promise<UserDocument | null> {
    return await this.userModel.findOne(args);
  }

  async findOneByEmail(emailReq: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email: emailReq });

    if (!user) {
      throw new NotFoundException(`User with email ${emailReq} not found`);
    }

    return user as UserDocument;
  }

  async getProfile(user: User): Promise<UserResponseType> {
    const userData = await this.findOneByEmail(user?.email);
    const userResponse: UserResponseType = {
      id: userData._id as string,
      username: userData.username,
      email: userData.email,
    };

    return userResponse;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { ...updateUserDto },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return deletedUser;
  }
}
