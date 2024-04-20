const AppItem = require("./../models/appItem.model");
const { extend } = require("lodash");

const create = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({ error: "Missing App Values" });
  }
  try {
    req.body.user_id = req.profile.user_id;
    const appItem = new AppItem(req.body);
    await appItem.save();
    res.status(201).send(appItem);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res) => {
  return res.status(200).send(req.appItem);
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ error: "Invalid data, cannot update" });
  }
  try {
    let appItem = req.appItem;
    appItem = extend(appItem, req.body);
    await appItem.save();
    return res.status(200).send(appItem);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res) => {
  try {
    const deletedAppItem = req.appItem;
    const numDeleted = await AppItem.destroy({
      where: {
        user_id: req.appItem.user_id,
        app_id: req.appItem.app_id,
      },
    });
    if (numDeleted === 0) {
      return res.status(404).send("Application not found");
    }
    return res.status(202).send(deletedAppItem);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: "Failed to delete application" });
  }
};

const list = async (req, res) => {
  try {
    const apps = await AppItem.findAll({
      attributes: [
        "app_id",
        "job_title",
        "company_name",
        "application_status",
        "createdAt",
        "updatedAt",
      ],
    });
    if (apps.length === 0) {
      return res.status(404).send({ error: "No applications found" });
    }
    return res.status(200).send(apps);
  } catch (error) {
    return res.status(400).send({ error: "Failed to list applications" });
  }
};

const appById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const appId = req.params.appId;
    const appItem = await AppItem.findOne({
      where: { user_id: userId, app_id: appId },
    });
    if (!appItem) {
      return res.status(404).send({ error: "Application not found" });
    }
    req.appItem = appItem;
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
  list,
  appById,
};
