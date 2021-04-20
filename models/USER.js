const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name : {
        type: String,
    },
    email : {
        type: String,
    },
    password : {
        type: String,
    },
    // cart : {
    //     products : [
    //         {
    //             productID : {type : String}
    //         }
    //     ]
    // },
    // olduserimages : [
    //     {
    //         fieldname : {type : String},
    //         originalname : {type : String},
    //         encoding : {type : String},
    //         mimetype : {type : String},
    //         destination : {type : String},
    //         filename : {type : String},
    //         path : {type : String},
    //         size : {type : Number},
    //     }
    // ],
    // userImage : {
    //     fieldname : {type : String},
    //     originalname : {type : String},
    //     encoding : {type : String},
    //     mimetype : {type : String},
    //     destination : {type : String},
    //     filename : {type : String},
    //     path : {type : String},
    //     size : {type : Number},
    // },
    // date : {
    //     type : String,
    //     default : Date.now
    // },
});

module.exports = User = mongoose.model("User",UserSchema);