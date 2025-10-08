export interface UserType {
  id: string;
  email: string;
  username: string;
  password?: string;
  googleId?: string;
}

export interface UserResponseType {
  id: string;
  email: string;
  username: string;
  googleId?: string;
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
