const express = require("express");
const router = express.Router();
const db = require("../schema/");

router.get("/", (req, res) => {

  // Do something with req
  // Usually, the req will have URL params for specifying API endpoints

  db.user.findAll().then(users => {
    let data = {
      users: users
    };

    if (users.length === 0) {
      res.send({});
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
