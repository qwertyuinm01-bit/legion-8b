const firebaseConfig = {
    apiKey: "AIzaSyALxgy8p51UxJH4uyJuLUsiCw-3_mD_DPA",
    authDomain: "legion-8b.firebaseapp.com",
    databaseURL: "https://legion-8b-default-rtdb.europe-west1.firebasedatabase.app", 
    projectId: "legion-8b",
    storageBucket: "legion-8b.firebasestorage.app",
    messagingSenderId: "532391425488",
    appId: "1:532391425488:web:2321b2ecbe1bf5574a75d5",
    measurementId: "G-BB61V78C07"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- ВКЛАДКИ ---
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        const page = item.getAttribute('data-page');
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        document.querySelectorAll('.view').forEach(v => {
            v.classList.remove('active');
            if(v.id === page) v.classList.add('active');
        });
    });
});

// --- ЧАСЫ ---
function updateTime() {
    const now = new Date();
    const timeElem = document.getElementById('current-time');
    const dateElem = document.getElementById('current-date');
    if(timeElem) timeElem.innerText = now.toLocaleTimeString('ru-RU', { hour12: false });
    if(dateElem) dateElem.innerText = now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' }).toUpperCase();
}
setInterval(updateTime, 1000);
updateTime();

// --- АДМИНКА (КЛИКАЙ 5 РАЗ ПО ЗАГОЛОВКУ "LEGION 8B" ИЛИ АВАТАРКЕ) ---
let clicks = 0;
// Добавляем слушатель на всё, что похоже на заголовок или аватарку
document.addEventListener('click', (e) => {
    if (e.target.closest('.logo-area') || e.target.closest('.user-profile') || e.target.tagName === 'H1') {
        clicks++;
        if (clicks === 5) {
            const pass = prompt("PASSWORD:");
            if (pass === "8b_top") {
                alert("ADMOD ACTIVATED! Тыкай в текст и меняй его.");
                enableEditing();
            }
            clicks = 0;
        }
    } else {
        clicks = 0; // Сброс, если кликнул мимо
    }
});

function enableEditing() {
    const selectors = '.announcement-body p, .exam-subject, .exam-date, .tile p, #current-date';
    document.querySelectorAll(selectors).forEach(el => {
        el.contentEditable = "true";
        el.style.border = "2px solid #00f3ff";
        el.style.background = "rgba(0, 243, 255, 0.1)";
        el.addEventListener('blur', () => {
            set(ref(db, 'siteData/'), {
                announcement: document.querySelector('.announcement-body p')?.innerText || "",
                examSubject: document.querySelector('.exam-subject')?.innerText || "",
                examDate: document.querySelector('.exam-date')?.innerText || ""
            });
        });
    });
}

// --- ПОЛУЧЕНИЕ ДАННЫХ ---
onValue(ref(db, 'siteData/'), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        const ann = document.querySelector('.announcement-body p');
        const subj = document.querySelector('.exam-subject');
        const date = document.querySelector('.exam-date');
        if(ann) ann.innerText = data.announcement;
        if(subj) subj.innerText = data.examSubject;
        if(date) date.innerText = data.examDate;
    }
});
