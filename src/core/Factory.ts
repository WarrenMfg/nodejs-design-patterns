/**
 * Define an interface for creating an object, but let subclasses decide which class to instantiate
 */

export class Phone {
  config;

  constructor(
    public nomenclature: string,
    public serialNumber: string,
    public processor = 'A12 Bionic',
    public storageSize = '16GB',
    public screenWidth = 828,
    public screenHeight = 1792
  ) {
    this.config = {
      nomenclature,
      serialNumber,
      processor,
      storageSize,
      screenWidth,
      screenHeight,
    };
  }

  call(who: string) {
    console.log(`Calling ${who}`);
  }

  text(who: string, message: string) {
    console.log(`Texting ${who}: ${message}`);
  }

  displayConfig() {
    console.log(this.config);
  }
}

class IPhoneFactory {
  create(type: string, serialNumber: string) {
    switch (type) {
      case '10X':
        return new Phone(type, serialNumber);
      case '12 Pro':
        return new Phone(type, serialNumber, 'A12 Bionic Pro');
      case '14 Max':
        return new Phone(type, serialNumber, 'A14 Max', '32GB', 900, 1800);
      default:
        throw new Error('No such type');
    }
  }
}

export default new IPhoneFactory();
