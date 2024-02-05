const express = require("express");
const Author = require("../models/author");
const router = express.Router();

//All authors
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }

  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
});

//New author
router.get("/new", async (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//Create author
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  try {
    const newAuthor = await author.save();
    res.redirect(`authors`);
  } catch {
    res.render("authors/new", {
      author,
      errorMessage: "Error creating author",
    });
  }
});

//
router.get("/:id", (req, res) => {
  res.send("Show author" + req.params.id);
});

router.get("/:id/edit", (req, res) => {
  res.send("Edit author" + req.params.id);
});

router.put("/:id", (req, res) => {
  res.send("Update author" + req.params.id);
});

router.delete("/:id", (req, res) => {
  res.send("Deleted author" + req.params.id);
});
module.exports = router;
