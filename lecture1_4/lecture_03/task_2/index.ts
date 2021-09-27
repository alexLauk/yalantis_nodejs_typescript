type Event = Record<string, any>;
type EventKey<T extends Event> = string & keyof T;
type EventHandler<T> = (handler?: T) => void;

export default class MyEventEmitter<T extends Event> {
  private events: Event;
  
  constructor(){
    this.events = {}
  }

  public addHandler<K extends EventKey<T>>(eventName: K, handler: EventHandler<T[K]>): void {
    if (typeof handler !== "function") {
      throw new Error("Listener must be a function!");
    }
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(handler);
  };

  public emitEvent<K extends EventKey<T>>(eventName: K): void {
    if (this.events[eventName]) {
        this.events[eventName].forEach((handler: EventHandler<T>) => handler() )
    }
  }
}

const myEventEmitter = new MyEventEmitter();

myEventEmitter.addHandler('userUpdated', () => console.log('User was updated'));
myEventEmitter.addHandler('userUpdated', () => console.log('User was not updated'));
myEventEmitter.addHandler('userDelete', () => console.log('User was deleted'));

myEventEmitter.emitEvent('userDelete');
myEventEmitter.emitEvent('userUpdated'); // User was updated
