import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  User.lookupUser = async (username) => {
    const user = await User.findOne({ where: { username } });
    return user;
  };
  User.prototype.hashPassword = (user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
  };

  User.prototype.isCorrectPassword = (reqPassword, user) => (
    bcrypt.compareSync(reqPassword, user.password)
  );

  User.beforeCreate((user) => (
    user.password && user.hashPassword(user)
  ));

  return User;
};
