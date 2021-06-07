import noticesHandlers from './notices';
import usersHandlers from './users';
import additionalFieldTemplatesHandlers from './additionalFieldTemplates';
import userAdditionalFieldsHandlers from './userAdditionalFields';
import claimsHandlers from './claims';

const handlers = [
  ...noticesHandlers,
  ...usersHandlers,
  ...additionalFieldTemplatesHandlers,
  ...userAdditionalFieldsHandlers,
  ...claimsHandlers,
];

export default handlers;
