import noticesHandlers from './notices';
import usersHandlers from './users';

const handlers = [
  ...noticesHandlers,
  ...usersHandlers,
];

export default handlers;
