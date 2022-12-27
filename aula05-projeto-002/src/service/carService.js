const BaseRepository = require("../repository/base/baseRepository");

class CarService {
    constructor({cars}) {
        this.carRepository = new BaseRepository({file: cars});
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
}

module.exports = CarService;