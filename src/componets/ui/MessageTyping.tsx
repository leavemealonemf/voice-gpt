import {FC} from 'react';

const MessageTyping: FC = () => {
  return (
    <div className="flex gap-2 mt-3 ml-1">
        <div className="w-2 h-2 rounded-full animate-pulse bg-blue-600" />
        <div className="w-2 h-2 rounded-full animate-pulse bg-blue-600" />
        <div className="w-2 h-2 rounded-full animate-pulse bg-blue-600" />
    </div>
  )
}

export default MessageTyping