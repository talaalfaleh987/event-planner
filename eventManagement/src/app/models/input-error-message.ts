import { ValidatorType } from '../enums/input.enum';

export interface InputErrorMessage {
  message: string;
  types: ValidatorType[];
}
