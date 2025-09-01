import { CreateUserDtoType } from '@echopost/shared-types';
export class CreateUserDto implements CreateUserDtoType {
  readonly email: string;
  readonly username: string;
  readonly password: string;
}
