const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
    },
    beauties: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Beauty",
        },
    ],
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;