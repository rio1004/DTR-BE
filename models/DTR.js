const mong = require("mongoose");

const DTRSchema = mong.Schema({
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  user: {
    type: mong.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mong.model("DTR", DTRSchema);
