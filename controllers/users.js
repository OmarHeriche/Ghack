const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const User = require("../models/User");

const getAllUsers = async (req, res) => {
  const user = await User.find({});
  res.status(StatusCodes.OK).json({ user, count: user.length });
};
module.exports = getAllUsers;