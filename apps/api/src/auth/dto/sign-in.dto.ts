import { SignInDtoType } from '@echopost/shared-types';

export class SignInDto implements SignInDtoType {
  readonly email: string;
  readonly password: string;
}
