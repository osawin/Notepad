This is an application to write and store notes.
It has two modes - viewing a list of notes, and editing a note.

While viewing a list of notes, one sees a button to create a new note, and a list of the names of notes.
Creating a new note, or clicking on one of the existing notes, takes one to the editing mode.

In the editing node, one sees 2 buttons, delete and save, as well as two text boxes with the name and content of the note.
Saving or deleting a note takes one to the editing page.

Notes are stored in local browser history.
The list of notes is saved whenever a note is created, deleted or saved.
When the application is opened, it reads the browser history to determine what notes to show.

How to Run:
Download the files in the Github GUI, or by checking out the repository.
Open index.html in a browser. The use of localStorage leads to errors in Safari on a Mac, it runs successfully in Firefox and Chrome on a Mac. It has not been tested on Windows.
Begin creating and editing notes.