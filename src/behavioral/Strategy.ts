/**
 * Define a family of algorithms, encapsulate each one, and make them interchangeable.
 * Strategy lets the algorithm vary independently from clients that use it.
 */
// Example: a payment gateway system that allows you to accept and refund payments using multiple banking systems

// context
export class Payment {
  pay(processor: Bank) {
    return processor.pay();
  }
  refund(processor: Bank) {
    return processor.refund();
  }
}

class Processor {
  constructor(
    protected name: string,
    protected amount: number,
    protected account: string
  ) {}

  processPayment() {
    console.log(
      `Your payment of ${this.amount} for ${this.name} ${this.account} has been processed.`
    );
  }
  processRefund() {
    console.log(
      `Your refund of ${this.amount} for ${this.name} ${this.account} has been processed.`
    );
  }
}

class Bank extends Processor {
  constructor(
    protected name: string,
    protected amount: number,
    protected account: string
  ) {
    super(name, amount, account);
  }

  pay() {
    return this.processPayment();
  }
  refund() {
    return this.processRefund();
  }
}

// strategies
export class Chase extends Bank {
  constructor(protected amount: number, protected account: string) {
    super('Chase', amount, account);
  }
}

export class Citi extends Bank {
  constructor(protected amount: number, protected account: string) {
    super('Citi', amount, account);
  }
}
