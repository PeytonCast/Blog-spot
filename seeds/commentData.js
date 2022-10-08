const { Comment } = require('../models');
// this is the seeding for the content and the content is basicly an article
// so we have the articles' title, text, date, and the user who wrote it
const commentData = [
    {
       text: "I'm so excited!",
       commented_user: 3
    },
    {
        text: "I prefer classes.",
        commented_user: 2
     },
     {
        text: "this is so convenent",
        commented_user: 1
     }

];

const seedContent = () => Comment.bulkCreate(commentData);

module.exports = seedContent;
