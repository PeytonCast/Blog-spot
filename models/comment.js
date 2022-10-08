// comment is like content except
// it will belong to the content
// content belongs to user
// a user can have many contents but a content can only have on user
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {};

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },

        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // this is what article the comment belongs to 
        content_id: {
            type: DataTypes.UUID,
            unique: true,
            references: {
              model: 'content',
              key: 'id',
            },
        },
        // this is who commented to the article
        commented_user: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
              },
        }

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
)
module.exports = Comment;