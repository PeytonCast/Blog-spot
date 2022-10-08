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
    if (!req.session.loggedIn){
        res.redirect('/login')
        res.render('login');
       } else{
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
  }});

router.get('/dashboard', async (req, res) => {
    //i need this route to know who is logged in and get all there prev posts 
   //use sess user id to get specifc data for that user
   if (!req.session.loggedIn){
    res.redirect('/login')
    res.render('login');
   } else{
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
  }});

 router.get('/edit/:id', async (req, res) => {
    // checks to see if the content to be acessed belongs to user
    const checkId = await Content.findByPk(req.params.id)
    const content = checkId.get({ plain: true });
    
    if (content.user_id != req.session.userId){
      res.redirect('/')
      return
     } 
     else{
    try {
      const dbContentData = await Content.findByPk(req.params.id);
  
    const content = dbContentData.get({ plain: true });
  
    res.render('edit', { content, loggedIn: req.session.loggedIn });
    //  res.json(dbContentData)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }});
 
  
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
  