const exp = require("express");
const router = exp.Router();
const DTR = require("../../models/DTR");
const Task = require("../../models/DTR");
const { authenTicateUser } = require("../../middleware/auth");

router.get(`/:id`, authenTicateUser, async (req, res) => {

  console.log(req.params.id)
  try {
    const DTRs = await Task.find({ user: req.params.id });
    res.status(200).json({ data: DTRs });
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id", (req, res) => {
  DTR.findOne({
    _id: req.params.id,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.post("/", (req, res) => {
  const { userId, desc, status } = req.body;
  const dtr = new DTR({
    description: desc,
    status: status,
    user: userId,
  });
  dtr
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.json({ message: e });
    });
});

router.delete("/:id", (req, res) => {
  DTR.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.put("/:id", (req, res) => {
  DTR.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        description: req.body.description,
      },
    }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
