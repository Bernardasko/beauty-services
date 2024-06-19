const User = require("../models/userModel");
const Beauty = require("../models/beautyModel");
const Category = require("../models/categoryModel");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../front/public/images/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

exports.uploadImage = multer({
    storage: storage,
});

exports.getAllBeauty = async (req, res) => {
    let searchParams = {};
    if (req.query.title) {
      searchParams.title = { $regex: req.query.title, $options: "i" };
    }
  
    if (req.query.dates) {
      searchParams.dates = req.query.dates;
    }
    try {
        const beauty = await Beauty.find(searchParams);
        res.status(200).json({
            status: "success",
            results: beauty.length,
            data: {
                beauty,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getBeauty = async (req, res) => {
    try {
        const beauty = await Beauty.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                beauty,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.createBeauty = async (req, res) => {
    try {
        let images;
        if (req.file) {
            images = `/images/${req.file.originalname}`;
        } else {
            images = "";
        }
        const beauty = await Beauty.create({
            ...req.body,
            photo: images,
        });
        await Category.findByIdAndUpdate(req.body.category, {
            $push: { beauties: beauty._id },
          });
        res.status(201).json({
            status: "success",
            data: {
                beauty,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.createMyBeauty = async (req, res) => {
    console.log(req.params.beautyId);
    console.log("user ID" + req.user._id);
  
    try {
      const beautyId = req.params.beautyId;
      const userId = req.user._id;
      const beauty = await Beauty.findById(beautyId);
      const { date } = req.body;
  
      await User.findByIdAndUpdate(userId, {
        $push: { beauty: { beautyId, date} }
      });
  
      res.status(201).json({
        status: "success",
        data: null,
        message: "Beauty created successfully",
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  };

  exports.deleteMyBeauty = async (req, res) => {
    try {
      const beautyId = req.params.beautyId;
      const userId = req.user._id;
  
      await User.findByIdAndUpdate(userId, {
        $pull: { beauty: { beautyId } }
      });
  
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  };

exports.updateBeauty = async (req, res) => {
    try {
        const updateData = { ...req.body };

        if (req.file) {
          updateData.photo = `/images/${req.file.originalname}`;
        }

        await Category.updateMany(
            { beauty: req.params.id },
            { $pull: { beauty: req.params.id } }
          );

        const beauty = await Beauty.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: {
                beauty,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.updateMyBeauty = async (req, res) => {
    try {
      const beautyId = req.params.beautyId;
      const userId = req.user._id;
      const { date, rating, comment } = req.body;
  
      const updateData = {};
      if (date !== undefined) updateData["beauty.$.date"] = date;
      if (rating !== undefined) updateData["beauty.$.rating"] = rating;
      if (comment !== undefined) updateData["beauty.$.comment"] = comment;
  
      await User.updateOne(
        { _id: userId, "beauty.beautyId": beautyId },
        { $set: updateData }
      );
  
      res.status(200).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  };

exports.deleteBeauty = async (req, res) => {
    try {
        const beauty = await Beauty.findById(req.params.id);

        if (!beauty) {
            return res.status(404).json({
                status: "fail",
                message: "Beauty not found",
            });
        }
        await Beauty.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message,
        });
    }
};
