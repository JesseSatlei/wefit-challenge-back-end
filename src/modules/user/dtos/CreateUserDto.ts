export enum UserType {
  LegalEntity = 'LegalEntity',
  Individual = 'Individual',
}

export class CreateUserDto {
  userType: UserType;
  document: string;
  name: string;
  cellphone: string;
  telephone: string;
  email: string;
  postalCode: string;
  street: string;
  streetNumber: string;
  city: string;
  neighborhood: string;
  state: string;
}
