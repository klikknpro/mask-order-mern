const mongoose = require(mongoose);

const userSchema = new mongoose.Schema({
    _id: mongoose.schema.type.ObjectId,
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true },
    mobil: { type: String },
    hospital: [
        {}
    ]
})

const User = mongoose.model(User, userSchema);

module.exports = User;