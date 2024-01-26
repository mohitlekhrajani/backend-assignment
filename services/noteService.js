// services/noteService.js

const Note = require("../models/noteModel");
const User = require("../models/userModel");

class NoteService {
  async getAllNotes() {
    return await Note.find();
  }

  async getNoteById(id) {
    return await Note.findById(id);
  }
  async getNotesForUser(email) {
    try {
      // Find the user with the given email and populate the 'notes' field
      const userWithNotes = await User.findOne({ email }).populate("notes");

      if (!userWithNotes) {
        throw new Error("User not found");
      }

      // Extract and return the notes from the user
      const notes = userWithNotes.notes;
      return notes;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get notes for the user.");
    }
  }
  async createNote(title, content, email) {
    try {
      // Create a new note
      const note = new Note({ title, content });
      const savedNote = await note.save();

      // Find the user with the given email and update the notes array
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { $push: { notes: savedNote._id } },
        { new: true }
      );

      // If you want to return something from this function, you can return the saved note or the updated user
      return savedNote;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create note or update user.");
    }
  }

  async updateNoteById(id, title, content) {
    const note = await Note.findById(id);
    if (!note) {
      throw new Error("Note not found");
    }

    note.title = title || note.title;
    note.content = content || note.content;

    return await note.save();
  }

  async deleteNoteById(id) {
    const note = await Note.findById(id);
    if (!note) {
      throw new Error("Note not found");
    }

    await note.remove();
    return { message: "Note deleted successfully" };
  }
  async shareNoteToUser(noteId, sourceUserEmail, targetUserEmail) {
    try {
      // Find the source user and note
      const sourceUser = await User.findOne({ email: sourceUserEmail });
      const noteToShare = await Note.findById(noteId);

      if (!sourceUser || !noteToShare) {
        throw new Error("Source user or note not found");
      }

      // Check if the source user owns the note
      if (!sourceUser.notes.includes(noteToShare._id)) {
        throw new Error("Source user does not own the note");
      }

      // Find the target user
      const targetUser = await User.findOne({ email: targetUserEmail });

      if (!targetUser) {
        throw new Error("Target user not found");
      }

      // Check if the note is already shared with the target user
      if (targetUser.notes.includes(noteToShare._id)) {
        throw new Error("Note is already shared with the target user");
      }

      // Share the note with the target user
      targetUser.notes.push(noteToShare._id);
      await targetUser.save();

      // If you want to return something, you can return a success message or any other relevant data
      return { message: "Note shared successfully" };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to share note");
    }
  }
}

module.exports = new NoteService();
