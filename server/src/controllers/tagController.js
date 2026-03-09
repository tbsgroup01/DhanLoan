const Tag = require("../models/Tag");

/* GET TAGS */

exports.getTags = async (req, res) => {
  try {

    const tags = await Tag.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(tags);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* CREATE TAG */

exports.createTag = async (req, res) => {
  try {

    const { tag_name, tag_code, location } = req.body;

    const tag = await Tag.create({
      tag_name,
      tag_code,
      location,
    });

    res.json({
      success: true,
      tag,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* UPDATE TAG */

exports.updateTag = async (req, res) => {
  try {

    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    await tag.update({
      tag_name: req.body.tag_name,
      tag_code: req.body.tag_code,
      location: req.body.location,
    });

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* DELETE TAG */

exports.deleteTag = async (req, res) => {
  try {

    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    await tag.destroy();

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* TOGGLE ACTIVE */

exports.toggleTag = async (req, res) => {
  try {

    const tag = await Tag.findByPk(req.params.id);

    tag.is_active = !tag.is_active;

    await tag.save();

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};