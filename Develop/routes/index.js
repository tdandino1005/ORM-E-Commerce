// Used to route to the correct file
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// If no API routes are hit, send message to app
router.use((req, res) => {
  res.send("<h1>Incorrect Route!</h1>")
});

module.exports = router;