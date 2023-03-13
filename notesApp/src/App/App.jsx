import React from "react";
import { data } from "../../public/data.js";
import Split from "react-split";
import { nanoid } from "nanoid";

import Sidebar from "../components/Sidebar/Sidebar";
import Editor from "../components/Editor/Editor";
import "./App.css";

function App() {
  const [notes, setNotes] = React.useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const [currentNoteId, setCurrentNoteId] = React.useState(    
    (notes[0] && notes[0].id) || ""
  );

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    setNotes(oldNotes => {
      const updatedNote = oldNotes.find(note => note.id === currentNoteId);
      const filteredNotes = oldNotes.filter(note => note.id !== currentNoteId);
      return [ {...updatedNote, body: text}, ...filteredNotes ];
    });
}

function deleteNote(event, noteId) {
  event.stopPropagation()
  setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
}

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <main>
      {notes.length <= 0 ? (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      ) : (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      )}
    </main>
  );
}

export default App;
