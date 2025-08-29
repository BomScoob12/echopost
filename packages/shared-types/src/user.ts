export type User = {
  _id: string;
  email: string;
  username: string;
  password: string;
};

export type CreateUserDtoType = {
  email: string;
  username: string;
  password: string;
};

export type UpdateUserDtoType = {
  email?: string;
  username?: string;
  password?: string;
};

