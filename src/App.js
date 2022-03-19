import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };

  onType = (editMeID, updatedKey, updatedValue) => {
    // editMeID = ID of the edited note
    // updatedKey = title or description field
    // updatedValue = what it was updated to
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeID) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        const doesMatch = titleMatch || descriptionMatch;
        if (doesMatch) {
          note.doesMatchSearch = true;
        } else {
          note.doesMatchSearch = false;
        }
        return note;
      }
    });
    this.setState({
      notes: updatedNotes,
      searchText: newSearchText
    });
  };

  render() {
    return (
      <div>
        <Header 
          onSearch={this.onSearch}
          addNote={this.addNote} 
          searchText={this.state.searchText} 
        />
        <NotesList 
          onType={this.onType} 
          notes={this.state.notes} 
        />
      </div>
    );
  }
}

export default App;
