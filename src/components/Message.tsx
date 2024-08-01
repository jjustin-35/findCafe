import React from 'react';

export const Message = ({
  err
}: any) => {
  if (err) {
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="bg-danger mt-0-5 rounded-2">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <p className="text-red p-1 mb-0">{err}</p>
      </div>
    );
  }

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <div></div>;
};
