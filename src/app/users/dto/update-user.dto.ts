import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    override email?: string | undefined;
    override nombre_completo?: string | undefined;
    override password?: string | undefined;
    override user?: string | undefined;
}
