const Joi = require('joi');
const mongoose = require('mongoose');

const Children = mongoose.model('Children', new mongoose.Schema({
    childName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50    
    },
    childGender: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    },
    childAge: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    },
    childCity: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    },
    childCountry: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    childRace: {
        type: String,
        required: false,
        minLength: 3,
        maxlength: 50
    }
}));

function validateChild(child) {
    const schema = {
        childName: Joi.string().min(3).required(),
        childGender: Joi.string().min(2).required(),
        childAge: Joi.string().min(2).required(),
        childCity: Joi.string().min(3).required(),
        childCountry: Joi.string().min(3).required(),
        childRace: Joi.string().min(3).required
    };

    return Joi.validate(child, schema);
}


exports.Children = Children;
exports.validate = validateChild;