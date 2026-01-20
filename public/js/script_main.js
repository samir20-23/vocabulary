// ==========================================
// Global State & Initialization
// ==========================================
let words = [];
// Hoisted Game State Variables
let currentCardIndex = 0;
let isFlipped = false;
let gameInterval = null; // Track intervals to clear them

// DOM References
const getEl = (id) => document.getElementById(id);

// Initialization
function initApp() {
    console.log("Initializing App Logic...");
    loadFromLocalStorage();
    updateStatistics();

    const mainBody = document.body;
    if (mainBody) mainBody.setAttribute('data-theme', 'dark');

    // Global Event Delegation
    document.addEventListener("click", handleGlobalClick);
    document.addEventListener("input", handleGlobalInput);
    document.addEventListener("change", handleGlobalChange);
    document.addEventListener("submit", handleGlobalSubmit);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Tab" || (event.key === "Enter" && !isModalOpen())) {
            // Optional
        }
    });

    // Expose functions to window
    window.showAddModal = showAddModal;
    window.hideAddModal = hideAddModal;
    window.showFlashcards = showFlashcards;
    window.hideFlashcardModal = hideFlashcardModal;
    window.showDailyChallenge = showDailyChallenge;
    window.hideDailyChallengeModal = hideDailyChallengeModal;
    window.toggleImportExportMenu = toggleImportExportMenu;
    window.exportWords = exportWords;
    window.importWords = importWords;
    window.startVoiceRecognition = startVoiceRecognition;
    window.newWord = newWord;
    window.showGame = showGame;
    window.speakWord = speakWord;
    window.speakWordFromText = speakWordFromText;
    window.previousCard = previousCard;
    window.nextCard = nextCard;
    window.flipCard = flipCard;
    window.markLearned = markLearned;
    window.closeGameResults = closeGameResults;
    window.toggleFavorite = toggleFavorite;
    window.deleteWord = deleteWord;
    window.toggleDone = toggleDone;

    renderWordsTable();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}

function isModalOpen() {
    return !getEl("addWordModal")?.classList.contains("hidden");
}

// ==========================================
// Event Delegates
// ==========================================
function handleGlobalSubmit(e) {
    if (e.target.id === "addWordForm") {
        handleAddWordSubmit(e);
    }
}
function handleGlobalInput(e) {
    if (e.target.id === "searchInput") filterWords();
    if (e.target.name === "word" && e.target.closest("#addWordForm")) {
        autoTranslate(e);
    }
}
function handleGlobalChange(e) {
    if (["categoryFilter", "languageFilter", "sortFilter"].includes(e.target.id)) {
        filterWords();
    }
}
function handleGlobalClick(e) {
    if (e.target.id === "themeToggle" || e.target.closest("#themeToggle")) {
        toggleTheme();
    }
}

// ==========================================
// Core Data & Logic
// ==========================================

function loadFromLocalStorage() {
    try {
        const savedWords = localStorage.getItem("vocabularyWords");
        if (savedWords) {
            words = JSON.parse(savedWords);
            if (!Array.isArray(words)) words = [];
            words.forEach(w => {
                if (typeof w.frequency === 'undefined') w.frequency = 1;
                if (!w.id) w.id = generateUniqueId();
            });
        }
    } catch (err) {
        console.error(err);
        words = [];
    }
}

function saveToLocalStorage() {
    try {
        localStorage.setItem("vocabularyWords", JSON.stringify(words));
        updateStatistics();
    } catch (err) { console.error(err); }
}

function checkExistingWord(word) {
    if (!word) return null;
    return words.find(w => w.word.toLowerCase() === word.toLowerCase());
}

function handleAddWordSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const wordText = formData.get("word").trim();

    if (!wordText) { showNotification("Please enter a word", "war_livl_1"); return; }

    const existing = checkExistingWord(wordText);
    if (existing) {
        existing.frequency = (existing.frequency || 1) + 1;
        existing.dateAdded = new Date().toISOString();
        saveToLocalStorage();
        renderWordsTable();
        hideAddModal();
        showNotification(`Word "${existing.word}" frequency updated (x${existing.frequency})`, "war_livl_2");
    } else {
        const newWord = {
            id: generateUniqueId(),
            word: wordText,
            translation: formData.get("translation").trim(),
            category: formData.get("category"),
            language: formData.get("language"),
            example: formData.get("example"),
            isFavorite: false,
            isDone: false,
            isMastered: false,
            dateAdded: new Date().toISOString(),
            frequency: 1
        };
        words.unshift(newWord);
        saveToLocalStorage();
        renderWordsTable();
        hideAddModal();
        showNotification("Word added successfully!", "war_livl_2");
    }
}

