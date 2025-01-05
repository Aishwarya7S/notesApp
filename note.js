console.log("Welcome to notes app. This is app.js");
showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let noteTitle = document.getElementById("noteTitle").value;
    let addTxt = document.getElementById("addTxt").value;
    let notes = localStorage.getItem("notes");
    let notesObj;
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push({ title: noteTitle, text: addTxt });
    localStorage.setItem("notes", JSON.stringify(notesObj));
    document.getElementById("noteTitle").value = "";
    document.getElementById("addTxt").value = "";
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    let notesObj;
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="col-md-4">
                <div class="card my-2">
                    <div class="card-body">
                        <h5>${element.title}</h5>
                        <p>${element.text}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
                    </div>
                </div>
            </div>
        `;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length !== 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    let notesObj;
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let clrBtn = document.getElementById("clrBtn");
clrBtn.addEventListener("click", function () {
    document.getElementById("noteTitle").value = "";
    document.getElementById("addTxt").value = "";
});

function searchNotes() {
    let searchTxt = document.getElementById("searchTxt").value.toLowerCase();
    let notes = localStorage.getItem("notes");
    let notesObj;
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        if (element.title.toLowerCase().includes(searchTxt)) {
            html += `
                <div class="col-md-4">
                    <div class="card my-2">
                        <div class="card-body">
                            <h5>${element.title}</h5>
                            <p>${element.text}</p>
                            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
                        </div>
                    </div>
                </div>
            `;
        }
    });
    let notesElm = document.getElementById("notes");
    if (html !== "") {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `No matching notes found!`;
    }
}