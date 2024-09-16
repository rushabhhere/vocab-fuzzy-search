import { useState, useRef } from 'react';
import vocabData from './assets/vocab-data.json';
import Card from './components/Card';
import Fuse from 'fuse.js';
import NoRelevantResults from './components/NoRelevantResults';

function App() {
  const [search, setSearch] = useState('');
  const [showGroupNumbers, setShowGroupNumbers] = useState(true);
  const [limit, setLimit] = useState(
    parseInt(localStorage.getItem('limit') || '3')
  );

  const fuse = new Fuse(vocabData, {
    keys: [
      'word',
      'definitions.definition',
      'definitions.sentence',
      'definitions.synonyms',
    ],
    ignoreLocation: true,
    threshold: 0.2,
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  // click on '/' to focus on search input
  document.addEventListener('keydown', e => {
    if (e.key === '/') {
      e.preventDefault();
      searchInputRef.current?.focus();
    }
  });

  const results = fuse.search(search.trim(), { limit });

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (value < 1) {
      setLimit(1);
      localStorage.setItem('limit', '1');
    } else if (value > 20) {
      setLimit(20);
      localStorage.setItem('limit', '20');
    } else {
      setLimit(value);
      localStorage.setItem('limit', e.target.value);
    }
  };

  return (
    <main className="flex flex-col items-center w-full mt-16 mb-10">
      <div className="absolute top-3 right-5">
        <a
          className="text-sm text-blue-500 hover:underline"
          href="https://github.com/rushabhhere/vocab-fuzzy-search"
          target="_blank"
        >
          Source Code
        </a>
      </div>
      <h1 className="mx-5 mb-10 text-4xl font-semibold text-center">
        Vocab Fuzzy Search
      </h1>
      <div className="w-[750px] max-w-full px-5">
        <input
          type="text"
          placeholder="Search the vocab..."
          autoFocus
          value={search}
          ref={searchInputRef}
          onChange={e => setSearch(e.target.value)}
          className="inline-block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
        />

        {/* controls */}
        <div className="flex flex-col items-start gap-5 mb-8 md:flex-row md:items-center">
          <div>
            <label htmlFor="limit" className="mr-3">
              Max Results:
            </label>
            <input
              className="inline-block p-2 border border-gray-300 rounded-md"
              type="number"
              id="limit"
              min="1"
              max="20"
              value={limit}
              onChange={handleLimitChange}
            />
          </div>
          <div>
            <label htmlFor="group-numbers" className="mr-3">
              Group Numbers:
            </label>
            <input
              type="checkbox"
              id="group-numbers"
              checked={showGroupNumbers}
              onChange={() => setShowGroupNumbers(p => !p)}
            />
          </div>
        </div>

        <section className="max-w-full space-y-5">
          {search.trim().length !== 0 && results.length === 0 ? (
            <NoRelevantResults />
          ) : (
            results.map(result => (
              <Card
                key={result.item.key}
                data={result.item}
                showGroupNumbers={showGroupNumbers}
              />
            ))
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
