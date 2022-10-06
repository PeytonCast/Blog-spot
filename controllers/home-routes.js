const router = require('express').Router();
const { text } = require('express');
const { Comment, Content, User } = require('../models');

// GET all content for homepage
router.get('/', async (req, res) => {
  try {
    const dbContentData = await Content.findAll({
      include: [{model: User}]});

    // maps data for handlebars
    const contents = dbContentData.map((content) =>
      content.get({ plain: true })
    );
    res.render('home', {
      contents,
      loggedIn: req.session.loggedIn,
    });
    //   res.json(dbContentData) 
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET a specific artical
router.get('/content/:id', async (req, res) => {
    try {
      const dbContentData = await Content.findByPk(req.params.id, {
        include: [{model: Comment,  include:[{model: User}]}, {model: User}],
      });
  
    const content = dbContentData.get({ plain: true });
    res.render('contentDetails', { content, loggedIn: req.session.loggedIn });
    //  res.json(dbContentData)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get('/dashboard', async (req, res) => {
    //i need this route to know who is logged in and get all there prev posts 
   //use sess user id to get specifc data for that user
    try {
      const data = await User.findByPk(req.session.userId, {
        include: [{model: Content}]
      });
  
    const info = data.get({ plain: true });
    res.render('dashboard', { info, loggedIn: req.session.loggedIn });
    //  res.json(data)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.post('/comment', async (req, res) => {
    // if (req.session.loggedIn) {
       try {
        Comment.create({
            text: req.body.text,
            content_id: req.body.content_id,
            commented_user: req.body.commented_user
          })
          res.status(201).json()
       }
       catch (err) {
        console.log(err);
        res.status(500).json(err);
       }
    //   } else {
        // res.status(404).end();
    //   }
})
  
 
  
  // Login route
  router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //   res.redirect('/');
    //   return;
    // }
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('signup');
  });

  
  
module.exports = router;
  