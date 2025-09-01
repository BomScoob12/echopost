import { UpdateUserDtoType } from '@echopost/shared-types';

export class UpdateUserDto implements UpdateUserDtoType {
  readonly email?: string;
  readonly username?: string;
  readonly password?: string;
}
