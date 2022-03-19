//手写一个发布订阅
// 发布订阅中心, on-订阅, off取消订阅, emit发布, 内部需要一个单独事件中心caches进行存储;
interface CacheProps {
  [key: string]: Array<((data?: unknown) => void)>;
}
 
class Observer {
  private caches: CacheProps = {}; // 事件中心
  on (eventName: string, fn: (data?: unknown) => void){ // eventName事件名-独一无二, fn订阅后执行的自定义行为
    this.caches[eventName] = this.caches[eventName] || [];
    this.caches[eventName].push(fn);
  }
 
  emit (eventName: string, data?: unknown) { // 发布 => 将订阅的事件进行统一执行
    if (this.caches[eventName]) {
      this.caches[eventName].forEach((fn: (data?: unknown) => void) => fn(data));
    }
  }
 
  off (eventName: string, fn?: (data?: unknown) => void) { // 取消订阅 => 若fn不传, 直接取消该事件所有订阅信息
    if (this.caches[eventName]) {
      const newCaches = fn ? this.caches[eventName].filter(e => e !== fn) : [];
      this.caches[eventName] = newCaches;
    }
  }
 
}