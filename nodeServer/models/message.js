let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// user schema
let MessageSchema = new Schema({
    userId   : { type: String, required: true, },
    text     : { type: String, required: true, },
    userName : { type: String, required: true, },
    // password: { type: String, required: true, select: false }
});


// return the model
module.exports = mongoose.model('Message', MessageSchema);

