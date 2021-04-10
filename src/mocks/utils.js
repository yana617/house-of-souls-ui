/*
Probably it's overcomplicate mock server a bit and all these checks might be avoided
*/

const NOTICE_REQUIRED_FIELDS = ['title', 'description'];
const NOTICE_ALLOWED_FIELDS = [...NOTICE_REQUIRED_FIELDS, 'authorized'];

const USER_REQUIRED_FIELDS = ['name', 'surname', 'phone', 'birthday', 'password'];
const USER_ALLOWED_FIELDS = [...USER_REQUIRED_FIELDS];

const ADDITIONAL_FIELD_TEMPLATE_REQUIRED_FIELDS = ['label', 'description'];
const ADDITIONAL_FIELD_TEMPLATE_ALLOWED_FIELDS = [...ADDITIONAL_FIELD_TEMPLATE_REQUIRED_FIELDS, 'icon'];

const USER_ADDITIONAL_FIELD_REQUIRED_FIELDS = ['additional_field_template_id', 'value', 'user_id'];
const USER_ADDITIONAL_FIELD_ALLOWED_FIELDS = [...USER_ADDITIONAL_FIELD_REQUIRED_FIELDS];

const clearRequestData = (allowedFields = []) => (data = {}) => {
  if (allowedFields.length === 0) return data;

  return allowedFields.reduce((result, field) => ({
    ...result,
    [field]: data[field],
  }), {});
};

const checkRequiredFields = (requiredFields = []) => (data = {}) => {
  if (requiredFields.length === 0) return data;

  return requiredFields.reduce((result, field) => {
    if (data[field]) return result;

    return {
      ...result,
      error: true,
      requiredFields: [
        ...result.requiredFields,
        field,
      ],
    };
  }, { error: false, errorMessage: 'Please fill required fields', requiredFields: [] });
};

export default {
  clearNoticeRequest: clearRequestData(NOTICE_ALLOWED_FIELDS),
  checkRequiredNoticeFields: checkRequiredFields(NOTICE_REQUIRED_FIELDS),
  clearUserRequest: clearRequestData(USER_ALLOWED_FIELDS),
  checkRequiredUserFields: checkRequiredFields(USER_REQUIRED_FIELDS),
  clearAdditionalFieldTemplateRequest: clearRequestData(ADDITIONAL_FIELD_TEMPLATE_ALLOWED_FIELDS),
  checkRequiredAdditionalFieldTemplateFields: checkRequiredFields(ADDITIONAL_FIELD_TEMPLATE_REQUIRED_FIELDS),
  clearUserAdditionalFieldRequest: clearRequestData(USER_ADDITIONAL_FIELD_ALLOWED_FIELDS),
  checkRequiredUserAdditionalFieldFields: checkRequiredFields(USER_ADDITIONAL_FIELD_REQUIRED_FIELDS),
};
