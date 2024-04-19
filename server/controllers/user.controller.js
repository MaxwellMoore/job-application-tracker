const User = require("./../models/user.model");
const { extend } = require("lodash");

const create = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({ error: "Missing Credentials" });
  }
  try {
    const user = new User(req.body);
    await user.save();
    user.password = undefined;
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res) => {
  console.log(req.auth);
  return res.status(200).send(req.profile);
};

const update = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({ error: "Invalid data, cannot update" });
  }
  try {
    let user = req.profile;
    user = extend(user, req.body);
    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res) => {
  try {
    const deletedUser = req.profile;
    const numDeleted = await User.destroy({
      where: {
        user_id: req.profile.user_id,
      },
    });
    if (numDeleted === 0) {
      return res.status(404).send("User not found");
    }
    return res.status(202).send(deletedUser);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: "Failed to delete user" });
  }
};

const userById = async (req, res, next, id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).send({ error: "User not found" });
    user.password = undefined;
    req.profile = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  read,
  update,
  remove,
  userById,
};
