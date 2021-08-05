const mongoose = require("mongoose")
const { Schema } = mongoose

const AddressSchema = new Schema({
    name: String,
    phno: String,
    pincode: String,
    address: String,
    landmark: String,
    city: String,
    state: String,
    addressType: String,
    user: String
})

const Address = mongoose.model("Address", AddressSchema)

module.exports = { Address }