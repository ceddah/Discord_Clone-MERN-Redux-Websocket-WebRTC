const express = require("express");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");
const { postInvite } = require("../controllers/friendInvitationController");

const router = express.Router();

const postInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email(),
});

router.post("/invite", auth, validator.body(postInvitationSchema), postInvite);

module.exports = router;
