const express = require("express");
const {getAllUsers,updateUser} = require("../controllers/users");

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/update").patch(updateUser);

module.exports = router;
