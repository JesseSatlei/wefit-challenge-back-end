import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';

export enum UserType {
  LegalEntity = 'LegalEntity',
  Individual = 'Individual',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userType: UserType;

  @Column()
  @Unique('unique_document', ['document'])
  document: string;

  @Column()
  name: string;

  @Column()
  cellphone: string;

  @Column()
  telephone: string;

  @Column()
  @Unique('unique_email', ['email'])
  email: string;

  @Column()
  postalCode: string;

  @Column()
  street: string;

  @Column()
  streetNumber: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  state: string;

  async validateDocument(): Promise<boolean> {
    if (this.userType === UserType.Individual) {
      return cpfValidator.isValid(this.document);
    } else if (this.userType === UserType.LegalEntity) {
      return cnpjValidator.isValid(this.document);
    }
    return false;
  }
}
