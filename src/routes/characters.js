const express = require("express");
const router = express.Router();
const Character = require("../models/character");

router.get("/", async (req, res) => {
  try {
    const characters = await Character.findAll();
    res.json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching characters" });
  }
});

module.exports = router;
