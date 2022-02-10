export class Person {
  constructor(init?: Partial<Person>) {
    Object.assign(this, init);
  }
  personId: number = 0;
  personName: string;
  personSurname: string;
  phoneNumber: string;
  personMail: string;
}
