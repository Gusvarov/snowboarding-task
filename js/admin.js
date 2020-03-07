const adminForm = document.querySelector('.admin-form');
const adminName = document.querySelector('.admin-name');
const adminNews = document.querySelector('.admin-news');
const adminEmail = document.querySelector('.admin-email');
const adminSendBtn = document.querySelector('.admin-send-btn');
const adminOut = document.querySelector('.admin-out');
const warning = document.querySelector('.warning');
const date = new Date();

let dateFormat = `${date.getDate()}/0${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
let news = localStorage.news ? JSON.parse(localStorage.news) : [];
let newsData = [];
let a = adminName.value;

function redClassRemove() {
    adminName.classList.remove('red');
    adminEmail.classList.remove('red');
    adminNews.classList.remove('red');
}

adminSendBtn.addEventListener('click', () => {
    if (!adminName.value ) {
        adminName.classList.add('red');
    } else {
        adminName.classList.remove('red');
    }
    
     if (!adminEmail.value) {
        adminEmail.classList.add('red');
    } else {
        adminEmail.classList.remove('red');
    }

    if (!adminNews.value) {
        adminNews.classList.add('red');
    } else {
        adminNews.classList.remove('red');
    }

    if(adminName.value && adminEmail.value && adminNews.value) {
        let db;
        let dbReq = indexedDB.open('myDB', 1);
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
            let note = [{adminName: adminName.value, adminEmail: adminEmail.value, adminNews: adminNews.value, formatDate: dateFormat}];
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
            console.log(event)
            adminForm.reset();
        }  
        adminOut.innerHTML = `
            <ul>
                <li>Name: ${adminName.value}</li>
                <li>Email: ${adminEmail.value}</li>
                <li>Response: ${adminNews.value}</li>
                <li>Date: ${dateFormat}</li>
            <ul>
        `;
        let promise = new Promise((resolve, reject) => {
                const newsData = {
                    'adminName': adminName.value,
                    'adminEmail': adminEmail.value, 
                    'adminNews': adminNews.value, 
                    'dateFormat': dateFormat
                };
                resolve(newsData);
        })
        promise.then(data => {
            console.log('Admin data :', data);
        })
        news.push({'adminName': adminName.value, 'adminEmail': adminEmail.value, 'adminNews': adminNews.value, 'dateFormat': dateFormat});
        localStorage.news = JSON.stringify(news);
        redClassRemove();
        warning.innerHTML = '';
    } else {
        warning.innerHTML = `Please, fill all fields.`;
    }
})




