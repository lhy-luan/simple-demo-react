
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.less';
import RenderMessage from 'pages/Chat/RenderMessage';

export interface Message {
  from: 'user' | 'icbc';
  text?: string;
  type: 'text' | 'newGuideTask';
}

const newUserMessages:Message[] = [{
  from: 'icbc',
  text: '您好，我是您的专属智能向导。',
  type: 'text'
}, {
  from: 'icbc',
  text: '欢迎使用工行手机银行，我将陪您解锁新客任务，赢取新客奖励。',
  type: 'text'
  }, {
  from: 'icbc',
  type: 'newGuideTask'
}];
const oldUserMessages: Message[] = [{
  from: 'icbc',
  text: '欢迎回来，我们来继续完成新客之旅吧！',
  type: 'text'
}]
let hasInit = false;
function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const onSendMessage = () => {
    const text = '233333333';
    setMessages(preVal => [...preVal, {
      from: 'user',
      text: text,
      type: 'text'
    }]);
  }
  // 推送固定前置引导语
  const pushInitMessage = useCallback(() => {
    // TODO, 判断是否是新用户
    const message = newUserMessages.shift();
    message && setMessages(preVal => [...preVal, message]);
  }, [setMessages]);

  const renderTask = {
    text: (item: Message) => {
      return item.from === 'user' ? <p className='message-item message-item-user'>
        <span>{item.text}</span>
      </p> : <RenderMessage message={item} pushMessage={pushInitMessage} />;
    },
    newGuideTask: () => {
      return <div className='message-item'>TODO，渲染新任务....</div>;
    }
  }

  useEffect(() => {
    if (!hasInit) {
      hasInit = true;
      pushInitMessage();
    }
  }, [])

  return (
    <div className="App">
      <header className='header'>{'< 新客引导'}</header>
      <section className='content'>
        {messages.map(item => {
          const task = renderTask[item.type];
          return task ? task(item) : <></>;
        })}
      </section>
      <div className='footer'>
        <input placeholder='内容输入区域，待开发...' />
        <button onClick={onSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
