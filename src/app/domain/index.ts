import Auth from './auth/auth';
import Contacts from './contacts/contacts';

type Controller = typeof Auth | typeof Contacts;

const controllers = <Controller[]>[Auth, Contacts];

export { controllers };
