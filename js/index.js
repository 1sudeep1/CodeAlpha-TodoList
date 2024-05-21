document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
});

document.querySelector('.save').onclick = handleButton;

let currentEditCard = null;

function handleButton() {
    const noteTitle = document.querySelector('#note-title').value.trim() || 'Untitled';
    const listResult = document.querySelector('#text-area').value.trim();

    if (listResult.length > 0) {
        if (currentEditCard) {
            updateNoteCard(currentEditCard, noteTitle, listResult);
            saveNotes();
            currentEditCard = null;
        } else {
            addNoteToDOM(noteTitle, listResult);
            saveNotes();
        }

        document.querySelector('#result-section').style.display = 'flex';
        document.querySelector('#note-title').value = '';
        document.querySelector('#text-area').value = '';
    }
}

function updateNoteCard(card, title, content) {
    card.querySelector('.result-title').innerText = title;
    card.querySelector('.result-text').innerHTML = content.replace(/\n/g, '<br>');
}

function addNoteToDOM(title, content) {
    const resultCard = document.createElement('div');
    resultCard.classList.add('result-card');

    const resultTitle = document.createElement('div');
    resultTitle.classList.add('result-title');
    resultTitle.innerText = title;
    resultCard.appendChild(resultTitle);

    const resultText = document.createElement('div');
    resultText.classList.add('result-text');
    resultText.innerHTML = content.replace(/\n/g, '<br>');
    resultCard.appendChild(resultText);

    const crudButtons = document.createElement('div');
    crudButtons.classList.add('crud-buttons');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = function () {
        resultCard.remove();
        saveNotes();
        if (document.querySelectorAll('.result-card').length === 0) {
            document.querySelector('#result-section').style.display = 'none';
        }
    };
    crudButtons.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.innerText = 'Edit';
    editButton.onclick = function () {
        document.querySelector('#note-title').value = resultTitle.innerText === 'Untitled' ? '' : resultTitle.innerText;
        document.querySelector('#text-area').value = resultText.innerText.replace(/<br>/g, '\n');
        currentEditCard = resultCard;
    };
    crudButtons.appendChild(editButton);

    resultCard.appendChild(crudButtons);
    document.querySelector('#result-section').appendChild(resultCard);
}

function saveNotes() {
    const notes = [];
    document.querySelectorAll('.result-card').forEach(card => {
        const title = card.querySelector('.result-title').innerText;
        const content = card.querySelector('.result-text').innerHTML.replace(/<br>/g, '\n');
        notes.push({ title, content });
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    if (notes.length > 0) {
        notes.forEach(note => addNoteToDOM(note.title, note.content));
        document.querySelector('#result-section').style.display = 'flex';
    } else {
        document.querySelector('#result-section').style.display = 'none';
    }
}
