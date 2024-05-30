export const STATUS = {
  FINISH: 'finish',
  PAUSE: 'pause',
  GO_ON: 'goOn',
  RENDERING: 'rendering',
  AUTO_FINISH: 'autoFinish'
}
export class FadeText {
  time = 200
  text = ''
  container: Element | null = null
  currentIndex = 0
  timer: ReturnType<typeof setTimeout> | null = null
  trigger = function (status: any) {}

  constructor(options: {
    time?: number; // 打印速度
    trigger?: (status: any) => void;
  }) {
    const { time = 200, trigger = function(status: any) {}} = options || {};

    this.time = time;
    this.trigger = trigger;
  }
  public render(params: {
    text: string; // 文本信息
    container: Element | null; // 文字渲染容器 
  }) {
    const { text, container } = params || {};
    if (!container || !container.nodeType) {
      console.error('The parameter [container] should be a DOM element.')
      return;
    }
    if (!text) {
      console.warn('The parameter [text] should not be ""');
      return;
    }

    this.container = container;
    this.text = text;
    this.fadeText();
  }
  private fadeText() {
    this.currentIndex++;
    this.timer && clearTimeout(this.timer);
    this.container && (this.container.innerHTML = this.text.substr(0, this.currentIndex));
    this.trigger(STATUS.RENDERING);

    if (this.currentIndex > this.text.length - 1) {
      console.log('fade finish: ');
      this.trigger(STATUS.AUTO_FINISH);
      return;
    }
    this.timer = setTimeout(this.fadeText.bind(this), this.time);
  }
  // 暂停文本渲染
  public onPause() {
    this.timer && clearTimeout(this.timer);
    this.timer = null;
    this.trigger(STATUS.PAUSE);
  }
  // 继续文本渲染
  public onGoOn() {
    this.currentIndex--;
    this.fadeText();
    this.trigger(STATUS.GO_ON);
  }
  // 直接渲染全部文本, isRenderFinish: 是否已完成文本信息展示
  public onFinish(isRenderFinish: boolean) {
    this.timer && clearTimeout(this.timer);

    // 未完成文本渲染时，手动出发完成，一次性渲染全部文本
    if (this.container && !isRenderFinish) {
      this.container.innerHTML = this.text.substr(0, this.text.length - 1);
    }
    this.trigger(STATUS.FINISH);
  }
}
