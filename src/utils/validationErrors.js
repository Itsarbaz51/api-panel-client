export const getValidationErrors = (errors) => {
	const fieldErrors = {};

	errors.forEach((err) => {
		fieldErrors[err.path[0]] = err.message;
	});

	return fieldErrors;
};
