import { addDays, addMonths } from 'date-fns';

export class DateHelper {
  static addDays(originalDate: Date, days: number): Date {
    return addDays(originalDate, days);
  }

  static addMonths(originalDate: Date, months: number): Date {
    return addMonths(originalDate, months);
  }
}
