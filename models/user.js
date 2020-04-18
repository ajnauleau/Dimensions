"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const PetSchema = new Schema({
        name            : { type: String, required: true }
        , email         : { type: String, required: true }
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('User', PetSchema);