function renderWordsTable() {
    const tbody = getEl("wordsTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    const search = getEl("searchInput")?.value.toLowerCase() || "";
    const category = getEl("categoryFilter")?.value || "";
    const language = getEl("languageFilter")?.value || "";
    const sort = getEl("sortFilter")?.value || "newest";

    const filtered = words.filter(w => {
        const matchesSearch = (w.word || "").toLowerCase().includes(search) || (w.translation || "").toLowerCase().includes(search);
        const matchesCat = category ? w.category === category : true;
        const matchesLang = language ? w.language === language : true;
        return matchesSearch && matchesCat && matchesLang;
    });

    filtered.sort((a, b) => {
        if (sort === "newest") return new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0);
        if (sort === "oldest") return new Date(a.dateAdded || 0) - new Date(b.dateAdded || 0);
        if (sort === "alphabetical") return (a.word || "").localeCompare(b.word || "");
        if (sort === "frequency") return (b.frequency || 1) - (a.frequency || 1);
        return 0;
    });

    filtered.forEach((word) => {
        const row = document.createElement("tr");
        row.className = "hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0";
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                 <button onclick="window.toggleDone('${word.word}')" class="text-slate-500 hover:text-emerald-400 transition-colors">
                    <i class="fas ${word.isDone ? "fa-check-circle" : "fa-circle"} ${word.isDone ? "text-emerald-400" : "text-slate-600"}" style="font-size: 1.2rem;"></i>
                 </button>
            </td>
            <td class="px-6 py-4">  
                 <div class="relative flex items-center gap-2">
                    <span class="font-medium text-white">${word.word}</span>
                    ${(word.frequency > 1) ? `<span class="px-1.5 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">x${word.frequency}</span>` : ''}
                    <button onclick="window.speakWordFromText('${word.word}', '${word.language}')" class="text-slate-500 hover:text-indigo-400 transition-colors opacity-0 group-hover:opacity-100">
                        <i class="fas fa-volume-up"></i>
                    </button>
                 </div>
            </td>
            <td class="px-6 py-4 text-slate-300 text-sm">${word.translation || ''}</td>
            <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-slate-400 border border-white/10">
                    ${word.category || 'General'}
                </span>
            </td>
            <td class="px-6 py-4 text-slate-400 text-xs">${word.language || ''}</td>
            <td class="px-6 py-4 text-right whitespace-nowrap">
                <button onclick="window.toggleFavorite('${word.word}')" class="text-slate-500 hover:text-amber-400 mr-3 transition-colors">
                    <i class="${word.isFavorite ? "fas" : "far"} fa-star text-${word.isFavorite ? "amber-400" : "slate-500"}"></i>
                </button> 
                <button onclick="window.deleteWord('${word.word}')" class="text-slate-500 hover:text-red-400 transition-colors">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        if (word.isDone) row.classList.add("opacity-50");
        tbody.appendChild(row);
    });
    updateStatistics();
}

async function autoTranslate(e) {
    const wordInput = e.target;
    if (wordInput._timeout) clearTimeout(wordInput._timeout);

    wordInput._timeout = setTimeout(async () => {
        const form = wordInput.closest("form");
        if (!form) return;
        const translationInput = form.querySelector('#translation') || form.querySelector('input[name="translation"]');
        const languageSelect = form.querySelector('select[name="language"]');
        const word = wordInput.value.trim();
        if (!word || word.length < 2) return;

        try {
            translationInput.placeholder = "Translating...";
            let sourceLang = "en";
            let targetLang = "ar";
            if (/[a-zA-Z]/.test(word)) {
                sourceLang = "en";
                const val = languageSelect ? languageSelect.value : "";
                if (val.includes("french")) targetLang = "fr";
                else if (val.includes("spanish")) targetLang = "es";
                else targetLang = "ar";
            } else {
                sourceLang = "ar";
                targetLang = "en";
            }
            const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=${sourceLang}|${targetLang}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.responseData && data.responseData.translatedText) {
                translationInput.value = data.responseData.translatedText;
            }
        } catch (error) { console.error("Translation error", error); }
    }, 500);
}

