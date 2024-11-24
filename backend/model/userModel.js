const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'productManager', 'auditor', 'maintenanceTechnician', 'inventoryManager', 'admin'],  // Add role with default values
        default: 'user',
        required: true,
    },
})

const User = mongoose.model('user', userSchema)

module.exports = User