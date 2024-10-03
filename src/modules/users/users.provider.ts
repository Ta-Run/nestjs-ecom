import { User } from './users.entity';
import { USER_REPOSITORY } from '../../core/database/constant';

export const usersProviders = [{
    provide: USER_REPOSITORY,
    useValue: User,
}]