// ==========================================
// Games & Modals
// ==========================================

function showFlashcards() {
    getEl("flashcardModal").classList.remove("hidden");
    showCard(0);
}
function hideFlashcardModal() {
    getEl("flashcardModal").classList.add("hidden");
}
function showCard(index) {
    if (!words.length) {
        getEl("flashcardContent").textContent = "Add words first!";
        return;
    }
    // Safe index wrap
    index = (index + words.length) % words.length;
    currentCardIndex = index;
    const card = words[index];
    const el = getEl("flashcardContent");
    el.textContent = isFlipped ? card.translation : card.word;
}
function flipCard() {
    isFlipped = !isFlipped;
    showCard(currentCardIndex);
}
function nextCard() {
    isFlipped = false;
    showCard(currentCardIndex + 1);
}
function previousCard() {
    isFlipped = false;
    showCard(currentCardIndex - 1);
}
function markLearned() {
    // Basic stub
    showNotification("Marked as Learned!", "war_livl_2");
    nextCard();
}

function showGame(gameId) {
    document.querySelectorAll(".game-container").forEach(c => c.classList.add("hidden"));
    if (gameInterval) clearInterval(gameInterval); // safety clear

    const container = getEl(gameId);
    if (!container) return;

    container.classList.remove("hidden");
    container.innerHTML = "";

    switch (gameId) {
        case "wordMatch": startWordMatch(container); break;
        case "speedChallenge": startSpeedChallenge(container); break;
        case "memoryGame": startMemoryGame(container); break;
        case "dailyChallenge": startDailyChallenge(container); break;
        case "wordQuizChallenge": startWordQuizChallenge(container); break;
        default: container.innerHTML = "<p class='text-white p-4 text-center'>Game not implemented yet.</p>"; break;
    }
}
function closeGameResults() {
    getEl("gameResultsModal").classList.add("hidden");
}

/* Game Impls */
function startWordMatch(container) {
    container.innerHTML = `
        <div class="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h3 class="text-xl font-bold mb-6 text-white text-center">Match Words</h3>
            <div id="wmGrid" class="grid grid-cols-2 md:grid-cols-4 gap-4"></div>
            <div class="mt-6 flex justify-center gap-8 text-lg font-mono">
                <p class="text-emerald-400">Score: <span id="wmScore">0</span></p>
                <p class="text-amber-400">Time: <span id="wmTimer">60</span>s</p>
            </div>
        </div>
    `;
    if (words.length < 4) { container.innerHTML += "<p class='text-center text-red-400 mt-4'>Need 4+ words.</p>"; return; }

    const subset = [...words].sort(() => 0.5 - Math.random()).slice(0, 8);
    const items = [];
    subset.forEach(w => {
        items.push({ id: w.word, text: w.word, type: 'word' });
        items.push({ id: w.word, text: w.translation, type: 'trans' });
    });
    items.sort(() => 0.5 - Math.random());

    const grid = container.querySelector("#wmGrid");
    let score = 0, selected = null, timeLeft = 60;

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/5 p-4 rounded-xl text-center cursor-pointer transition-all select-none";
        card.innerText = item.text;
        card.onclick = () => {
            if (card.classList.contains("opacity-0")) return;
            card.classList.add("ring-2", "ring-indigo-500", "bg-indigo-500/20");
            if (!selected) { selected = { card, item }; }
            else {
                if (selected.card === card) return;
                if (selected.item.id === item.id && selected.item.type !== item.type) {
                    score += 10; getEl("wmScore").textContent = score;
                    setTimeout(() => { card.classList.add("opacity-0", "pointer-events-none"); selected.card.classList.add("opacity-0", "pointer-events-none"); selected = null; }, 300);
                } else {
                    setTimeout(() => { card.classList.remove("ring-2", "ring-indigo-500", "bg-indigo-500/20"); selected.card.classList.remove("ring-2", "ring-indigo-500", "bg-indigo-500/20"); selected = null; }, 500);
                }
            }
        };
        grid.appendChild(card);
    });

    gameInterval = setInterval(() => {
        timeLeft--;
        if (getEl("wmTimer")) getEl("wmTimer").textContent = timeLeft;
        if (timeLeft <= 0) { clearInterval(gameInterval); showModal(`Game Over! Score: ${score}`); }
    }, 1000);
}

