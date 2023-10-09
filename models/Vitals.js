const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Vitals extends Model {}

Vitals.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    systolic: {
      type: DataTypes.INTEGER,
    },
    diastolic: {
      type: DataTypes.INTEGER,
    },
    heartRate: {
      type: DataTypes.INTEGER,
    },
    respRate: {
      type: DataTypes.INTEGER,
    },
    bodyTemp: {
      type: DataTypes.DECIMAL(10, 1),
    },
    O2: {
      type: DataTypes.INTEGER,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "patient",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "vitals",
  }
);

module.exports = Vitals;
