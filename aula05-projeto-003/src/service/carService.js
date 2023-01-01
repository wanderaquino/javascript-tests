const BaseRepository = require("../repository/base/baseRepository");
const Tax = require("../entities/tax");
const Transaction = require("../entities/transaction");
class CarService {
    constructor({cars}) {
        this.carRepository = new BaseRepository({file: cars});
        this.taxByAge = Tax.taxByAge;
        this.currencyFormat = new Intl.NumberFormat("pt-br",{
            style: "currency",
            currency: "BRL"
        });
    }

    getRandomPositionOfArray(array) {
        const arrayLenght  = array.length;
        return Math.floor(Math.random() * (arrayLenght));
    }

    async getAvailableCar(categoryId) {
        const carId = this.chooseRandomCar(categoryId);
        const car = await this.carRepository.find(carId);
        return car;
    }

    chooseRandomCar(carCategory) {
        const randomIndex = this.getRandomPositionOfArray(carCategory.carIds);
        const carId = carCategory.carIds[randomIndex];

        return carId;
    }

    calculateFinalPrice(customer, category, numberOfDays) {
        const {age} = customer;
        const {price} = category;
        const {tax} = this.taxByAge.find(tax => age >= tax.from && age <= tax.to);
        const finalPrice = ((tax * price) * numberOfDays);
        const formattedPrice = this.currencyFormat.format(finalPrice);
        
        return formattedPrice;
    };

    async rent(customer, category, numberOfDays) {
        const car = await this.getAvailableCar(category);
        const finalPrice = this.calculateFinalPrice(customer, category, numberOfDays);

        const today = new Date();
        today.setDate(today.getDate() + numberOfDays);
        const options = {year: "numeric", month: "long", day: "numeric"};
        const dueDate = today.toLocaleDateString("pt-br", options);

        const transaction = new Transaction ({
            customer,
            dueDate,
            car,
            amount: finalPrice
        });

        return transaction;
    }
}

module.exports = CarService;