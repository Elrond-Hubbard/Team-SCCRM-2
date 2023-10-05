const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Doctor extends Model {}

Doctor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      //     TODO: PASSWORD HOOK GOES HERE
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "doctor",
  }
);

module.exports = Doctor;
