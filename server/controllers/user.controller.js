const User = require("./../models/user.model");
const { extend } = require("lodash");

const create = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ error: "Email and Password Required" });
  }
  try {
    const isNotUnique = await User.findOne({
      where: { email: req.body.email },
    });
    if (isNotUnique) {
      return res.status(409).send({ error: "Unique Email Required" });
    }
    const user = new User(req.body);
    await user.save();
    user.password = undefined;
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res) => {
  return res.status(200).send(req.profile);
};

const update = async (req, res, next) => {
  console.log(req.body);
  if (!req.body) {
    return res.status(400).send({ error: "Invalid data, cannot update" });
  }
  if (!req.body.password) {
    return res.status(400).send({ error: "Password Required" });
  }
  try {
    let user = req.profile;
    user = extend(user, req.body);
    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
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

const userById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ where: { user_id: userId } });
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
