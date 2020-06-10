import { User } from './user.model';

export interface AdminUser extends User {
    firstName: string;
    lastName: string;
    cardType: string;
    cardId: string;
    function: string;
}
