import { useState } from 'react';
import vocabData from './assets/vocab-data.json';
import Card from './components/Card';
import Fuse from 'fuse.js';

function App() {
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(
    parseInt(localStorage.getItem('limit') || '3')
  );
  const fuse = new Fuse(vocabData, {
    keys: [
      'word',
      'definitions.definition',
      'definitions.sentence',
      'defnitions.synonyms',
    ],
    ignoreLocation: true,
  });

  const results = fuse.search(search, { limit });

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(e.target.value));

    localStorage.setItem('limit', e.target.value);
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
          onChange={e => setSearch(e.target.value)}
          className="inline-block w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
        />
        <div className="mb-8">
          <label htmlFor="limit" className="mr-3">
            Max Results:
          </label>
          <input
            className="inline-block p-2 border border-gray-300 rounded-md"
            type="number"
            id="limit"
            min="1"
            max="10"
            value={limit}
            onChange={handleLimitChange}
          />
        </div>
        <section className="max-w-full space-y-5">
          {results.map(result => (
            <Card key={result.item.key} data={result.item} />
          ))}
        </section>
      </div>
    </main>
  );
}

export default App;
