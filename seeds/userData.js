const { User } = require('../models');
// this is the seeding for the content and the content is basicly an article
// so we have the articles' title, text, date, and the user who wrote it
const userData = [
    {
       username: "C_Engineer",
       password: "They-C-Me-Coding"
    },
    {
      username: "Java_Lava",
      password: "password"
     },
    {
      username: "angry.Coder",
      password: "I_<3_Coding"
    }

];

const seedUser = () => User.bulkCreate(userData);
module.exports = seedUser;
