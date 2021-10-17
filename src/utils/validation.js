// eslint-disable-next-line import/prefer-default-export
export const findError = (errors, field) => {
  if (!errors || !errors.some((err) => err.param === field)) {
    return null;
  }
  const error = errors.find((err) => err.param === field);
  return error.msg;
};
