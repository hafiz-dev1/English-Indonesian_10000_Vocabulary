import DateTimeDisplay from "./DateTimeDisplay";

interface HeaderProps {
  view: 'vocabulary' | 'favorites';
  setView: (view: 'vocabulary' | 'favorites') => void;
  setCurrentPage: (page: number) => void;
}

export default function Header({ view, setView, setCurrentPage }: HeaderProps) {
  return (
    <>
      <DateTimeDisplay />

      {/* Header */}
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent pb-2 font-samsung">
          English Vocabulary Booster <span style={{ WebkitTextFillColor: "initial", color: "initial", background: "transparent", display: "inline-block" }}>🚀</span>
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
          Master the English language with our curated collection of words. <br className="hidden md:block" />
          Explore, listen, and learn.
        </p>

        {/* Navigation Menu */}
        <div className="flex justify-center mt-8">
          <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            <button
              onClick={() => {
                setView('vocabulary');
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                view === 'vocabulary'
                  ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              Vocabulary
            </button>
            <button
              onClick={() => {
                setView('favorites');
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                view === 'favorites'
                  ? 'bg-white dark:bg-zinc-700 text-pink-600 dark:text-pink-400 shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              Favorites
            </button>
          </div>
        </div>

        <p className="text-zinc-400 dark:text-zinc-500 text-sm text-center mt-4">
          Tip: Double-click or hold down a word to toggle favorites
        </p>
      </div>
    </>
  );
}
