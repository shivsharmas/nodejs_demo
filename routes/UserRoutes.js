const express = require("express");
const {
  insertUser,
  loginUser,
  getALLUser,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");

const router = express.Router();

const { verifyToken } = require("../middlewares/auth");

router.post("/signup", insertUser);
router.post("/login", loginUser);
// router.get("/get-all-user",verifyToken, getALLUser);
router.get("/get-all-user", getALLUser);
router.get("/get-user/:id", getSingleUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
module.exports = router;
