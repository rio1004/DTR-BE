const express = require("express");
const router = express.Router();
const Book = require("../../models/Book");

router.get("/", (req, res) => {
  Book.find()
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.json({ message: e });
    });
});

router.post("/book", (req, res) => {
  const book = new Book({
    title: req.body.title,
    description: req.body.desc,
  });
  book
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.json({ message: e });
    });
});

router.delete("/:id", (req, res) => {
  router
    .deleteOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.json({ message: e });
    });
});

router.put("/:id", (req, res) => {
    router.updateOne({_id:req.params.id}, {
        $set: {
            description: req.body.desc
        }
    }).then(data =>{
        res.json(data)
    }).catch(e=>{
        res.json({message:e})
    })
});
module.exports = router;
