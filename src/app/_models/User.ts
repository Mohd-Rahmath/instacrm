import {UserRole} from './UserRole';

export class User {
    name: string;
    role: number;
    accessToken?: string;
    lang: string;
    // websocket: any;
    maskedPhone: string;
    roleId: number; // for personal/organization wallet
    orgType: number; //1 = temples,2=ngo
}
