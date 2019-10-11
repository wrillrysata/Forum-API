module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: {
       type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
    },
    post: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    postType: {
      type: DataTypes.STRING,
      allowNull:false
    },
  },
  Post.associate = function(models) {
    Post.BelongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  });
  return Post;
};