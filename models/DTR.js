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
});

module.exports = mong.model('DTR', DTRSchema);
