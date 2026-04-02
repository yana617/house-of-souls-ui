export const findError = (errors, field) => {
  if (!errors || !errors.some((err) => err.path === field)) {
    return null;
  }
  const error = errors.find((err) => err.path === field);
  return error.msg;
};
