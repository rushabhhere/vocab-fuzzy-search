import type { FC } from 'react';

interface Definition {
  part_of_speech: string;
  definition: string;
  sentence: string;
  synonyms: string[];
}

interface WordData {
  key: number;
  word: string;
  definitions: Definition[];
}

interface Props {
  data: WordData;
}

const Card: FC<Props> = ({ data }) => {
  return (
    <article className="p-8 border-2 border-black rounded-md shadow-md w-full">
      <h3 className="font-semibold text-xl">{data.word}</h3>
      <div>
        {data.definitions.map((def, index) => (
          <>
            <div key={index} className="mt-4">
              <p className="font-semibold">{def.part_of_speech}:</p>
              <p className="mt-2 text-lg">{def.definition}</p>
              <p
                className="mt-3 text-lg italic"
                dangerouslySetInnerHTML={{ __html: def.sentence }}
              ></p>
              <div className="mt-4">
                <span className="font-semibold text-gray-600">Synonyms:</span>
                {def.synonyms.length === 0 && (
                  <p className="text-lg mt-2">No good synonyms.</p>
                )}
                {def.synonyms.length > 0 && (
                  <ul className="list-disc pl-5 mt-2 text-lg">
                    {def.synonyms.map((synonym, index) => (
                      <li key={index}>{synonym}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {index !== data.definitions.length - 1 && <hr className="my-6" />}
          </>
        ))}
      </div>
    </article>
  );
};

export default Card;