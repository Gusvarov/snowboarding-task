const fansForm = document.querySelector('.fans-form');
const fansName = document.querySelector('.fans-name');
const fansResponse = document.querySelector('.fans-response');
const fansEmail = document.querySelector('.fans-email');
const fansSendBtn = document.querySelector('.fans-send-btn');
const fansOut = document.querySelector('.fans-out');
const warning = document.querySelector('.warning');
const date = new Date();

let dateFormat = `${date.getDate()}/0${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
let response = localStorage.response ? JSON.parse(localStorage.response) : [];

function redClassRemove() {
    fansName.classList.remove('red');
    fansEmail.classList.remove('red');
    fansResponse.classList.remove('red');
}

fansSendBtn.addEventListener('click', () => {
    if (!fansName.value ) {
        fansName.classList.add('red');
    } else {
        fansName.classList.remove('red');
    }
    
     if (!fansEmail.value) {
        fansEmail.classList.add('red');
    } else {
        fansEmail.classList.remove('red');
    }

    if (!fansResponse.value) {
        fansResponse.classList.add('red');
    } else {
        fansResponse.classList.remove('red');
    }

    if(fansName.value && fansEmail.value && fansResponse.value) {
        let db;
        let dbReq = indexedDB.open('myDB2', 1);
        dbReq.onupgradeneeded = (event) => {
            db = event.target.result;
            let notes = db.createObjectStore('notes', {autoIncrement: true});
        }
        dbReq.onsuccess = (event) => {
            db = event.target.result;
        }
        dbReq.onerror = (event) => {
            alert('error opening database ' + event.target.errorCode);
        }
        const addStickyNote = (db, message) => {
            let tx = db.transaction(['notes'], 'readwrite');
            let store = tx.objectStore('notes');
            let note = [{fansName: fansName.value, fansEmail: fansEmail.value, fansResponse: fansResponse.value, formatDate: dateFormat}];
            store.add(note);
            tx.oncomplete = () => {
            console.log('stored note!')
            }
            tx.onerror = (event) => {
                alert('error storing note ' + event.target.errorCode);
            }
        }
        dbReq.onsuccess = (event) => {
            db = event.target.result;
            addStickyNote(db);
            fansForm.reset();
        }  
        fansOut.innerHTML = `
            <ul>
                <li>Name: ${fansName.value}</li>
                <li>Email: ${fansEmail.value}</li>
                <li>Response: ${fansResponse.value}</li>
                <li>Date: 0${date.getDate()}/0${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}</li>
            <ul>
        `;
        let promise = new Promise((resolve, reject) => {
            const responseData = {
                'fansName': fansName.value,
                'fansEmail': fansEmail.value,
                'fansResponse': fansResponse.value,
                'dateFormat': dateFormat
            };
            resolve(responseData);
    })
    promise.then(data => {
        console.log('Fans data: ', data);
    })
        response.push({'fansName': fansName.value, 'fansEmail': fansEmail.value, 'fansResponse': fansResponse.value, 'dateFormat': dateFormat});
        localStorage.response = JSON.stringify(response);
        redClassRemove();
        warning.innerHTML = '';
    } else {
        warning.innerHTML = `Please, fill all fields.`;
    }
})