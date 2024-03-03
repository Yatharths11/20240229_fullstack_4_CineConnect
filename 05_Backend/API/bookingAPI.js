const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Bookings = require('../schema/bookings.js')


router.post('/:movie_id',async(req,res) => {
    

})
module.exports = router