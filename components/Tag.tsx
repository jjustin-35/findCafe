import React from 'react';

interface Cafe {
  tags?: string[];
  rank?: Record<string, number>;
}

interface TagProps {
  cafe: Cafe;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ cafe, className = '' }) => {
  const getTag = (cafe: Cafe): string[] => {
    const { rank } = cafe;
    if (!rank) return [];

    let rankList = Object.entries(rank)
      .map(([name, value]) => ({ name, rank: value }))
      .sort((a, b) => b.rank - a.rank)
      .slice(0, 3)
      .map(element => {
        const chinese = ['有wifi', '座位多', '環境安靜', '餐點好吃', '東西便宜', '音樂好聽'];
        const english = ['wifi', 'seat', 'quiet', 'tasty', 'cheap', 'music'];
        const index = english.indexOf(element.name);
        return index !== -1 ? chinese[index] : element.name;
      });

    return rankList;
  };

  const tags = cafe.tags || getTag(cafe);

  return (
    <ul className={`d-flex list-unstyled ${className}`}>
      {tags.map((tag, i) => (
        <li className="badge text-black rounded-pill fw-normal me-0-25 bg-gray-light px-0-75 py-0-25" key={`${tag}-${i}`}>
          {tag}
        </li>
      ))}
    </ul>
  );
};
