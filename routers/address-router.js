const express = require("express");
const router = express.Router();
const lodash = require("lodash")
const {extend} = lodash

const { Address } = require("../models/address-model")

router.route("/")
.get(async(req, res) => {
    try {
        const addresses = await Address.find({})
        res.json({success: true, data: addresses, message: "Addresses retrieved"})
    } catch (err) {
        console.log("Addresses could not be retrieved")
        res.json({success: false, message: "Addresses could not be retrieved", errMessage: err.message})
    }
})
.post(async(req, res) => {
    try {
        const address = req.body
        const newAddress = new Address(address)
        const savedAddress = await newAddress.save()
        res.json({success: true, data: savedAddress, message: "New Address Added"})
    } catch (err) {
        console.log("Error adding address")
        res.json({sucess: false, message: "Address could not be added", errMessage: err.message})
    }
})

router.param("id", async(req, res, next, id) => {
    try {
        const address = await Address.findById(id)
        if(!address) {
            return res.json({success: false, message: "Address could not be found"})
        }
        req.address = address
        next()
    } catch (err) {
        console.log("Error occurred retrieving by id")
        res.json({success: false, message: "Error occurred retrieving by id", errMessage: err.message})
    }
})

router.route("/:id")
.get((req, res) => {
    let { address } = req
    res.json({success: true, data: address, message: "Data retrieved successfully"})
})
.post(async(req, res) => {
    try {
        let { address } = req
        let addressUpdates = req.body
        address = extend(address, addressUpdates)
        address = await address.save()
        res.json({success: true, message: "Address updated", data: address})
    } catch(err) {
        console.log("Error updating address")
        res.json({success: false, message: "Error updating address", errMessage: err.message})
    }
})
.delete(async(req, res) => {
    try {
        const { address } = req
        await address.remove()
        res.json({success: true, message: "Address deleted successfully"})
    } catch (err) {
        console.log("Error deleting address")
        res.json({success: false, message: "Error deleting address", errMessage: err.message})
    }
})

router.route("/user/:userId")
.get(async(req, res) => {
    try { 
        const userAddresses = await Address.find({user: req.params.userId})
        console.log(userAddresses)
        res.json({success: true, message: "User's addresses found", data: userAddresses})
    } catch (err) {
        console.log("Error finding user's addresses")
        res.json({success: true, message: "Error finding user's addresses", errMessage: err.message})
    }
})

module.exports = router;