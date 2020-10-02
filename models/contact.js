const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactQuerySchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    mobileNumber: {type: Number, required: true},
    subject: {type: String, required: true},
    description: {type: String, required: true}
});

module.exports = mongoose.model("ContactQuery", contactQuerySchema);
