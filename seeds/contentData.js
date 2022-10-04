const { Content } = require('../models');
// this is the seeding for the content and the content is basicly an article
// so we have the articles' title, text, date, and the user who wrote it
const contentData = [
    {
       title: "Carbon the New C++?",
       text: "Did you know google is currently writing a new programing language called Carbon? It will aparently replace C++.",
       date: "December 21, 2021 20:30:00",
       user_id: 1
    },
    {
        title: "JavaScript Classes",
        text: "What's better, Classes? or Constructors",
        date: "September 13, 2022 20:20:00",
        user_id: 2
     },
     {
        title: "Nodemon Tutorial",
        text: "Did you know that ther is a tool called Nodemon that will auto restart the server evdryu time you save heres how to install it...",
        date: "January 23, 2022 10:30:00",
        user_id: 3
     }

];

const seedContent = () => Content.bulkCreate(contentData);

module.exports = seedContent;
