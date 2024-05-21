
document.querySelector('.save').onclick = handleButton;
function handleButton() {
    const listResult = document.querySelector('#text-area').value
    if (listResult.length > 0) {
        document.querySelector('#listResult').innerText=listResult
        document.querySelector('#result-section').style.display = 'flex';


    } else {
        document.querySelector('#result-section').style.display = 'none';
    }
}