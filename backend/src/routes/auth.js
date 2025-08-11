const express = require('express'); // helps create web servers and handle requests.
const router = express.Router(); // manage specific routes related to authentication (like login and register).
const { register, login, me } = require('../controllers/authController'); // import the functions that handle authentication logic from the authController file.
const auth = require('../middleware/auth'); // import the authentication middleware that checks if a user is logged in before accessing certain routes.

router.post('/register', register);//When someone sends a POST request to /register, run the register function.
router.post('/login', login);
router.get('/me', auth, me);

module.exports = router; //Makes this router available to use in other parts of the app.

