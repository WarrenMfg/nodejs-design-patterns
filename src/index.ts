/**
 * Singleton
 */
// import Singleton from './core/Singleton';

// const instance = new Singleton();
// instance.run();

/**
 * Factory
 */
// import IPhoneFactory from './core/Factory';

// const iPhone = IPhoneFactory.create('14 Max', '123');
// console.log(iPhone.screenWidth);

/**
 * Builder
 */
// import PizzaBuilder from './core/Builder';

// const pizza = new PizzaBuilder()
//   .setDough('New York')
//   .setSauce('Chunky')
//   .setCheese('Goat')
//   .setToppings(['Figs', 'Basil'])
//   .build();
// pizza.bake();

/**
 * Dependency Injection
 */
// // check `activity.log` file
// import myBankAccount from './moduleDesign/DependencyInjection';

// myBankAccount.deposit(1000).withdraw(450).checkBalance();

/**
 * Proxy
 */
// import reactive from './structural/Proxy';

// console.log(reactive);
// reactive.power = 70;
// reactive.year = 2022;

/**
 * Adapter
 */
// import { Consumer, OldDog, NewDogAdapter } from './structural/Adapter';

// // const consumer = new Consumer(new OldDog());
// const consumer = new Consumer(new NewDogAdapter());
// consumer.dayInTheLife();

/**
 * Decorator
 */
// import { decoratedGetTodo, getTodo, Todos } from './structural/Decorator';
// // functional
// const fetchTodo = decoratedGetTodo(getTodo);
// fetchTodo(1).then(console.log);
// fetchTodo(2).then(console.log);

// // class
// const todos = new Todos();
// todos.get(5).then(console.log);
// todos.get(3).then(console.log);

/**
 * Composite
 */
// import { MobilePhone, Laptop, Catalog } from './structural/Composite';
// // mobile phones
// const iPhoneX = new MobilePhone('iPhone 10X', 'Black', 799);
// const iPhone14 = new MobilePhone('iPhone 14', 'Green', 1200);

// // mobile phones catalog
// const phones = new Catalog('Mobile Phones');
// phones.add(iPhoneX).add(iPhone14);

// // Laptops
// const mbp = new Laptop('MacBook', 'MacBook Pro 16"', 4000);
// const iMac = new Laptop('iMac', 'iMac 27"', 1400);

// // laptops catalog
// const laptops = new Catalog('Laptops');
// laptops.add(mbp).add(iMac);

// // catalog of catalogs
// const catalogs = new Catalog('Catalogs');
// catalogs.add(phones).add(laptops);

// console.log(catalogs.getDetails());

/**
 * Strategy
 */
// import { Payment, Chase, Citi } from './behavioral/Strategy';

// const payment = new Payment();
// payment.pay(new Chase(200, 'Checking'));
// payment.refund(new Citi(200, 'Savings'));

/**
 * Command
 */
// import Invoker, { Post } from './behavioral/Command';

// Invoker.execute(new Post('My First Post', 'Wowwie!'));
// Invoker.execute(new Post('My Second Post', 'Yippie!'));
// Invoker.undo();
// Invoker.undo();

/**
 * Observers
 */
// import { User, Topic } from './behavioral/Observer';

// const user1 = new User();
// const user2 = new User();

// const node = new Topic('Node.js');
// const react = new Topic('React.js');

// node.subscribe(user1).subscribe(user2).subscribe(user1);
// react.subscribe(user2);

// node.addMessage('A new version is out!');
// react.addMessage('Custom hooks are great!');

// user1.getMessages();
// setTimeout(() => user2.getMessages(), 2000);

/**
 * Middleware
 */
// import { Maths, Middleware } from './behavioral/Middleware';

// const maths = new Maths();
// const app = new Middleware(maths);

// app.use((req, next) => {
//   req.a = req.a * 2;
//   next();
// });

// app.use((req, next) => {
//   req.b = req.b / 2;
//   next();
// });

// const result = maths.add({ a: 2, b: 6 });
// console.log(result);

/**
 * Template
 */
// import { Chase } from './behavioral/Template';

// const account = 'Checking';
// const chase = new Chase(account, 5000);
// chase.deposit(account, 5000);
// chase.viewAccount(account);

/**
 * Request - Reply
 */
// import { Server, Client } from './messaging/RequestReply';

// const wsURI = 'ws://localhost:3000';
// const port = 3000;

// new Server(port);

// const client = new Client(wsURI);

// client.send('This is my first message!', (message: string) =>
//   console.log(`MSG1: ${message}`)
// );
// client.send('Websockets go!', (message: string) =>
//   console.log(`MSG2: ${message}`)
// );

// setTimeout(() => {
//   client.send('Does this work?', (message: string) => {
//     console.log(`MSG3: ${message}`);
//   });
// }, 2000);

/**
 * Pubisher - Subscriber
 */
// import PubSub, { Data } from './messaging/PublisherSubscriber';

// const pubSub = new PubSub();
// const topic1 = 'Music';
// const topic2 = 'Sports';

// const shout = (data: Data) => console.log(data.message.toUpperCase());
// const removeShout = pubSub.subscribe(topic1, shout);

// const announceScore = (data: Data) =>
//   console.log(`The score is: ${data.message}`);
// const removeAnnounceScore = pubSub.subscribe(topic2, announceScore);

// const whisper = (data: Data) => console.log(data.message.toLowerCase());
// const removeWhisper = pubSub.subscribe(topic1, whisper);

// pubSub.publish(topic1, { message: 'Rock and roll!' });
// pubSub.publish(topic2, { message: '5:1' });

// removeShout();

// pubSub.publish(topic1, { message: 'Party time!' });
// pubSub.publish(topic2, { message: '10:15' });
