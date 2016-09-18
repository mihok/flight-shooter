
/**
 * Player Model
 */
var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    crypto = require('crypto'),
    _ = require('underscore');


var PlayerSchema = new Schema({
    // first_name: {
    //     type: String,
    //     default: ''
    // },
    // last_name: {
    //     type: String,
    //     default: ''
    // },
    username: {
        type: String,
    },
    session: {
        type: ObjectId,
        ref: 'PlayerSessionSchema'
    },
    // email: {
    //     type: String,
    //     unique: true
    // },

    // Authorization
    // is_superuser: {
    //     type: Boolean,
    //     default: false
    // },

    //Password
    // password_reset_token: {
    //     type: String,
    //     select: false
    // },
    // hashed_password: {
    //     type: String,
    //     select: false
    // },
    // salt: {
    //     type: String,
    //     select: false
    // },

    //Access
    last_login: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default:Date.now()
    },
    created_at: {
        type: Date,
        default:Date.now()
    },
    deleted: {
        type: Boolean,
        default: false
    }

});

/**
 * Virtuals
 */
 PlayerSchema.set('toJSON', {
     virtuals: true
 });

// PlayerSchema.virtual('password')
//     .set(function( password ) {
//         this._password = password;
//         this.salt = this.makeSalt();
//         this.hashed_password = this.encryptPassword(password);
//     })
//     .get(function(){
//         return this._password;
//     });

// PlayerSchema.virtual('full_name')
//     .get(function() {
//         try {
//             var fullName = this.first_name + ' ' + this.last_name;
//             return fullName;
//         } catch ( e ) {
//             return '';
//         }
//     });


/**
 * Validations
 */

// var validatePresenceOf = function( value ) {
//     return value && value.length;
// };

// //The below 2 validations only apply if you are signing up traditionally.
// PlayerSchema.path('email').validate(function( email ) {
//     return email.length;
// }, 'Email cannot be blank.');

// PlayerSchema.path('hashed_password').validate(function( password ) {
//     return password.length;
// }, 'Password cannot be blank.');


/**
 * Pre Save Hooks
 */
// PlayerSchema.pre('save', function( next ) {
//     if ( !this.isNew ) return next();

//     if (!validatePresenceOf(this.password))
//         next(new Error("Invalid password"));
//     else
//         next();
// });


/**
 * Player Methods
 */
PlayerSchema.methods = {

    /**
     * Authenticate - Check if the passwords are the same.
     *
     * @param {String} plainText
     * @returns {Boolean}
     * @api public
     */
    // authenticate: function( plainText ) {
    //     return this.encryptPassword(plainText) === this.hashed_password;
    // },

    /**
     * Make salt
     *
     * @returns {String}
     */

    // makeSalt: function() {
    //     return Math.round(new Date().valueOf() * Math.random()) + '';
    // },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @returns {String}
     */

    // encryptPassword: function( password ) {
    //     if (!password) return '';
    //     return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    // }

};


/**
 * Static Methods
 */

// PlayerSchema.statics.makeSalt = function() {
//     return Math.round(new Date().valueOf() * Math.random()) + '';
// };


/**
 * Plugins
 */

PlayerSchema.plugin(mongoosePaginate);


//Register the model.
module.exports = mongoose.model('Player', PlayerSchema);