const mongoose = require("mongoose")

const theatreSchema = new mongoose.Schema({

    name: {
        type : String,
        requried : true
    },

    address : {
        street: {
            type: String,
            required: true
        },
        area: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    }
})


module.exports = mongoose.model('Theatre',theatreSchema )