export interface UserType {
  _id: string;
  email: string;
  username: string;
  password: string;
}

export interface CreateUserDtoType {
  email: string;
  username: string;
  password: string;
}

export interface UpdateUserDtoType {
  email?: string;
  username?: string;
  password?: string;
}
