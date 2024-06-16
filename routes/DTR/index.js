const exp = require("express");
const router = exp.Router();
const DTR = require("../../models/DTR");

router.get("/", (req, res) => {
  DTR.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ message: err });
    });
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
  const dtr = new DTR({
    description: req.body.description,
    status: req.body.status,
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
