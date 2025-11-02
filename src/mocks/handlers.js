import noticesHandlers from './notices';
import usersHandlers from './users';
import additionalFieldTemplatesHandlers from './additionalFieldTemplates';
import userAdditionalFieldsHandlers from './userAdditionalFields';
import claimsHandlers from './claims';
import permissionsHandlers from './permissions';
import rolesHandlers from './roles';
import animalsHandlers from './animals';

const handlers = [
  ...noticesHandlers,
  ...usersHandlers,
  ...additionalFieldTemplatesHandlers,
  ...userAdditionalFieldsHandlers,
  ...claimsHandlers,
  ...permissionsHandlers,
  ...rolesHandlers,
  ...animalsHandlers,
];

export default handlers;
