const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const User = require("../models/User");

const getAllUsers = async (req, res) => {
  const user = await User.find({}).sort({ rating: -1 });
  res.status(StatusCodes.OK).json({ user, count: user.length });
};
const updateUser = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id:req.user.userId},
    req.body,
    { new: true, runValidators: true }
  );
  if (!user) {
    throw new NotFoundError(`no user with email: ${req.email}`);
  }
  res.status(StatusCodes.OK).json({ user });
};
module.exports = {getAllUsers,updateUser};