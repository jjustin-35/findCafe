import React from 'react'

export const Stars = ({cafe}) => {
  return (
    <ul className="d-flex list-unstyled">
        {(() => {
            const starArray = [];
            const fill = Math.round(cafe.stars);
            const empty = 5 - fill;
            for (let i = 0; i < fill; i++){
                const starsFill = <li key={`${cafe._id} ${i}fillstar`}><i className="bi bi-star-fill fs-1-5 text-yellow"></i></li>
                starArray.push(starsFill);
            };
            for (let i = 0; i < empty; i++){
                const starEmpty = <li key={`${cafe._id} ${i}emptystar`}><i className="bi bi-star fs-1-5 text-gray-500"></i></li>
                starArray.push(starEmpty);
            }
            return starArray;
        })()}
    </ul>
  )
}
