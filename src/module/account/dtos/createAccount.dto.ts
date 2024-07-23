import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { maxLengthPw, minLengthPw } from "../../../core/constants/common.constant";

export class createAccountDto{
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  username: string;

  @IsNotEmpty()
  @MinLength(minLengthPw)
  @IsString()
  @MaxLength(maxLengthPw)
  password: string;
}