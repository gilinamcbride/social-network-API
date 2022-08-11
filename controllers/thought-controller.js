const { User, Thought } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(400).json(err));
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select("-__v")
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ userId }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $addToSet: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => res.json(err));
  },

  //   updateUser({ params, body }, res) {
  //     User.findOneAndUpdate({ _id: params.id }, body, {
  //       new: true,
  //       runValidators: true,
  //     })
  //       .then((userData) => {
  //         if (!userData) {
  //           res.status(404).json({ message: "No user found with this id!" });
  //           return;
  //         }
  //         res.json(userData);
  //       })
  //       .catch((err) => res.status(400).json(err));
  //   },
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
