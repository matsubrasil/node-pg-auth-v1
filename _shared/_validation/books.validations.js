const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateBookInput = data => {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';

  if (!Validator.isLength(data.title, { min: 10, max: 300 })) {
    errors.title = 'Title must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  data.authors = !isEmpty(data.authors) ? data.authors : '';

  if (!Validator.isLength(data.authors, { min: 10, max: 300 })) {
    errors.authors = 'Author must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.authors)) {
    errors.authors = 'Author field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateBookInput;
