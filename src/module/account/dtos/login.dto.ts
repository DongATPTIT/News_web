import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LogInDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    username: string;

    @IsNotEmpty()
    @MinLength(4)
    @IsString()
    @MaxLength(10)

    password: string;
}
