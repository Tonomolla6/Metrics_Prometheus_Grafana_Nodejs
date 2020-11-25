var router = require('express').Router();

// Faker
router.use('/faker', require('./faker'));

module.exports = router;