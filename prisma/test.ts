import { randAddress, randEmail, randFullName } from '@ngneat/falso';

const user = { email: randEmail(), name: randFullName() };

const emails = randEmail({ length: 10 });
const address = randAddress()
console.log(address);
console.log(user)