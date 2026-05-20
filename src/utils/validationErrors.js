export const getValidationErrors = (issues = []) => {
  const formatted = {};

  issues.forEach((issue) => {
    formatted[issue.path[0]] = issue.message;
  });

  return formatted;
};
