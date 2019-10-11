module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    postId:{
      type:DataTypes.UUID,
      onDelete: 'CASCADE',
        references: {
          model: 'Post',
          key: 'id',
          as: 'postId',
        },
      },
    parent: {
      type: DataTypes.UUID,
      allowNull:false
    },
  },
  Comment.associate = function(models) {
    Comment.BelongsTo(models.Post, {
      foreignKey: 'postId',
      onDelete: 'CASCADE',
    });
    // associations can be defined here
  });
  return Comment;
};