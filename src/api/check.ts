import type { IDataOne, IData, ICheckIn } from './model';
import { fetch, post } from '@/utils/http';

export const getCanCheckIn = () => fetch<IDataOne<ICheckIn>>('checkin');
export const checkIn = () => post<IDataOne<ICheckIn>>('checkin/home/checkin');
export const getMonth = (month?: string) => post<IData<ICheckIn>>('checkin/home/month', {month});

export const checkInBatch = (data: {
    today: any;
    month: {
        month?: string
    };
}) => post<{
        today: ICheckIn | null;
        month: ICheckIn[];
    }>('checkin/batch', data);
