import { type Request } from 'express';
import { UserDto } from 'src/modules/users/dto/user.dto';

export interface AuthenticatedRequest extends Request {
  user: UserDto;
}
