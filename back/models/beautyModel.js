const mongoose = require("mongoose");
const validator = require("validator");

const beautySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true,
    },
    duration: {
        type: Number,
      },
    dates: [
        {
          type: String,
        },
      ],
    photo: {
        type: String,
        required: [true, "Please enter your image"],
        trim: true, 
    },
    price: {
        type: Number,
      },
    description: {
        type: String,
      },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
      },
});


const Beauty = mongoose.model("Beauty", beautySchema);
module.exports = Beauty;