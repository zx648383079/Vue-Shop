import { formatTime } from '@/utils';

export function timeFilter(value: number) {
    if (value < 1000000000) {
        return '';
    }
    return formatTime(new Date(value * 1000));
}
