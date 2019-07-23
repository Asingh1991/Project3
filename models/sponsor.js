const Joi = require("joi");
const mongoose = require("mongoose");

const Sponsor = mongoose.model(
  "Sponsor",
  new mongoose.Schema({
    SponsorName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    },
    SponsorAge: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    },
    SponsorCity: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    },
    SponsorCountry: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    },
    SponsorEmail: {
      type: String,
      required: false,
      minLength: 3,
      maxlength: 50
    },
    SponsorSponsor: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
        type: String,
        required: true,
      }
  })
);

function validateSponsor(Sponsor) {
  const schema = {
    SponsorName: Joi.string()
      .min(3)
      .required(),
    SponsorAge: Joi.string()
      .min(2)
      .required(),
    SponsorCity: Joi.string()
      .min(2)
      .required(),
    SponsorCountry: Joi.string()
      .min(3)
      .required(),
    SponsorEmail: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(Sponsor, schema);
}

//authenticate input against database
Sponsor.statics.authenticate = function (email, password, callback) {
    Sponsor.findOne({ SponsorEmail: email })
      .exec(function (err, Sponsor) {
        if (err) {
          return callback(err)
        } else if (!Sponsor) {
          var err = new Error('Sponsor not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, Sponsor.password, function (err, result) {
          if (result === true) {
            return callback(null, Sponsor);
          } else {
            return callback();
          }
        })
      });
  }
  
  //hashing a password before saving it to the database
  Sponsor.pre('save', function (next) {
    var Sponsor = this;
    bcrypt.hash(Sponsor.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      Sponsor.password = hash;
      next();
    })
  });
  
  
  var Sponsor = mongoose.model('Sponsor', SponsorSchema);

exports.Sponsor = Sponsor;
exports.validate = validateChild;
