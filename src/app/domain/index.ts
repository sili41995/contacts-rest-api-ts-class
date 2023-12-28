import Auth from './auth/auth';
import Contacts from './contacts/contacts';

type AuthController = typeof Auth;
type ContactsController = typeof Contacts;

const controllers = <[AuthController, ContactsController]>[Auth, Contacts];

export { controllers };
