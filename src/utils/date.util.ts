import {
  addMilliseconds as fnsAddMilliseconds,
  getUnixTime as fnsGetUnixTime,
  isValid as fnsIsValid,
  parseISO as fnsParseISO,
} from 'date-fns';
import ms from 'ms';

export class DateUtil {
  static addMillisecondToDate(date?: DateCtx, amount?: number): Date {
    return fnsAddMilliseconds(DateUtil.transformDateToISO(date), amount || 0);
  }

  static isValid(date?: DateCtx) {
    return fnsIsValid(typeof date === 'string' ? Date.parse(date) : date);
  }

  static parseISO(date: DateCtx) {
    return typeof date === 'string' ? fnsParseISO(date) : date;
  }

  static toMs(input: string): number {
    return ms(input);
  }

  static toUnix(date?: DateCtx): number {
    return fnsGetUnixTime(DateUtil.transformDateToISO(date));
  }

  static transformDateToISO(date?: DateCtx) {
    date = (DateUtil.isValid(date) ? date : new Date()) as DateCtx;

    return DateUtil.parseISO(date);
  }
}
