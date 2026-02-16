// Твои ключи (уже вставлены)
const firebaseConfig = {
    apiKey: "AIzaSyALxgy8p51UxJH4uyJuLUsiCw-3_mD_DPA",
    authDomain: "legion-8b.firebaseapp.com",
    databaseURL: "https://legion-8b-default-rtdb.firebaseio.com", // Я добавил эту строку, она нужна для базы
    projectId: "legion-8b",
    storageBucket: "legion-8b.firebasestorage.app",
    messagingSenderId: "532391425488",
    appId: "1:532391425488:web:2321b2ecbe1bf5574a75d5",
    measurementId: "G-BB61V78C07"
};

// Подключаем Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ВКЛАДОК ---
const menuItems = document.querySelectorAll('.menu-item');
const views = document.querySelectorAll('.view');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const page = item.getAttribute('data-page');
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        views.forEach(v => {
            v.classList.remove('active');
            if(v.id === page) v.classList.add('active');
        });
    });
});

// --- ЧАСЫ ---
function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ru-RU', { hour12: false });
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' }).toUpperCase();
    if(document.getElementById('current-time')) document.getElementById('current-time').innerText = timeStr;
    if(document.getElementById('current-date')) document.getElementById('current-date').innerText = dateStr;
}
setInterval(updateTime, 1000);
updateTime();

// --- АДМИНКА (5 кликов по аватарке) ---
let clickCount = 0;
const avatar = document.querySelector('.user-profile img') || document.querySelector('.bot-avatar');

if(avatar) {
    avatar.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            const pass = prompt("ВВЕДИТЕ ПАРОЛЬ:");
            if (pass === "8b_top") {
                alert("РЕЖИМ РЕДАКТИРОВАНИЯ! Кликни по тексту, чтобы изменить его. Чтобы сохранить — просто кликни в другое место.");
                enableEditing();
            }
            clickCount = 0;
        }
    });
}

function enableEditing() {
    // Выбираем элементы для редактирования (добавь свои классы если нужно)
    const elements = document.querySelectorAll('.announcement-body p, .exam-subject, .exam-date, .tile p');
    elements.forEach(el => {
        el.contentEditable = "true";
        el.style.border = "1px dashed #00f3ff";
        el.addEventListener('blur', () => saveData()); // Сохраняем при потере фокуса
    });
}

function saveData() {
    const data = {
        announcement: document.querySelector('.announcement-body p')?.innerText || "",
        examSubject: document.querySelector('.exam-subject')?.innerText || "",
        examDate: document.querySelector('.exam-date')?.innerText || ""
    };
    set(ref(db, 'siteData/'), data);
}

// --- ПОЛУЧЕНИЕ ДАННЫХ ---
onValue(ref(db, 'siteData/'), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        if(document.querySelector('.announcement-body p')) document.querySelector('.announcement-body p').innerText = data.announcement;
        if(document.querySelector('.exam-subject')) document.querySelector('.exam-subject').innerText = data.examSubject;
        if(document.querySelector('.exam-date')) document.querySelector('.exam-date').innerText = data.examDate;
    }
});
