const newsOut = document.querySelector('.news');
const responseOut = document.querySelector('.response');
const date = new Date();

let useLocalStorage = true;
let news = localStorage.news ? JSON.parse(localStorage.news) : [];
let response = localStorage.response ? JSON.parse(localStorage.response) : [];

function isOnline() {
    return window.navigator.onLine;
}

if (isOnline && useLocalStorage) {
    function newsMaker(name, email, text, date) {
        const ul = document.createElement('ul');
    
        let li = document.createElement('li');
        let li2 = document.createElement('li');
        let li3 = document.createElement('li');
        let li4 = document.createElement('li');
        
        newsOut.appendChild(ul);
        ul.appendChild(li);  
        ul.appendChild(li2);  
        ul.appendChild(li3);  
        ul.appendChild(li4);
        li.textContent = `Name: ${name}`;
        li2.textContent = `Email: ${email}`;
        li3.textContent = `News: ${text}`;
        li4.textContent = `Date: ${date}`;
    }
    
    function responseMaker(name, email, text, date) {
        const ul = document.createElement('ul');
    
        let li = document.createElement('li');
        let li2 = document.createElement('li');
        let li3 = document.createElement('li');
        let li4 = document.createElement('li');
        
        responseOut.appendChild(ul);
        ul.appendChild(li);  
        ul.appendChild(li2);  
        ul.appendChild(li3);  
        ul.appendChild(li4);
        li.textContent = `Name: ${name}`;
        li2.textContent = `Email: ${email}`;
        li3.textContent = `News: ${text}`;
        li4.textContent = `Date: ${date}`;
    }   
    
    news.forEach(task => {
        newsMaker(task.adminName, task.adminEmail, task.adminNews, task.dateFormat);
    })
    
    response.forEach(task => {
        responseMaker(task.fansName, task.fansEmail, task.fansResponse, task.dateFormat);
    })
}