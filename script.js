// --- 1. ТВОИ КЛЮЧИ ---
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

// --- 2. ЧАСЫ (Работают сразу) ---
function updateTime() {
    const timeElem = document.getElementById('current-time');
    const dateElem = document.getElementById('current-date');
    const now = new Date();
    
    if(timeElem) timeElem.innerText = now.toLocaleTimeString('ru-RU', { hour12: false });
    if(dateElem) {
        const options = { weekday: 'long', day: 'numeric', month: 'short' };
        dateElem.innerText = now.toLocaleDateString('en-US', options).toUpperCase();
    }
}
setInterval(updateTime, 1000);
updateTime();

// --- 3. КНОПКИ МЕНЮ (Работают сразу) ---
document.querySelectorAll('.menu-item').forEach(item => {
    item.onclick = function() {
        const page = this.getAttribute('data-page');
        // Убираем активный класс у всех кнопок
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        // Добавляем текущей
        this.classList.add('active');
        // Показываем нужный блок
        document.querySelectorAll('.view').forEach(v => {
            v.classList.remove('active');
            if(v.id === page) v.classList.add('active');
        });
    };
});

// --- 4. ПОДКЛЮЧЕНИЕ БАЗЫ (Загружается в фоне) ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- 5. АДМИНКА (5 кликов по LEGION 8B) ---
let clicks = 0;
const logo = document.querySelector('.logo-area h1') || document.querySelector('h1');

if(logo) {
    logo.style.cursor = "pointer";
    logo.onclick = () => {
        clicks++;
        if (clicks >= 5) {
            const pass = prompt("PASSWORD:");
            if (pass === "8b_top") {
                alert("ADMIN MODE ON! Меняй текст и кликай в сторону для сохранения.");
                enableEditing();
            }
            clicks = 0;
        }
    };
}

function enableEditing() {
    const selectors = '.announcement-body p, .exam-subject, .exam-date, .tile p';
    document.querySelectorAll(selectors).forEach(el => {
        el.contentEditable = "true";
        el.style.boxShadow = "0 0 10px #00f3ff";
        el.onblur = () => {
            set(ref(db, 'siteData/'), {
                announcement: document.querySelector('.announcement-body p')?.innerText || "",
                examSubject: document.querySelector('.exam-subject')?.innerText || "",
                examDate: document.querySelector('.exam-date')?.innerText || ""
            });
        };
    });
}

// Получение данных
onValue(ref(db, 'siteData/'), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        if(document.querySelector('.announcement-body p')) document.querySelector('.announcement-body p').innerText = data.announcement;
        if(document.querySelector('.exam-subject')) document.querySelector('.exam-subject').innerText = data.examSubject;
        if(document.querySelector('.exam-date')) document.querySelector('.exam-date').innerText = data.examDate;
    }
});
