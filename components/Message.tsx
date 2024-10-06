import React from 'react';

interface MessageProps {
  err?: string;
}

const Message: React.FC<MessageProps> = ({ err }) => {
  if (err) {
    return (
      <div className="bg-danger mt-0-5 rounded-2">
        <p className="text-red p-1 mb-0">{err}</p>
      </div>
    );
  }

  return null;
};

export default Message;
