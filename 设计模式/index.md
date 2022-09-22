<!--
 * @Descripttion:
 * @version:
 * @Author: congsir
 * @Date: 2022-07-31 17:09:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-18 16:00:28
-->
### 单例模式

意图：保证一个类仅有一个实例，并提供一个访问它的全局访问点。

主要解决：一个全局使用的类频繁地创建与销毁。

何时使用：当您想控制实例数目，节省系统资源的时候。

创建一个单一的类，该类负责创建自己的对象，同时确保只有单个对象被创建。这个类提供了一种访问其唯一的对象的方式，可以直接访问，不需要实例化该类的对象。

1、单例类只能有一个实例。
2、单例类必须自己创建自己的唯一实例。
3、单例类必须给所有其他对象提供这一实例。

```ts
class demo {
    static obj = new demo();

    demo() {
        this.name = 'a';
    }
    static getInstance() {
        return this.obj
    }
    say() {
        console.log('222',this.obj.name)
    }
}
const a = demo.getInstance()
a.say();
```

### 装饰器模式

装饰器模式允许向一个现有的对象添加新的功能，同时又不改变其结构。这种类型的设计模式属于结构型模式。

这种模式创建了一个装饰类，用来包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功能。

优点: 装饰类和被装饰类可以独立发展，不会相互耦合，装饰模式是继承的一个`替代模式`，装饰模式可以动态扩展一个实现类的功能。

缺点：多层装饰比较复杂。

使用场景： 1、扩展一个类的功能。 2、动态增加功能，动态撤销。

### 工厂模式

定义一个创建对象的接口，让其子类自己决定实例化哪一个工厂类，工厂模式使其创建过程延迟到子类进行。

让其子类实现工厂接口，返回的也是一个抽象的产品。

优点： 1、一个调用者想创建一个对象，只要知道其名称就可以了。 2、扩展性高，如果想增加一个产品，只要扩展一个工厂类就可以。 3、屏蔽产品的具体实现，调用者只关心产品的接口。

缺点：每次增加一个产品时，都需要增加一个具体类和对象实现工厂，使得系统中类的个数成倍增加，在一定程度上增加了系统的复杂度，同时也增加了系统具体类的依赖。

```ts
public interface Shape {
   void draw();
}

public class Rectangle implements Shape {

   @Override
   public void draw() {
      System.out.println("Inside Rectangle::draw() method.");
   }
}
public class Square implements Shape {

   @Override
   public void draw() {
      System.out.println("Inside Square::draw() method.");
   }
}
public class Circle implements Shape {

   @Override
   public void draw() {
      System.out.println("Inside Circle::draw() method.");
   }
}

public class ShapeFactory {

   //使用 getShape 方法获取形状类型的对象
   public Shape getShape(String shapeType){
      if(shapeType == null){
         return null;
      }
      if(shapeType.equalsIgnoreCase("CIRCLE")){
         return new Circle();
      } else if(shapeType.equalsIgnoreCase("RECTANGLE")){
         return new Rectangle();
      } else if(shapeType.equalsIgnoreCase("SQUARE")){
         return new Square();
      }
      return null;
   }
}
```

### 抽象工厂模式

抽象工厂模式是超级工厂创建其他工厂，超级工厂又称为其他工厂(不同产品族)的工厂，在一个工厂里聚合多个同类产品。

提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。

优点：当一个产品族中的多个对象被设计成一起工作时，它能保证客户端始终只使用同一个产品族中的对象。

缺点：产品族扩展非常困难，要增加一个系列的某一产品，既要在抽象的 Creator 里加代码，又要在具体的里面加代码。

```ts
public interface Shape {
   void draw();
}
步骤 2
创建实现接口的实体类。


public class Rectangle implements Shape {

   @Override
   public void draw() {
      System.out.println("Inside Rectangle::draw() method.");
   }
}
public class Square implements Shape {

   @Override
   public void draw() {
      System.out.println("Inside Square::draw() method.");
   }
}
public class Circle implements Shape {

   @Override
   public void draw() {
      System.out.println("Inside Circle::draw() method.");
   }
}

public interface Color {
   void fill();
}

public class Red implements Color {

   @Override
   public void fill() {
      System.out.println("Inside Red::fill() method.");
   }
}
public class Green implements Color {

   @Override
   public void fill() {
      System.out.println("Inside Green::fill() method.");
   }
}
public class Blue implements Color {

   @Override
   public void fill() {
      System.out.println("Inside Blue::fill() method.");
   }
}

public abstract class AbstractFactory {
   public abstract Color getColor(String color);
   public abstract Shape getShape(String shape);
}

public class ShapeFactory extends AbstractFactory {

   @Override
   public Shape getShape(String shapeType){
      if(shapeType == null){
         return null;
      }
      if(shapeType.equalsIgnoreCase("CIRCLE")){
         return new Circle();
      } else if(shapeType.equalsIgnoreCase("RECTANGLE")){
         return new Rectangle();
      } else if(shapeType.equalsIgnoreCase("SQUARE")){
         return new Square();
      }
      return null;
   }

   @Override
   public Color getColor(String color) {
      return null;
   }
}
ColorFactory.java
public class ColorFactory extends AbstractFactory {

   @Override
   public Shape getShape(String shapeType){
      return null;
   }

   @Override
   public Color getColor(String color) {
      if(color == null){
         return null;
      }
      if(color.equalsIgnoreCase("RED")){
         return new Red();
      } else if(color.equalsIgnoreCase("GREEN")){
         return new Green();
      } else if(color.equalsIgnoreCase("BLUE")){
         return new Blue();
      }
      return null;
   }
}

FactoryProducer.java
public class FactoryProducer {
   public static AbstractFactory getFactory(String choice){
      if(choice.equalsIgnoreCase("SHAPE")){
         return new ShapeFactory();
      } else if(choice.equalsIgnoreCase("COLOR")){
         return new ColorFactory();
      }
      return null;
   }
}
```

