const db = require("../database");
const Sequelize = require("sequelize");

module.exports = db.define("example", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
