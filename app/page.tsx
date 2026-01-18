"use client";

import Image from "next/image";
import "./styles/globals.css";
import "./styles/style_1.css";
// import "./styles/style_2.css";
import "./styles/style_3.css";
import "./styles/style_main.css";

export default function Home(): JSX.Element {
    return (
        <div className="main">
            <nav className="bg-gray-800 border-b border-gray-700 theme-transition">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold text-indigo-400">
                                    <i className="fas fa-language mr-2"></i>WordFlow
                                </h1>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <a
                                    href="#"
                                    className="border-indigo-500 text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    onClick={(e) => { e.preventDefault(); (window as any).showTable?.(); }}>
                                    <i className="fas fa-table mr-2"></i>Table words
                                </a>
                                <a
                                    href="#"
                                    className="border-transparent text-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    onClick={(e) => { e.preventDefault(); (window as any).showFavorites?.(); }}>
                                    <i className="fas fa-star mr-2"></i>Favorites
                                </a>
                                <a
                                    href="#"
                                    className="border-transparent text-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    onClick={(e) => { e.preventDefault(); (window as any).showDoneList?.(); }}>
                                    <i className="fas fa-star mr-2"></i>Done Word
                                </a>
                                <a
                                    href="#"
                                    className="border-transparent text-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    onClick={(e) => { e.preventDefault(); (window as any).showFlashcards?.(); }}>
                                    <i className="fas fa-cards mr-2"></i>Flashcards
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                id="themeToggle"
                                style={{ padding: '0.5rem', borderRadius: 9999, background: 'none', border: 'none', cursor: 'pointer' }}
                                onClick={() => (window as any).toggleTheme?.()}>
                                <i id="themeIcon" className="fas fa-moon" style={{ color: '#CBD5E1', fontSize: '1.25rem' }}></i>
                            </button>


                            <div className="relative">
                                <button onClick={() => (window as any).toggleImportExportMenu?.()} className="p-2 rounded-full hover:bg-gray-700">
                                    <i className="fas fa-file-import text-gray-300 hover:text-white"></i>
                                </button>
                                <div id="importExportMenu" className="hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5">
                                    <div className="py-1">
                                        <a
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); (window as any).exportWords?.(); }}
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">
                                            <i className="fas fa-file-export mr-2"></i>Export Words
                                        </a>
                                        <label className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 cursor-pointer">
                                            <i className="fas fa-file-import mr-2"></i>Import Words
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept=".json,.csv"
                                                onChange={(e) => (window as any).importWords?.(e)}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => (window as any).showDailyChallenge?.()} className="p-2 rounded-full hover:bg-gray-700">
                                <i className="fas fa-trophy text-gray-300 hover:text-white"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                            <select id="categoryFilter"
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                <option value="">All Categories</option>
                                <option value="business">Business</option>
                                <option value="travel">Travel</option>
                                <option value="medical">Medical</option>
                                <option value="technology">Technology</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Language</label>
                            <select id="languageFilter"
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                <option value="">All Languages</option>
                                <option value="english<->arabic">English ↔ Arabic</option>
                                <option value="english<->french">English ↔ French</option>
                                <option value="english<->spanish">English ↔ Spanish</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Sort By</label>
                            <select id="sortFilter"
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="alphabetical">Alphabetical</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-6 relative">
                        <input
                            type="text"
                            id="searchInput"
                            placeholder="Search words..."
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pl-10"
                        />
                        <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                        <button onClick={() => (window as any).startVoiceRecognition?.()} className="absolute right-3 top-2 text-gray-400 hover:text-white">
                            <i className="fas fa-microphone"></i>
                        </button>
                    </div>

                    <div id="tablemain" className="bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-6 animate__animated animate__fadeIn">
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                done</th>


                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Word</th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Translation</th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Category</th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Language Pair</th>
                                            <th
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="wordsTableBody" className="divide-y divide-gray-700">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 mb-6 animate__animated animate__fadeIn">
                        <h3 className="text-lg font-medium mb-4">Your Progress</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-gray-700 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-indigo-400" id="totalWords">0</div>
                                <div className="text-sm text-gray-400">Total Words</div>
                            </div>
                            <div className="bg-gray-700 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-indigo-400" id="learningStreak">0</div>
                                <div className="text-sm text-gray-400">Day Streak</div>
                            </div>
                            <div className="bg-gray-700 rounded-lg p-4 text-center">
                                <div className="text-2xl font-bold text-indigo-400" id="masteredWords">0</div>
                                <div className="text-sm text-gray-400">Mastered Words</div>
                            </div>
                        </div>



                    </div>
                    {/* gameL */}
                    <div className="bg-gray-800 rounded-lg p-6 mb-6 animate__animated animate__fadeIn">
                        <h3 className="text-lg font-medium mb-4 text-white">Games & Challenges</h3>

                        {/* Navigation Buttons */}
                        <div className="flex flex-wrap gap-4 mb-6">
                            <button onClick={() => (window as any).showGame?.('wordMatch')} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Word Match</button>
                            <button onClick={() => (window as any).showGame?.('speedChallenge')} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Speed Challenge</button>
                            <button onClick={() => (window as any).showGame?.('memoryGame')} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">Memory Cards</button>
                            <button onClick={() => (window as any).showGame?.('dailyChallenge')} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">Daily Challenge</button>
                            {/* <!-- New Challenges --> */}
                            <button onClick={() => (window as any).showGame?.('wordQuizChallenge')} className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">Word Quiz</button>
                            <button onClick={() => (window as any).showGame?.('askTranslateChallenge')} className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition">Ask Translate</button>
                            <button onClick={() => (window as any).showGame?.('efmQuestions')} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">EFM Questions</button>
                        </div>

                        {/* Game Containers */}
                        <div id="gameContainers">
                            {/* Word Match Game */}
                            <div id="wordMatch" className="game-container hidden">
                                <h3 className="text-xl font-bold mb-4 text-white">Match Words with Translations</h3>
                                <div id="wordMatchContainer" className="grid grid-cols-2 gap-4" style={{ color: 'black' }}>
                                    {/* Populated via JS */}
                                </div>
                                <div className="mt-4">
                                    <p className="text-white">Score: <span id="wordMatchScore">0</span></p>
                                    <p className="text-white">Time: <span id="wordMatchTimer">60</span>s</p>
                                </div>
                            </div>

                            {/* Speed Challenge */}
                            <div id="speedChallenge" className="game-container hidden">
                                <h3 className="text-xl font-bold mb-4 text-white">Speed Translation Challenge</h3>
                                <div className="text-center">
                                    <div id="challengeWord" className="text-3xl mb-4 text-white">Ready?</div>
                                    <input type="text" id="challengeInput" className="w-64 p-2 border rounded" placeholder="Type translation here" />
                                    <div className="mt-4">
                                        <p className="text-white">Score: <span id="speedScore">0</span></p>
                                        <p className="text-white">Time: <span id="speedTimer">30</span>s</p>
                                    </div>
                                </div>
                            </div>

                            {/* Memory Game */}
                            <div id="memoryGame" className="game-container hidden">
                                <h3 className="text-xl font-bold mb-4 text-white">Memory Cards</h3>
                                <div id="memoryContainer" className="grid grid-cols-4 gap-4" style={{ color: 'black' }}>
                                    {/* Populated via JS */}
                                </div>
                                <div className="mt-4">
                                    <p className="text-white">Matches Found: <span id="memoryScore">0</span></p>
                                    <p className="text-white">Moves: <span id="memoryMoves">0</span></p>
                                </div>
                            </div>

                            {/* Daily Challenge */}
                            <div id="dailyChallenge" className="game-container hidden">
                                <h3 className="text-xl font-bold mb-4 text-white">Daily Challenge</h3>
                                <div className="bg-white p-6 rounded-lg shadow" style={{ color: 'black' }}>
                                    <h4 className="text-lg font-semibold mb-2">Today's Challenges:</h4>
                                    <div id="dailyChallengeList" className="space-y-4" style={{ color: 'black' }}>
                                        {/* Populated via JS */}
                                    </div>
                                    <div className="mt-4" style={{ color: 'black' }}>
                                        <p>Progress: <span id="challengeProgress">0</span>/5</p>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                            <div id="challengeProgressBar" className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '0%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* New: Word Quiz Challenge */}
                            <div id="wordQuizChallenge" className="game-container hidden">{/* Populated via JS */}</div>

                            {/* New: Ask Translate Challenge */}
                            <div id="askTranslateChallenge" className="game-container hidden">{/* Populated via JS */}</div>

                            {/* New: EFM Questions Challenge */}
                            <div id="efmQuestions" className="game-container hidden">{/* Populated via JS */}</div>
                        </div>

                        {/* Results Modal */}
                        <div id="gameResultsModal" className="fixed inset-0 bg-black bg-opacity-50 hidden">
                            <div className="bg-white p-6 rounded-lg w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <h3 className="text-xl font-bold mb-4">Game Results</h3>
                                <div id="gameResultsContent"></div>
                                <button onClick={() => (window as any).closeGameResults?.()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Close</button>
                            </div>
                        </div>
                    </div>

                    {/* gameL */}
                </div>
            </div>

            <button onClick={() => (window as any).newWord?.()} className="floating-action-button bg-indigo-500 hover:bg-indigo-500 text-white rounded-full p-0 shadow-lg" id="btnAddNewData">
                <i className="fa-solid fa-paper-plane"></i>
            </button>




            {/* <hr>
                <br> */}
            <button onClick={() => (window as any).showAddModal?.()} className="floating-action-button bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg">
                <i className="fas fa-plus text-xl"></i>
            </button>

            <div id="addWordModal" className="hidden fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full animate__animated animate__fadeIn">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-gray-800 animate__animated animate__slideInUp">
                    <div className="mt-3">
                        <h3 className="text-lg leading-6 font-medium text-gray-100">Add New Word</h3>
                        <form id="addWordForm" className="mt-4" onSubmit={(e) => { e.preventDefault(); (window as any).submitForm?.(e); }}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300">Word</label>
                                <div className="relative">
                                    <input type="text" name="word" id="word" className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                    <button type="button" onClick={() => (window as any).speakWord?.(null)} className="absolute right-2 top-3 text-gray-400 hover:text-white">
                                        <i className="fas fa-volume-up"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300">Translation</label>
                                <input type="text" name="translation" id="translation" className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300">Category</label>
                                <select name="category" required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="business">Business</option>
                                    <option value="travel">Travel</option>
                                    <option value="medical">Medical</option>
                                    <option value="technology">Technology</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300">Example Sentence</label>
                                <textarea name="example" rows={2} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300">Language Pair</label>
                                <select name="language" required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="arabic<->english"> Arabic ↔ English </option>
                                    <option value="english<->french">English ↔ French</option>
                                    <option value="english<->spanish">English ↔ Spanish</option>
                                </select>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button type="button" onClick={() => (window as any).hideAddModal?.()} className="mr-3 px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 focus:outline-none">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            <div id="flashcardModal" className="hidden fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-gray-800">
                    <div className="mt-3">
                        <h3 className="text-lg leading-6 font-medium text-gray-100 mb-4">Flashcard Practice</h3>
                        <div id="flashcard" className="bg-gray-700 p-6 rounded-lg text-center cursor-pointer min-h-[200px] flex items-center justify-center">
                            <div id="flashcardContent" className="text-xl"></div>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button onClick={() => (window as any).previousCard?.()} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                                <i className="fas fa-arrow-left mr-2"></i>Previous
                            </button>
                            <button onClick={() => (window as any).flipCard?.()} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                <i className="fas fa-sync-alt mr-2"></i>Flip
                            </button>
                            <button onClick={() => (window as any).nextCard?.()} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">Next<i className="fas fa-arrow-right ml-2"></i></button>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button onClick={() => (window as any).hideFlashcardModal?.()} className="text-gray-400 hover:text-white">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="dailyChallengeModal" className="hidden fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-gray-800">
                    <div className="mt-3">
                        <h3 className="text-lg leading-6 font-medium text-gray-100 mb-4">Daily Word Challenge</h3>
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <div id="dailyWord" className="text-2xl font-bold text-center mb-4"></div>
                            <div id="dailyDefinition" className="text-gray-300 mb-4"></div>
                            <div id="dailyExample" className="text-gray-400 italic"></div>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button onClick={() => (window as any).markLearned?.()} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"><i className="fas fa-check mr-2"></i>Mark as Learned</button>
                            <button onClick={() => (window as any).hideDailyChallengeModal?.()} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">Later</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="notification" className="hidden fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate__animated animate__fadeInUp"></div>
        </div>
    );
}
