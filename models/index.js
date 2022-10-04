const User = require('./User');
const Content = require('./content');
const Comment = require('./comment');

Content.hasMany(Comment, {
  foreignKey: 'content_id',
});

Comment.belongsTo(Content, {
  foreignKey: 'content_id',
});

User.hasMany(Content, {
  foreignKey: "user_id"
})

Content.belongsTo(User, {
  foreignKey: "user_id"
})

module.exports = { User, Comment, Content };
