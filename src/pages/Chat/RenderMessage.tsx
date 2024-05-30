import { Message } from "App";
import React, { useEffect, useRef } from "react";
import { FadeText, STATUS } from "utils/fadeText1";

export default function RenderMessage(props: { message: Message; pushMessage: any }) {
  const { message, pushMessage } = props;
  const messageItemRef = useRef(null);
  const fadeText = useRef(new FadeText({
    time: 100,
    trigger(status) {
      console.log('triggerrrr: ', status);
      if (status === STATUS.AUTO_FINISH) {
        pushMessage?.();
      }
    }
  }));

  useEffect(() => {
    if (messageItemRef.current && message.text) {
      fadeText.current.render({ container: messageItemRef.current, text: message.text });
      setTimeout(() => {
        fadeText.current.onPause();
      }, 500);
      setTimeout(() => {
        fadeText.current.onGoOn();
      }, 1000);
    }
  }, [messageItemRef, message])

  return message.text ? <p className='message-item'>
    <span ref={messageItemRef}></span>
  </p> : null;
}
