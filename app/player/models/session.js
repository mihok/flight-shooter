/**
 * Session Model
 */

var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    _ = require('underscore');

var SessionSchema = new Schema({
    id: {
        type: String
    },

    position: {
        x: { type: Number },
        y: { type: Number },
        z: { type: Number }
    },

    updated_at: {
        type: Date,
        default: Date.now()
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

//Register the model.
module.exports = mongoose.model('Session', SessionSchema);