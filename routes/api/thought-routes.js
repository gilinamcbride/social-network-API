const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
  //   addFriend,
} = require("../../controllers/thought-controller");

// Set up GET all and POST at /api/users
router.route("/").get(getAllThoughts).post(addThought);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
