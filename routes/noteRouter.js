// routes/noteRouter.js

const express = require("express");
const noteController = require("../controllers/noteController");

const router = express.Router();

router.get("/", noteController.getAllNotes);
router.get("/user", noteController.getNotesForUser);
router.get("/:id", noteController.getNoteById);
router.post("/", noteController.createNote);
router.patch("/:id", noteController.updateNoteById);
router.delete("/:id", noteController.deleteNoteById);
router.get(
  "/share/:noteId/:sourceUserEmail/:targetUserEmail",
  noteController.shareNoteToUser
);

module.exports = router;
