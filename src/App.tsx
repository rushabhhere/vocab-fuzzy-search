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
  });

  const results = fuse.search(search, { limit });

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(e.target.value));

    localStorage.setItem('limit', e.target.value);
  };

  return (
    <main className="flex flex-col items-center mt-10 w-full mb-10">
      <h1 className="text-4xl font-semibold mb-10 mx-5">Vocab Fuzzy Search</h1>
      <div className="w-[750px] max-w-full px-5">
        <input
          type="text"
          placeholder="Search the vocab..."
          autoFocus
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="py-2 px-4 w-full inline-block border border-gray-300 rounded-md mb-2"
        />
        <div className="mb-8">
          <label htmlFor="limit" className="mr-3">
            Max Results:
          </label>
          <input
            className="p-2 border border-gray-300 rounded-md inline-block"
            type="number"
            id="limit"
            min="1"
            max="10"
            value={limit}
            onChange={handleLimitChange}
          />
        </div>
        <section className="space-y-5 max-w-full">
          {results.map(result => (
            <Card key={result.item.key} data={result.item} />
          ))}
        </section>
      </div>
    </main>
  );
}

export default App;