function startSpeedChallenge(container) {
    if (words.length === 0) return;
    container.innerHTML = `
        <div class="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto text-center">
            <h3 class="text-2xl font-bold mb-8 text-white">Speed Translation</h3>
            <div id="challengeWord" class="text-4xl font-bold text-white mb-8">Ready?</div>
            <input type="text" id="scInput" class="w-full max-w-md mx-auto p-4 bg-slate-800 border border-white/10 rounded-xl text-center text-xl text-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Type..." autoFocus />
            <div class="mt-8 flex justify-center gap-8 text-lg font-mono">
                <p class="text-emerald-400">Score: <span id="scScore">0</span></p>
                <p class="text-amber-400">Time: <span id="scTimer">60</span>s</p>
            </div>
        </div>
    `;
    let score = 0, timeLeft = 60, currentWord = null;
    const input = container.querySelector("#scInput");
    const display = container.querySelector("#challengeWord");

    const nextFn = () => { currentWord = words[Math.floor(Math.random() * words.length)]; display.textContent = currentWord.word; input.value = ""; input.focus(); };
    input.onkeyup = (e) => {
        if (input.value.trim().toLowerCase() === currentWord.translation.toLowerCase()) {
            score++; getEl("scScore").textContent = score; nextFn();
        }
    };
    nextFn();
    gameInterval = setInterval(() => {
        timeLeft--;
        if (getEl("scTimer")) getEl("scTimer").textContent = timeLeft;
        if (timeLeft <= 0) { clearInterval(gameInterval); showModal(`Time's up! Score: ${score}`); }
    }, 1000);
}

function startMemoryGame(container) {
    container.innerHTML = `<div class="bg-slate-900 border border-white/10 rounded-2xl p-6"><h3 class="text-xl font-bold mb-6 text-white text-center">Memory Cards</h3><div id="mgGrid" class="grid grid-cols-4 gap-3"></div><div class="mt-6 flex justify-center gap-8 text-white"><p>Matches: <span id="mgMatches">0</span></p></div></div>`;
    const subset = [...words].sort(() => 0.5 - Math.random()).slice(0, 8);
    const cards = [];
    subset.forEach(w => { cards.push({ val: w.word, id: w.word }); cards.push({ val: w.translation, id: w.word }); });
    cards.sort(() => 0.5 - Math.random());

    const grid = container.querySelector("#mgGrid");
    let flipped = [], matches = 0;
    cards.forEach(c => {
        const el = document.createElement("div");
        el.className = "aspect-square bg-slate-800 rounded-xl flex items-center justify-center cursor-pointer text-transparent hover:bg-slate-700 transition-colors select-none text-sm p-1 border border-white/5";
        el.textContent = c.val;
        el.onclick = () => {
            if (el.classList.contains("text-white") || flipped.length >= 2) return;
            el.classList.remove("text-transparent"); el.classList.add("text-white", "bg-indigo-600");
            flipped.push({ el, id: c.id });
            if (flipped.length === 2) {
                const [c1, c2] = flipped;
                if (c1.id === c2.id) {
                    matches++; getEl("mgMatches").textContent = matches; c1.el.classList.add("bg-emerald-600"); c2.el.classList.add("bg-emerald-600"); flipped = [];
                    if (matches === subset.length) showModal("All matched!");
                } else { setTimeout(() => { c1.el.classList.add("text-transparent"); c1.el.classList.remove("text-white", "bg-indigo-600"); c2.el.classList.add("text-transparent"); c2.el.classList.remove("text-white", "bg-indigo-600"); flipped = []; }, 1000); }
            }
        };
        grid.appendChild(el);
    });
}
function startWordQuizChallenge(container) {
    container.innerHTML = `
        <div class="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-xl mx-auto">
            <h3 class="text-xl font-bold mb-4 text-white">Word Quiz</h3>
            <div id="wqContent" class="text-white space-y-4"></div>
            <div id="wqResult" class="h-8 mt-2"></div>
            <button id="wqNext" class="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition">Next</button>
        </div>
    `;
    const nextBtn = container.querySelector("#wqNext");
    nextBtn.onclick = () => loadQ();
    function loadQ() {
        if (words.length < 4) { container.querySelector("#wqContent").innerHTML = "Need more words!"; return; }
        const target = words[Math.floor(Math.random() * words.length)];
        const others = words.filter(w => w.word !== target.word).sort(() => 0.5 - Math.random()).slice(0, 3);
        const options = [target, ...others].sort(() => 0.5 - Math.random());
        container.querySelector("#wqContent").innerHTML = `
            <p class="text-lg text-slate-300">What is the translation for: <strong class="text-white text-xl block mt-1">${target.word}</strong>?</p>
            <div class="grid gap-2 mt-4">${options.map(opt => `<button class="opt-btn w-full p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-left transition-colors" onclick="checkQuiz('${opt.translation.replace(/'/g, "\\'")}', '${target.translation.replace(/'/g, "\\'")}', this)">${opt.translation}</button>`).join('')}</div>`;
        container.querySelector("#wqResult").innerHTML = "";
    }
    window.checkQuiz = (sel, cor, btn) => {
        const res = getEl("wqResult");
        if (sel === cor) { res.innerHTML = '<span class="text-emerald-400 font-bold">Correct!</span>'; btn.classList.add("ring-2", "ring-emerald-500", "bg-emerald-500/10"); }
        else { res.innerHTML = '<span class="text-red-400 font-bold">Wrong!</span>'; btn.classList.add("ring-2", "ring-red-500"); }
    }
    loadQ();
}
function startDailyChallenge(container) {
    container.innerHTML = `<div class="bg-slate-900 border border-white/10 rounded-2xl p-6"><h3 class="text-xl font-bold mb-4 text-white">Daily Tasks</h3><div class="space-y-3"><label class="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition"><input type="checkbox" class="form-checkbox text-indigo-500 rounded border-slate-600 bg-slate-700"><span class="text-slate-300">Review 5 words</span></label></div></div>`;
}

