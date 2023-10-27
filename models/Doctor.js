const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class Doctor extends Model {
  // use built-in bcrypt compareSync in order to compare the entered password to db and return true/false
  passwordAuth(userPassword) {
    return bcrypt.compareSync(userPassword, this.password);
  }
}

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
    loginID: {
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
      //hash the password before adding it to the db
      beforeCreate: async (data) => {
        data.password = await bcrypt.hash(data.password, 10);
        return data;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "doctor",
  }
);

module.exports = Doctor;