### 观察者模式

```ts
被观察者模式

class Subject {

  constructor() {
    this.observerList = [];
  }

  addObserver(observer) {
    this.observerList.push(observer);
  }

  removeObserver(observer) {
    const index = this.observerList.findIndex(o => o.name === observer.name);
    this.observerList.splice(index, 1);
  }

  notifyObservers(message) {
    const observers = this.observeList;
    observers.forEach(observer => observer.notified(message));
  }

}
观察者：

class Observer {

  constructor(name, subject) {
    this.name = name;
    if (subject) {
      subject.addObserver(this);
    }
  }

  notified(message) {
    console.log(this.name, 'got message', message);
  }
}
const subject = new Subject();
const observerA = new Observer('observerA', subject);
const observerB = new Observer('observerB');
subject.addObserver(observerB);
subject.notifyObservers('Hello from subject');
subject.removeObserver(observerA);
subject.notifyObservers('Hello again');
```

### 发布订阅模式

```ts
class PubSub {
    constructor() {
        this.messages = {};
        this.listeners = {};
    }
    // 添加发布者
    publish(type, content) {
        const existContent = this.messages[type];
        if (!existContent) {
            this.messages[type] = [];
        }
        this.messages[type].push(content);
    }
    // 添加订阅者
    subscribe(type, cb) {
        const existListener = this.listeners[type];
        if (!existListener) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(cb);
    }
    // 通知
    notify(type) {
        const messages = this.messages[type];
        const subscribers = this.listeners[type] || [];
        subscribers.forEach((cb, index) => cb(messages[index]));
    }
}
class Publisher {
    constructor(name, context) {
        this.name = name;
        this.context = context;
    }
    publish(type, content) {
        this.context.publish(type, content);
    }
}
class Subscriber {
    constructor(name, context) {
        this.name = name;
        this.context = context;
    }
    subscribe(type, cb) {
        this.context.subscribe(type, cb);
    }
}
const TYPE_A = 'music';
const TYPE_B = 'movie';
const TYPE_C = 'novel';

const pubsub = new PubSub();

const publisherA = new Publisher('publisherA', pubsub);
publisherA.publish(TYPE_A, 'we are young');
publisherA.publish(TYPE_B, 'the silicon valley');
const publisherB = new Publisher('publisherB', pubsub);
publisherB.publish(TYPE_A, 'stronger');
const publisherC = new Publisher('publisherC', pubsub);
publisherC.publish(TYPE_C, 'a brief history of time');

const subscriberA = new Subscriber('subscriberA', pubsub);
subscriberA.subscribe(TYPE_A, res => {
    console.log('subscriberA received', res)
});
subscriberA.subscribe(TYPE_A, res => {
    console.log('subscriberA received ！', res)
});
const subscriberB = new Subscriber('subscriberB', pubsub);
subscriberB.subscribe(TYPE_C, res => {
    console.log('subscriberB received', res)
});
const subscriberC = new Subscriber('subscriberC', pubsub);
subscriberC.subscribe(TYPE_B, res => {
    console.log('subscriberC received', res)
});

pubsub.notify(TYPE_A);
pubsub.notify(TYPE_B);
pubsub.notify(TYPE_C);
```

> 观察者模式和发布订阅模式区别

+ 在观察者模式中有观察者和被观察者subject，观察者是依赖Subject的，Subject对观察者进行通知更新，可以看在是关联的整体。但在发布订阅模式中有发布者，订阅者，发布订阅中心，发布者和订阅者不知道对方的存在。它们只能通过发布订阅中心进行通信。

+ 在发布订阅模式中，组件是松散耦合的，正好和观察者模式相反。

+ 观察者模式大多数时候是同步的，比如当事件触发，Subject就会去调用观察者的方法。而发布-订阅模式大多数时候是异步的（使用消息队列）
