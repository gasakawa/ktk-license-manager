import LicenseModel from './license.model';

export default class SubscriptionModel {
  constructor(
    private sequenceId: string,
    private fullName: string,
    private emailAddress: string,
    private productName: string,
    private date: Date,
    private broker: string,
    private account: string,
    private renewDate: Date,
    private months: number,
  ) {}

  getSequenceId(): string {
    return this.sequenceId;
  }

  getFullName(): string {
    return this.fullName;
  }

  getEmailAddress(): string {
    return this.emailAddress;
  }

  getProductName(): string {
    return this.productName;
  }

  getDate(): Date {
    return this.date;
  }

  getBroker(): string {
    return this.broker;
  }

  getAccount(): string {
    return this.account;
  }

  getMonths(): number {
    return this.months;
  }

  getRenewDate(): Date {
    return this.renewDate;
  }
}
