const { DataTypes } = require("sequelize");
const sequelize = require("../config/mysql");

const SiteSettings = sequelize.define("site_settings", {
  site_title: DataTypes.STRING,
  meta_title: DataTypes.STRING,
  meta_description: DataTypes.TEXT,
  meta_keywords: DataTypes.TEXT,
  copyright: DataTypes.STRING,
  logo: DataTypes.STRING,
  favicon: DataTypes.STRING,
});

module.exports = SiteSettings;