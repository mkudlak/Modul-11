

function Phone(brand, version, price, color) {
    this.brand = brand;
    this.version = version;
    this.price = price;
    this.color = color;
}

Phone.prototype.printInfo = function() {
    console.log("The phone brand is " + this.brand + " and the version is " + this.version + ", color is " + this.color + " and the price is " + this.price + ".");
}

var iPhoneX = new Phone("Apple", "X", 10000, "white");
var iPhone6S = new Phone("Apple", "6S",  2250, "silver");
var samsungGalaxyS6 = new Phone("Samsung", "GalaxyS6", 2000, "black");
var onePlusOne = new Phone("One Plus", "One", 1250, "gold");



iPhoneX.printInfo();
iPhone6S.printInfo();// przedstawimy w konsoli informacje na temat każdego utworzonego przed chwilą obiektu za pomocą metody printInfo.
samsungGalaxyS6.printInfo();
onePlusOne.printInfo();