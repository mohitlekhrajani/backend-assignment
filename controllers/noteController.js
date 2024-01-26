// controllers/noteController.js

const noteService = require("../services/noteService");

async function getAllNotes(req, res) {
  try {
    const notes = await noteService.getAllNotes();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getNoteById(req, res) {
  const { id } = req.params;

  try {
    const note = await noteService.getNoteById(id);
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getNotesForUser(req, res) {
  const email = req.user.email;

  try {
    const note = await noteService.getNotesForUser(email);
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createNote(req, res) {
  const { title, content } = req.body;
  const email = req.user.user;

  try {
    const newNote = await noteService.createNote(title, content, email);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateNoteById(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedNote = await noteService.updateNoteById(id, title, content);
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteNoteById(req, res) {
  const { id } = req.params;

  try {
    const result = await noteService.deleteNoteById(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function shareNoteToUser(req, res) {
  const { noteId, sourceUserEmail, targetUserEmail } = req.params;

  try {
    const result = await noteService.shareNoteToUser(
      noteId,
      sourceUserEmail,
      targetUserEmail
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to share note" });
  }
}

module.exports = {
  deleteNoteById,
  updateNoteById,
  createNote,
  getNoteById,
  getAllNotes,
  getNotesForUser,
  shareNoteToUser,
};
