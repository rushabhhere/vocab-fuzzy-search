import type { FC } from 'react';

const NoRelevantResults: FC = () => {
  return (
    <div className="flex flex-col items-center gap-5 p-8 text-gray-600">
      <h4 className="text-2xl text-center">
        Your search <i>yielded</i> no <i>apropos</i> results
      </h4>
      <img className="w-[300px]" src="/images/crickets.webp" alt="*crickets*" />
    </div>
  );
};

export default NoRelevantResults;
