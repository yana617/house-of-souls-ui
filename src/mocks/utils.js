/*
Probably it's overcomplicate mock server a bit and all these checks might be avoided
 */

const NOTICE_ALLOWED_FIELDS = ['authorized', 'title', 'description'];
const NOTICE_REQUIRED_FIELDS = ['title', 'description'];

const USER_ALLOWED_FIELDS = ['name', 'surname', 'egida_nick', 'phone', 'password', 'user_additional_fields'];
const USER_REQUIRED_FIELDS = ['name', 'phone', 'password'];

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
};
