/**
 * Convert the interface of a class into another interface clients expect
 */

export class OldDog {
  bark() {
    console.log('Woof');
  }

  walk() {
    console.log('Pitter patter');
  }

  run() {
    console.log('Pant, pant, pant');
  }

  eat() {
    console.log('Nom, nom, nom');
  }
}

class NewDog {
  makeSound(sound: string) {
    let theSound = '';
    switch (sound) {
      case 'bark':
        theSound = 'Bow wow wow';
        break;
      case 'eat':
        theSound = 'Chomp, chomp, chomp';
        break;
      default:
        theSound = 'Zzz';
    }

    console.log(theSound);
  }

  move(type: string) {
    let theType = '';
    switch (type) {
      case 'walk':
        theType = 'Pit pat pit pat';
        break;
      case 'run':
        theType = 'Gallup, gallup, gallup';
        break;
      default:
        theType = 'Zzz';
    }

    console.log(theType);
  }
}

export class NewDogAdapter {
  private newDog = new NewDog();

  bark() {
    this.newDog.makeSound('bark');
  }

  walk() {
    this.newDog.move('walk');
  }

  run() {
    this.newDog.move('run');
  }

  eat() {
    this.newDog.makeSound('eat');
  }
}

export class Consumer {
  constructor(private dog: OldDog) {}

  dayInTheLife() {
    this.dog.bark();
    this.dog.walk();
    this.dog.run();
    this.dog.eat();
  }
}
