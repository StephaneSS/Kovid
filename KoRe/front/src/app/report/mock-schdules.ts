import { Schedule } from '../custom-classes'

export const SCHEDULES: Schedule[] = [
    {
        cronValue: '0 22 * * 1-5',
        text: 'At 22:00 on every day-of-week from Monday through Friday'
    },{
        cronValue: '23 0-20/2 * * *',
        text: 'At minute 23 past every 2nd hour from 0 through 20'
    },{
        cronValue: '5 4 * * 5',
        text: 'At 04:05 on Friday'
    },{
        cronValue: '15 14 1 * *',
        text: 'At 14:15 on day-of-month 1'
    }
];