const SiteSettings = require("../models/SiteSetting");

exports.getSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();

    // If no settings row exists, create one
    if (!settings) {
      settings = await SiteSettings.create({});
    }

    res.json(settings);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const settings = await SiteSettings.findOne();

    let logo = settings.logo;
    let favicon = settings.favicon;

    if (req.files.logo) {
      logo = "/uploads/" + req.files.logo[0].filename;
    }

    if (req.files.favicon) {
      favicon = "/uploads/" + req.files.favicon[0].filename;
    }

    await settings.update({
      site_title: req.body.site_title,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keywords: req.body.meta_keywords,
      copyright: req.body.copyright,
      logo,
      favicon,
    });

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};