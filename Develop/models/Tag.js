const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

// create our Tag model
class Tag extends Model {}

Tag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
  },
  
  // defined a tag_name column
  tag_name: {
    type: DataTypes.STRING,
  }
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
