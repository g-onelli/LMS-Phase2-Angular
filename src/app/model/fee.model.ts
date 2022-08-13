import {Patron} from 'src/app/model/patron.model'

export class FeeModel {
    id?: number;
    datePaid: string;
    feeType: string;
    total: number;
    patronName?: string;
    patronBalance?: number;
}