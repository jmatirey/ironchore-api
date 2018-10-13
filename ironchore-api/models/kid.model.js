const mongoose = require("mongoose");

const kidSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    points: {
      type: Number,
      default: 0
    },
    avatar: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor"
    },

    awards: {
      type: mongoose.Schema.Types.ObjectId,
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

userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    next();
  } else {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
      })
      .then(hash => {
        user.password = hash;
        next();
      })
      .catch(error => next(error));
  }
  
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};
const Kid = mongoose.model("Kid", kidSchema);
module.exports = Kid;
