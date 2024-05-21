let currentEditCard = null;

document.querySelector('.save').onclick = handleButton;

function handleButton() {
    const noteTitle = document.querySelector('#note-title').value || 'Untitled';
    const listResult = document.querySelector('#text-area').value;

    if (listResult.length > 0) {
        if (currentEditCard) {
            currentEditCard.querySelector('.result-title').innerText = noteTitle;
            currentEditCard.querySelector('.result-text').innerText = listResult;
            currentEditCard = null;
        } else {
            const resultCard = document.createElement('div');
            resultCard.classList.add('result-card');

            const resultTitle = document.createElement('div');
            resultTitle.classList.add('result-title');
            resultTitle.innerText = noteTitle;
            resultCard.appendChild(resultTitle);

            const resultText = document.createElement('div');
            resultText.classList.add('result-text');
            resultText.innerText = listResult;
            resultCard.appendChild(resultText);

            const crudButtons = document.createElement('div');
            crudButtons.classList.add('crud-buttons');

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = function() {
                resultCard.remove();
                if (document.querySelectorAll('.result-card').length === 0) {
                    document.querySelector('#result-section').style.display = 'none';
                }
            };
            crudButtons.appendChild(deleteButton);

            const editButton = document.createElement('button');
            editButton.classList.add('edit');
            editButton.innerText = 'Edit';
            editButton.onclick = function() {
                document.querySelector('#note-title').value = resultTitle.innerText === 'Untitled' ? '' : resultTitle.innerText;
                document.querySelector('#text-area').value = resultText.innerText;
                currentEditCard = resultCard;
            };
            crudButtons.appendChild(editButton);

            resultCard.appendChild(crudButtons);
            document.querySelector('#result-section').appendChild(resultCard);
        }

        document.querySelector('#result-section').style.display = 'flex';
        document.querySelector('#note-title').value = '';
        document.querySelector('#text-area').value = '';
    } else {
        document.querySelector('#result-section').style.display = 'none';
    }
}