import React from 'react';

export const Stars = ({
  cafe
}: any) => {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <ul className="d-flex list-unstyled">
      {(() => {
        const starArray = [];
        const fill = Math.round(cafe.stars);
        const empty = 5 - fill;
        for (let i = 0; i < fill; i++) {
          const starsFill = (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <li key={`${cafe._id} ${i}fillstar`}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <i className="bi bi-star-fill fs-1-25 lh-1 text-yellow"></i>
            </li>
          );
          starArray.push(starsFill);
        }
        for (let i = 0; i < empty; i++) {
          const starEmpty = (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <li key={`${cafe._id} ${i}emptystar`}>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <i className="bi bi-star fs-1-25 lh-1 text-gray-500"></i>
            </li>
          );
          starArray.push(starEmpty);
        }
        return starArray;
      })()}
    </ul>
  );
};
