import type { FC } from 'react';
import React from 'react';

interface Definition {
  part_of_speech: string;
  definition: string;
  sentence: string;
  synonyms: string[];
}

interface WordData {
  key: number;
  group: number;
  word: string;
  definitions: Definition[];
}

interface Props {
  data: WordData;
  showGroupNumbers: boolean;
}

const Card: FC<Props> = ({ data, showGroupNumbers }) => {
  return (
    <article className="relative w-full p-8 overflow-hidden border-2 border-black rounded-md shadow-md dark:shadow-gray-800 dark:border-white">
      <h3 className="text-xl font-semibold">{data.word}</h3>
      <div
        className={
          'absolute top-0 right-0 px-3 py-1.5 bg-gray-300 dark:bg-gray-500 rounded-bl-md' +
          (showGroupNumbers ? '' : ' hidden')
        }
      >
        Group {data.group}
      </div>
      <div>
        {data.definitions.map((def, index) => (
          <React.Fragment key={`${data.key}-${index}`}>
            <div key={index} className="mt-4">
              <p className="font-semibold">{def.part_of_speech}:</p>
              <p className="mt-2 text-lg">{def.definition}</p>
              <p
                className="mt-3 text-lg italic"
                dangerouslySetInnerHTML={{ __html: def.sentence }}
              ></p>
              <div className="mt-4">
                <span className="font-semibold text-gray-600 dark:text-gray-300">
                  Synonyms:
                </span>
                {def.synonyms.length === 0 && (
                  <p className="mt-2 text-lg">No good synonyms.</p>
                )}
                {def.synonyms.length > 0 && (
                  <ul className="pl-5 mt-2 text-lg list-disc">
                    {def.synonyms.map((synonym, index) => (
                      <li key={index}>{synonym}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {index !== data.definitions.length - 1 && <hr className="my-6" />}
          </React.Fragment>
        ))}
      </div>
    </article>
  );
};

export default Card;
