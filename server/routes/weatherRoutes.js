const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();


router
  .get("/autoComplete", async (req, res) => {
    const { q } = req.query;

    try {
      if (q) {
        const response = await axios({
          method: "GET",
          url: "http://dataservice.accuweather.com/locations/v1/cities/autocomplete",
          params: {
            apikey: process.env.API_KEY,
            q: q,
          },
        });
        res.status(200).send(response.data);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  })

  module.exports = router;