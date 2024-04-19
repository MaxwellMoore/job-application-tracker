const User = require("./../models/user.model");

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

const read = async (req, res) => {};

const update = async (req, res, next) => {};

const remove = async (req, res) => {};
