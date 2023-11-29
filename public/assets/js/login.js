const urlParams = new URLSearchParams(window.location.search);
const errorMsg = document.querySelector('#error-msg');

if (urlParams.has('error')) {
    errorMsg.hidden = false;
    errorMsg.innerText = urlParams.get('error');
} else {
    errorMsg.hidden = true;
    errorMsg.innerText = '';
}