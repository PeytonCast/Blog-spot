const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedContent = require('./contentData');
const seedComment = require('./commentData')

const seedAll = async () => {
  await sequelize.sync({ force: false });

  await seedUser();
  
  await seedContent();

  await seedComment();

  process.exit(0);
};

seedAll();
