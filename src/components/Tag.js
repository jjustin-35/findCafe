import React from 'react'

export const Tag = ({ cafe, className }) => {
    let tags = [];
    const getTag = (obj) => {
        const { rank } = obj;
        let rankList = [];
        for (let i in rank) {
            rankList.push({ name: i, rank: rank[i] })
        }

        rankList.sort((a, b) => {
            return b.rank - a.rank
        })
        rankList = rankList.slice(0, 3);
        rankList = rankList.map((element) => {
            element = element.name;

            const chinese = ['有wifi', '座位多', '環境安靜', '餐點好吃', '東西便宜', '音樂好聽'];
            
            ['wifi', 'seat', 'quiet', 'tasty', 'cheap', 'music'].forEach((tag, i) => {
                if (element === tag) {
                    element = chinese[i];
                }
            })
            return element;
        });

        return rankList;
    }

    if (!cafe.tags) {
        tags = getTag(cafe);
    } else {
        tags = cafe.tags
    }
    
  return (
    <ul className={'d-flex list-unstyled ' + className}>{tags.map((tag, i) => <li className={' badge text-black rounded-pill fw-normal me-0-25 bg-gray-light px-0-75 py-0-25'} key={tag + i}>{ tag }</li>)}</ul>
  )
}