// Helpers
function generateUniqueId() { return Date.now().toString(36) + Math.random().toString(36).substr(2); }
function showNotification(msg, lvl) {
    const n = getEl("notification");
    n.innerHTML = `<i class="fas fa-info-circle"></i> <span>${msg}</span>`;
    n.classList.remove("hidden");
    setTimeout(() => n.classList.add("hidden"), 3000);
}
function updateStatistics() { if (getEl("totalWords")) getEl("totalWords").textContent = words.length; }
function toggleImportExportMenu() { getEl("importExportMenu")?.classList.toggle("hidden"); }
function showAddModal() { getEl("addWordModal")?.classList.remove("hidden"); }
function hideAddModal() { getEl("addWordModal")?.classList.add("hidden"); }
function showDailyChallenge() { getEl("dailyChallengeModal")?.classList.remove("hidden"); }
function hideDailyChallengeModal() { getEl("dailyChallengeModal")?.classList.add("hidden"); }
function showModal(msg) { const m = getEl("gameResultsModal"); getEl("gameResultsContent").innerHTML = msg; m.classList.remove("hidden"); }

// Stubs for extra global calls
function exportWords() {
    const blob = new Blob([JSON.stringify(words, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "words.json";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    showNotification("Words exported!", "war_livl_2");
}
function importWords(e) {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader(); r.onload = (ev) => {
        try {
            words = JSON.parse(ev.target.result); saveToLocalStorage(); renderWordsTable(); showNotification("Imported!", "war_livl_2");
        } catch (err) { showNotification("Error", "war_livl_1"); }
    }; r.readAsText(f);
}
function startVoiceRecognition() { showNotification("Voice recognition not supported", "war_livl_1"); }
function speakWordFromText(t, l) { const u = new SpeechSynthesisUtterance(t); speechSynthesis.speak(u); }
function speakWord(b) { speakWordFromText(b.previousElementSibling.value, 'en'); }
function newWord() { showAddModal(); }
function toggleFavorite(w) { const i = words.find(i => i.word === w); if (i) { i.isFavorite = !i.isFavorite; saveToLocalStorage(); renderWordsTable(); } }
function deleteWord(w) { if (confirm("Delete?")) { words = words.filter(i => i.word !== w); saveToLocalStorage(); renderWordsTable(); } }
function toggleDone(w) { const i = words.find(i => i.word === w); if (i) { i.isDone = !i.isDone; saveToLocalStorage(); renderWordsTable(); } }
