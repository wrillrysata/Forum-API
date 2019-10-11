import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.lookupEmail = async (email) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return Promise.resolve('Email has not been used');
    }

    return Promise.reject(new Error('Email is already in use'));
  };
  User.prototype.hashPassword = (user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
  };

  User.prototype.isCorrectPassword = (reqPassword, user) => (
    bcrypt.compareSync(reqPassword, user.password)
  );

  User.beforeCreate(user => (
    user.password && user.hashPassword(user)
  ));

  return User;
};