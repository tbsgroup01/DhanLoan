const { DataTypes } = require("sequelize");
const sequelize = require("../config/mysql");

const Tag = sequelize.define("tags", {
  tag_name: {
    type: DataTypes.STRING,
  },

  tag_code: {
    type: DataTypes.TEXT("long"),
  },

  location: {
    type: DataTypes.ENUM("head", "body"),
    defaultValue: "head",
  },

  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Tag;