export function fadeText(options: {
  container: Element; // 文字渲染容器
  time?: number; // 打印速度
  text: string; // 文本信息
  fn?: any; // 状态处理，暂停动画、结束、继续动画等
}) {
  const { time = 200, text = '', fn = function () { }, container } = options || {};
  if (!container || !container.nodeType) {
    console.error('The parameter [container] should be a DOM element.')
    return;
  }

  let index = 0;
  const length = text.length;
  let timer:any = null;

  const fadeText = function () {
    index++;
    clearTimeout(timer);
    container.innerHTML = text.substr(0, index)
    console.log(text.substr(0, index));

    if (index > length - 1) {
      return;
    }
    timer = setTimeout(fadeText, time)
  }
  const stopFadeText = function () {
    clearTimeout(timer);
    timer = null;
  }
  const goOn = function () {
    if (timer === null) {
      index--;
      fadeText();
    }
  }
  const end = function () {
    clearTimeout(timer);
    container.innerHTML = text.substr(0, length - 1)
  }

  fadeText();
  fn(stopFadeText, goOn, end);
}
