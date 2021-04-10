import noticesHandlers from './notices';
import usersHandlers from './users';
import additionalFieldTemplatesHandlers from './additionalFieldTemplates';
import userAdditionalFieldsHandlers from './userAdditionalFields';

const handlers = [
  ...noticesHandlers,
  ...usersHandlers,
  ...additionalFieldTemplatesHandlers,
  ...userAdditionalFieldsHandlers,
];

export default handlers;
