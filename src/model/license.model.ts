import { CryptoHelper } from 'helpers/crypto.helper';
import 'dotenv/config';
import { StringHelper } from 'helpers/string.helper';
import SubscriptionModel from './subscription.model';
import { DateHelper } from 'helpers/date.helper';
import { format } from 'date-fns';

export default class LicenseModel {
  private _productNameHash: string;
  private _accountIdHash: string;
  private _customerIdHash: string;
  private _signature: string;
  private _payload: string;

  constructor(private subscription: SubscriptionModel) {}

  hashName(): void {
    this._productNameHash = CryptoHelper.stringToHash(
      this.subscription.getProductName(),
      'sha256',
    );
  }

  hashAccountId(): void {
    this._accountIdHash = CryptoHelper.stringToHash(
      this.subscription.getAccount(),
      'sha256',
    );
  }

  hashCustomerId(): void {
    this._customerIdHash = CryptoHelper.stringToHash(
      this.subscription.getEmailAddress(),
      'sha256',
    );
  }

  createSignature(): void {
    const secret = process.env.HASH_KEY;
    const secretReverse = CryptoHelper.stringToHash(
      StringHelper.reverse(secret),
      'md5',
    );
    const signature = `${secret}\n${this._payload}\n${secretReverse}`;
    this._signature = CryptoHelper.stringToHash(signature, 'sha256');
  }

  createPayload(): void {
    const renewDate = DateHelper.addDays(this.subscription.getRenewDate(), 1); // add 1 day because JS reduce one day YYYY-MM-DDT00:00:00.000Z
    const graceDate = DateHelper.addDays(
      renewDate,
      Number(process.env.GRACE_PERIOD),
    );
    this._payload = `${process.env.VERSION}\n${this._productNameHash}\n${
      this._customerIdHash
    }\n${this._accountIdHash}\n${format(renewDate, 'yyyy.MM.dd')}\n${format(
      graceDate,
      'yyyy.MM.dd',
    )}\n[...]`;
  }

  getProductNameHash(): string {
    return this._productNameHash;
  }

  getAccountIdHash(): string {
    return this._accountIdHash;
  }

  getCustomerIdHash(): string {
    return this._customerIdHash;
  }

  generateLicense(): string {
    this.hashName();
    this.hashAccountId();
    this.hashCustomerId();
    this.createPayload();
    this.createSignature();
    return `${this._signature}\n${this._payload}`;
  }
}
