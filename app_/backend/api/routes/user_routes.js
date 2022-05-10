const router = require('express').Router()
const {addUser}  = require('../controllers/user_controller')
router.post('/addUser',addUser)
module.exports =  router