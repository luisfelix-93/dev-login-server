const bcrypt = require('bcryptjs');

const createPasswordHash = async (password) => {
  return bcrypt.hash(password, 8);
};

const checkPassword = async (userName, password) => {
  return bcrypt.compare(password, userName.password);
};

module.exports = {
  createPasswordHash,
  checkPassword,
};