let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// user schema
let UsersSchema = new Schema({
    firstName : { type: String, required: true, },
    lastName  : { type: String, required: true, },
});





// return the model
module.exports = mongoose.model('Users', UsersSchema);

