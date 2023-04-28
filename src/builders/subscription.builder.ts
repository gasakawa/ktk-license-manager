import { DateHelper } from 'helpers/date.helper';
import SubscriptionModel from 'model/subscription.model';

export class SubscriptionBuilder {
  private _sequenceId: string;
  private _fullName: string;
  private _emailAddress: string;
  private _productName: string;
  private _date: Date = new Date();
  private _broker: string;
  private _account: string;
  private _renewDate: Date = new Date();
  private _months: number;

  setFullName(fullName: string): SubscriptionBuilder {
    this._fullName = fullName;
    return this;
  }

  setEmailAddress(emailAddress: string): SubscriptionBuilder {
    this._emailAddress = emailAddress;
    return this;
  }

  setProductName(productName: string): SubscriptionBuilder {
    this._productName = productName;
    return this;
  }

  setDate(date: Date): SubscriptionBuilder {
    this._date = date;
    return this;
  }

  setBroker(broker: string): SubscriptionBuilder {
    this._broker = broker;
    return this;
  }

  setAccount(account: string): SubscriptionBuilder {
    this._account = account;
    return this;
  }

  setMonths(months: number): SubscriptionBuilder {
    this._months = months;
    this._renewDate = DateHelper.addMonths(this._date, this._months);
    return this;
  }

  setSequenceId(sequenceId: string): SubscriptionBuilder {
    this._sequenceId = sequenceId;
    return this;
  }

  build(): SubscriptionModel {
    return new SubscriptionModel(
      this._sequenceId,
      this._fullName,
      this._emailAddress,
      this._productName,
      this._date,
      this._broker,
      this._account,
      this._renewDate,
      this._months,
    );
  }
}
