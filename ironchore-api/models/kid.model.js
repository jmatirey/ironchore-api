const mongoose = require("mongoose");

const kidSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    points: {
      type: Number
    },
    avatar: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, `needs a User`]
    },

    award: {
      type: mongoose.Schema.Types.ObjectId,
      default: []
    }
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

const Kid = mongoose.model("Kid", kidSchema);
module.exports = Kid;
