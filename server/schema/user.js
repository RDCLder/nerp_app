"use strict";

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING(20),
        unique: true
      },
      password: DataTypes.STRING(40),
      email: {
        type: DataTypes.STRING(40),
        unique: true
      }
    },
    {
      freezeTableName: true
    }
  );

  user.associate = models => {};

  return user;
};
