"use client"

import { useEffect } from "react"
import Script from "next/script"

export default function Home() {
    useEffect(() => {
        // Force body classes for your app
        document.body.className = "bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30"
        document.body.id = "mainBody"
    }, [])

    return (
        <>
            {/* External Fonts & Icons */}
            <link
                href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                rel="stylesheet"
            />

            {/* Tailwind CDN for runtime styles if needed by external scripts, though we use built-in mostly now */}
            <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />

            {/* Your JS files - load system first, then main */}
            <Script src="/js/script_system_1.js" strategy="beforeInteractive" />
            <Script src="/js/script_main.js" strategy="afterInteractive" />

            {/* Main Layout */}
            <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">

                {/* Navigation */}
                <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/60">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-20 items-center">
                            {/* Logo */}
                            <div className="flex items-center gap-2">
                                <div className="bg-indigo-500/10 p-2 rounded-xl border border-indigo-500/20">
                                    <i className="fas fa-language text-2xl text-indigo-400"></i>
                                </div>
                                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 font-[Outfit] tracking-tight">
                                    WordFlow
                                </h1>
                            </div>

                            {/* Main Nav Links (Desktop) */}
                            <div className="hidden md:flex items-center space-x-1">
                                <a href="#" className="nav-item-active group">
                                    <span className="relative px-3 py-2 flex items-center text-sm font-medium text-white">
                                        <i className="fas fa-table mr-2 text-indigo-400 group-hover:text-indigo-300 transition-colors"></i>
                                        Words
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                                    </span>
                                </a>
                                <a onClick={() => (window as any).showFavorites?.()} href="#" className="nav-item group">
                                    <span className="relative px-3 py-2 flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors">
                                        <i className="fas fa-star mr-2 text-amber-400/80 group-hover:text-amber-300 transition-colors"></i>
                                        Favorites
                                    </span>
                                </a>
                                <a onClick={() => (window as any).showDoneList?.()} href="#" className="nav-item group">
                                    <span className="relative px-3 py-2 flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors">
                                        <i className="fas fa-check-circle mr-2 text-emerald-400/80 group-hover:text-emerald-300 transition-colors"></i>
                                        Done
                                    </span>
                                </a>
                                <a onClick={() => (window as any).showFlashcards?.()} href="#" className="nav-item group">
                                    <span className="relative px-3 py-2 flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors">
                                        <i className="fas fa-layer-group mr-2 text-pink-400/80 group-hover:text-pink-300 transition-colors"></i>
                                        Flashcards
                                    </span>
                                </a>
                            </div>

                            {/* Right Side Actions */}
                            <div className="flex items-center gap-3">
                                <button
                                    id="themeToggle"
                                    className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-200"
                                >
                                    <i id="themeIcon" className="fas fa-moon"></i>
                                </button>

                                <div className="relative group">
                                    <button onClick={() => (window as any).toggleImportExportMenu?.()} className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-200">
                                        <i className="fas fa-file-import"></i>
                                    </button>
                                    {/* Dropdown Menu */}
                                    <div id="importExportMenu" className="hidden absolute right-0 mt-2 w-56 rounded-xl shadow-2xl bg-slate-900 border border-white/10 ring-1 ring-black/50 z-50 overflow-hidden backdrop-blur-xl">
                                        <div className="py-1">
                                            <a href="#" onClick={() => (window as any).exportWords?.()} className="group flex items-center px-4 py-3 text-sm text-slate-300 hover:bg-white/5 transition-colors">
                                                <i className="fas fa-file-export mr-3 text-sky-400"></i>
                                                Export Words
                                            </a>
                                            <label className="group flex items-center px-4 py-3 text-sm text-slate-300 hover:bg-white/5 transition-colors cursor-pointer border-t border-white/5">
                                                <i className="fas fa-file-arrow-up mr-3 text-emerald-400"></i>
                                                Import Words
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept=".json,.csv"
                                                    onChange={(e) => (window as any).importWords?.(e.nativeEvent)}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={() => (window as any).showDailyChallenge?.()} className="relative p-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 hover:border-amber-500/50 text-amber-400 hover:text-amber-300 transition-all duration-200 group">
                                    <i className="fas fa-trophy group-hover:scale-110 transition-transform"></i>
                                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content Area */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

                    {/* Dashboard Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="relative overflow-hidden group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-400">Total Words</p>
                                    <h3 className="text-3xl font-bold text-white mt-1" id="totalWords">0</h3>
                                </div>
                                <div className="p-3 rounded-lg bg-indigo-500/20 text-indigo-400">
                                    <i className="fas fa-book text-xl"></i>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-400">Day Streak</p>
                                    <h3 className="text-3xl font-bold text-white mt-1" id="learningStreak">0</h3>
                                </div>
                                <div className="p-3 rounded-lg bg-orange-500/20 text-orange-400">
                                    <i className="fas fa-fire text-xl"></i>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-400">Mastered</p>
                                    <h3 className="text-3xl font-bold text-white mt-1" id="masteredWords">0</h3>
                                </div>
                                <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-400">
                                    <i className="fas fa-check-double text-xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters & Search Toolbar */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-4 sm:p-5">
                        <div className="flex flex-col xl:flex-row gap-4 justify-between">
                            {/* Filters */}
                            <div className="flex flex-col sm:flex-row gap-3 flex-1 overflow-x-auto pb-1 sm:pb-0">
                                <div className="min-w-[140px]">
                                    <select
                                        id="categoryFilter"
                                        className="w-full text-sm bg-slate-900/50 border border-white/10 text-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:bg-slate-900/80 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">All Categories</option>
                                        <option value="business">Business</option>
                                        <option value="travel">Travel</option>
                                        <option value="medical">Medical</option>
                                        <option value="technology">Technology</option>
                                    </select>
                                </div>
                                <div className="min-w-[140px]">
                                    <select
                                        id="languageFilter"
                                        className="w-full text-sm bg-slate-900/50 border border-white/10 text-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:bg-slate-900/80 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">All Languages</option>
                                        <option value="english<->arabic">English ↔ Arabic</option>
                                        <option value="english<->french">English ↔ French</option>
                                        <option value="english<->spanish">English ↔ Spanish</option>
                                    </select>
                                </div>
                                <div className="min-w-[140px]">
                                    <select
                                        id="sortFilter"
                                        className="w-full text-sm bg-slate-900/50 border border-white/10 text-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:bg-slate-900/80 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="newest">Newest First</option>
                                        <option value="oldest">Oldest First</option>
                                        <option value="alphabetical">Alphabetical</option>
                                        <option value="frequency">Most Frequent</option>
                                    </select>
                                </div>
                            </div>

                            {/* Search */}
                            <div className="relative flex-1 max-w-lg">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-search text-slate-500"></i>
                                </div>
                                <input
                                    type="text"
                                    id="searchInput"
                                    placeholder="Search for a word..."
                                    className="block w-full pl-10 pr-12 py-2.5 bg-slate-900/50 border border-white/10 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all disabled:opacity-50"
                                />
                                <div className="absolute inset-y-0 right-0 p-1">
                                    <button
                                        onClick={() => (window as any).startVoiceRecognition?.()}
                                        className="h-full aspect-square rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 transition-colors flex items-center justify-center p-2"
                                    >
                                        <i className="fas fa-microphone"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div id="tablemain" className="overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-sm shadow-xl">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-400">
                                <thead className="bg-white/5 text-xs uppercase text-slate-300">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                                        <th className="px-6 py-4 font-semibold tracking-wider">Word</th>
                                        <th className="px-6 py-4 font-semibold tracking-wider">Translation</th>
                                        <th className="px-6 py-4 font-semibold tracking-wider">Category</th>
                                        <th className="px-6 py-4 font-semibold tracking-wider">Pair</th>
                                        <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="wordsTableBody" className="divide-y divide-white/5">
                                    {/* Rows are injected by JS */}
                                </tbody>
                            </table>
                        </div>
                        {/* Empty State / Loading State could go here if managed by React, but it's external JS */}
                    </div>

                    {/* Games & Challenges Section */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <i className="fas fa-gamepad text-indigo-400"></i>
                            Training Zone
                        </h3>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Word Match */}
                            <button onClick={() => (window as any).showGame?.("wordMatch")} className="group relative p-4 h-32 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:border-blue-400/50 transition-all hover:-translate-y-1 overflow-hidden text-left flex flex-col justify-end">
                                <div className="absolute top-4 right-4 text-3xl text-blue-500/20 group-hover:text-blue-500/40 transition-colors">
                                    <i className="fas fa-puzzle-piece"></i>
                                </div>
                                <span className="font-bold text-blue-100 group-hover:text-white transition-colors">Word Match</span>
                                <span className="text-xs text-blue-300/60">Connect pairs</span>
                            </button>

                            {/* Speed Challenge */}
                            <button onClick={() => (window as any).showGame?.("speedChallenge")} className="group relative p-4 h-32 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 hover:border-emerald-400/50 transition-all hover:-translate-y-1 overflow-hidden text-left flex flex-col justify-end">
                                <div className="absolute top-4 right-4 text-3xl text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors">
                                    <i className="fas fa-bolt"></i>
                                </div>
                                <span className="font-bold text-emerald-100 group-hover:text-white transition-colors">Speed Run</span>
                                <span className="text-xs text-emerald-300/60">Race against time</span>
                            </button>

                            {/* Memory Game */}
                            <button onClick={() => (window as any).showGame?.("memoryGame")} className="group relative p-4 h-32 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:border-purple-400/50 transition-all hover:-translate-y-1 overflow-hidden text-left flex flex-col justify-end">
                                <div className="absolute top-4 right-4 text-3xl text-purple-500/20 group-hover:text-purple-500/40 transition-colors">
                                    <i className="fas fa-brain"></i>
                                </div>
                                <span className="font-bold text-purple-100 group-hover:text-white transition-colors">Memory</span>
                                <span className="text-xs text-purple-300/60">Find match</span>
                            </button>

                            {/* Daily Challenge */}
                            <button onClick={() => (window as any).showGame?.("dailyChallenge")} className="group relative p-4 h-32 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 hover:border-amber-400/50 transition-all hover:-translate-y-1 overflow-hidden text-left flex flex-col justify-end">
                                <div className="absolute top-4 right-4 text-3xl text-amber-500/20 group-hover:text-amber-500/40 transition-colors">
                                    <i className="fas fa-calendar-star"></i>
                                </div>
                                <span className="font-bold text-amber-100 group-hover:text-white transition-colors">Daily Quest</span>
                                <span className="text-xs text-amber-300/60">Earn streak</span>
                            </button>

                            {/* More Games Buttons (Mini) */}
                            <button onClick={() => (window as any).showGame?.("wordQuizChallenge")} className="col-span-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-slate-300 hover:text-white flex items-center justify-center gap-2">
                                <i className="fas fa-question-circle text-indigo-400"></i> Tech Quiz
                            </button>
                            <button onClick={() => (window as any).showGame?.("askTranslateChallenge")} className="col-span-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-slate-300 hover:text-white flex items-center justify-center gap-2">
                                <i className="fas fa-comments text-teal-400"></i> Translate
                            </button>
                            <button onClick={() => (window as any).showGame?.("efmQuestions")} className="col-span-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-slate-300 hover:text-white flex items-center justify-center gap-2">
                                <i className="fas fa-flask text-rose-400"></i> EFM Lab
                            </button>
                        </div>

                        {/* Game Containers Area */}
                        <div id="gameContainers" className="mt-8">
                            {/* Word Match Game */}
                            <div id="wordMatch" className="game-container hidden animate__animated animate__fadeIn">
                                <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-xl font-bold mb-6 text-white text-center">Match Words</h3>
                                    <div id="wordMatchContainer" className="grid grid-cols-2 md:grid-cols-4 gap-4"></div>
                                    <div className="mt-6 flex justify-center gap-8 text-lg font-mono">
                                        <p className="text-emerald-400">Score: <span id="wordMatchScore">0</span></p>
                                        <p className="text-amber-400">Time: <span id="wordMatchTimer">60</span>s</p>
                                    </div>
                                </div>
                            </div>

                            {/* Speed Challenge */}
                            <div id="speedChallenge" className="game-container hidden animate__animated animate__fadeIn">
                                <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto text-center">
                                    <h3 className="text-2xl font-bold mb-8 text-white">Speed Translation</h3>
                                    <div id="challengeWord" className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-8 animate-pulse">Ready?</div>
                                    <input type="text" id="challengeInput" className="w-full max-w-md mx-auto p-4 bg-white/5 border border-white/10 rounded-xl text-center text-xl text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Type translation..." autoFocus />
                                    <div className="mt-8 flex justify-center gap-8 text-lg font-mono">
                                        <p className="text-emerald-400">Score: <span id="speedScore">0</span></p>
                                        <p className="text-amber-400">Time: <span id="speedTimer">30</span>s</p>
                                    </div>
                                </div>
                            </div>

                            {/* Memory Game */}
                            <div id="memoryGame" className="game-container hidden animate__animated animate__fadeIn">
                                <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                                    <h3 className="text-xl font-bold mb-6 text-white text-center">Memory Cards</h3>
                                    <div id="memoryContainer" className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3"></div>
                                    <div className="mt-6 flex justify-center gap-8 text-lg font-mono">
                                        <p className="text-emerald-400">Matches: <span id="memoryScore">0</span></p>
                                        <p className="text-blue-400">Moves: <span id="memoryMoves">0</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* Daily Challenge */}
                            <div id="dailyChallenge" className="game-container hidden animate__animated animate__fadeIn">
                                <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-3xl mx-auto">
                                    <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                                        <i className="fas fa-calendar-day text-amber-500"></i> Daily Challenge
                                    </h3>
                                    <div id="dailyChallengeList" className="space-y-3"></div>
                                    <div className="mt-6">
                                        <div className="flex justify-between text-sm text-slate-400 mb-2">
                                            <span>Progress</span>
                                            <span><span id="challengeProgress">0</span>/5</span>
                                        </div>
                                        <div className="w-full bg-white/5 rounded-full h-3">
                                            <div id="challengeProgressBar" className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-500" style={{ width: "0%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Placeholders for new game containers (keep IDs for compatibility) */}
                            <div id="wordQuizChallenge" className="game-container hidden"></div>
                            <div id="askTranslateChallenge" className="game-container hidden"></div>
                            <div id="efmQuestions" className="game-container hidden"></div>
                        </div>

                        {/* Results Modal */}
                        <div id="gameResultsModal" className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm hidden flex items-center justify-center p-4">
                            <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl w-full max-w-sm shadow-2xl relative overflow-hidden animate__animated animate__zoomIn">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                                <h3 className="text-2xl font-bold mb-6 text-white text-center">Game Over</h3>
                                <div id="gameResultsContent" className="text-slate-300 text-center mb-8"></div>
                                <button onClick={() => (window as any).closeGameResults?.()} className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Action Buttons */}
                <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40">
                    <button
                        onClick={() => (window as any).newWord?.()}
                        id="btnAddNewData"
                        title="Quick Add"
                        className="w-12 h-12 flex items-center justify-center bg-indigo-500 hover:bg-indigo-400 text-white rounded-full shadow-lg shadow-indigo-500/30 transition-all hover:scale-110"
                    >
                        <i className="fa-solid fa-paper-plane text-lg"></i>
                    </button>

                    <button
                        onClick={() => (window as any).showAddModal?.()}
                        title="Add New"
                        className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-full shadow-xl shadow-indigo-900/50 transition-all hover:scale-105 hover:rotate-90"
                    >
                        <i className="fas fa-plus text-2xl"></i>
                    </button>
                </div>

                {/* -- MODALS -- */}

                {/* Add Word Modal */}
                <div id="addWordModal" className="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate__animated animate__fadeInUp">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-white mb-6">Add New Word</h3>
                            <form id="addWordForm" className="space-y-4" onSubmit={(e) => { e.preventDefault(); (window as any).submitForm?.(e.nativeEvent); }}>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-slate-400 font-medium mb-1.5">Word</label>
                                    <div className="relative">
                                        <input type="text" name="word" id="word" required className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent outline-none transition-all" />
                                        <button type="button" onClick={(e) => (window as any).speakWord?.(e.currentTarget)} className="absolute right-3 top-2.5 text-slate-400 hover:text-indigo-400 transition-colors">
                                            <i className="fas fa-volume-up"></i>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-slate-400 font-medium mb-1.5">Translation</label>
                                    <input type="text" name="translation" id="translation" required className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent outline-none transition-all" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-slate-400 font-medium mb-1.5">Category</label>
                                        <select name="category" required className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent outline-none transition-all appearance-none">
                                            <option value="business">Business</option>
                                            <option value="travel">Travel</option>
                                            <option value="medical">Medical</option>
                                            <option value="technology">Technology</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-slate-400 font-medium mb-1.5">Language</label>
                                        <select name="language" required className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent outline-none transition-all appearance-none">
                                            <option value="arabic<->english">Arabic ↔ English</option>
                                            <option value="english<->french">English ↔ French</option>
                                            <option value="english<->spanish">English ↔ Spanish</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-slate-400 font-medium mb-1.5">Example (Optional)</label>
                                    <textarea name="example" rows={3} className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent outline-none transition-all resize-none"></textarea>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button type="button" onClick={() => (window as any).hideAddModal?.()} className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition-all text-sm font-medium">Cancel</button>
                                    <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/30 transition-all text-sm font-medium">Save Word</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Flashcard Modal */}
                <div id="flashcardModal" className="hidden fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="relative w-full max-w-2xl">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <h3 className="text-2xl font-bold text-white">Flashcard Practice</h3>
                            <button onClick={() => (window as any).hideFlashcardModal?.()} className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>

                        {/* Card Frame */}
                        <div className="aspect-[16/9] bg-slate-800 rounded-3xl p-1 shadow-2xl overflow-hidden relative group perspective-1000">
                            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-[22px] border border-white/5 flex items-center justify-center p-10 relative">
                                <div id="flashcard" className="absolute inset-0 flex items-center justify-center cursor-pointer transition-transform duration-500">
                                    <div id="flashcardContent" className="text-4xl md:text-5xl font-bold text-center text-white break-words max-w-lg selection:bg-indigo-500/50"></div>
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex justify-center items-center gap-6 mt-8">
                            <button onClick={() => (window as any).previousCard?.()} className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 active:scale-95 transition-all text-white">
                                <i className="fas fa-arrow-left text-xl"></i>
                            </button>
                            <button onClick={() => (window as any).flipCard?.()} className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-900/50 hover:scale-105 active:scale-95 transition-all text-white font-semibold flex items-center gap-3">
                                <i className="fas fa-sync-alt"></i> Flip Card
                            </button>
                            <button onClick={() => (window as any).nextCard?.()} className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 active:scale-95 transition-all text-white">
                                <i className="fas fa-arrow-right text-xl"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Daily Challenge Modal (Word of the Day) */}
                <div id="dailyChallengeModal" className="hidden fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl shadow-2xl p-8 relative overflow-hidden animate__animated animate__zoomIn">
                        {/* Decorative Glow */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl"></div>

                        <div className="text-center mb-8 relative z-10">
                            <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-500 mb-4">
                                <i className="fas fa-sun text-2xl"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-white">Daily Word Discovery</h3>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-8 text-center border border-white/5 mb-8 relative z-10">
                            <div id="dailyWord" className="text-3xl font-bold text-white mb-2"></div>
                            <div id="dailyDefinition" className="text-indigo-300 font-medium mb-4"></div>
                            <div id="dailyExample" className="text-slate-400 italic font-light text-sm"></div>
                        </div>

                        <div className="flex gap-4 relative z-10">
                            <button onClick={() => (window as any).hideDailyChallengeModal?.()} className="flex-1 py-3 text-slate-400 hover:text-white font-medium hover:bg-white/5 rounded-xl transition-colors">
                                Later
                            </button>
                            <button onClick={() => (window as any).markLearned?.()} className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-900/40 transition-all hover:-translate-y-0.5">
                                <i className="fas fa-check mr-2"></i> Mark Learned
                            </button>
                        </div>
                    </div>
                </div>

                {/* Global Notification Toast */}
                <div id="notification" className="hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[200] px-6 py-3 rounded-full bg-slate-800 border border-white/10 text-white shadow-2xl flex items-center gap-3 animate__animated animate__fadeInUp">
                    <i className="fas fa-info-circle text-indigo-400"></i>
                    <span className="text-sm font-medium">Notification message</span>
                </div>

            </div>
        </>
    )
}
