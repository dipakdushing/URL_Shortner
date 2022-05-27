const express = require("express");
const router = express.Router();

const validUrl = require("valid-url");
const nanoid = require("nanoid");
const config = require("config");

const Url = require("../models/Url");
const { base } = require("../models/Url");
const { reset } = require("nodemon");

// route   Post api/url/shorten
// @desc   Create short URL

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");

  //   check base URL
  if (!validUrl.isUri(baseUrl)) {
    return res.status(400).json("Invalid base url");
  }

  //   Create url code
  const urlCode = nanoid.nanoid(8);

  //   Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();
        res.json(url);
      }
    } catch (error) {
      console.log(error);
      reset.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Invalid Url");
  }
});

module.exports = router;
