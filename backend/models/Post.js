module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        caption: {
            type: DataTypes.STRING,
        },
        picture_url: {
            type: DataTypes.STRING(6000)
        }
    }, {
        tableName: "posts"
    });

    Post.associate = models => {
        Post.belongsTo(models.User, { foreignKey: "user_id" })
        Post.hasMany(models.Comment, { foreignKey: "post_id" })
    }

    return Post
};