const BaseRepository = require("../repository/base/baseRepository");

class CarService {
    constructor({cars}) {
        this.carRepository = new BaseRepository({file: cars});
    }

    getRandomPositionOfArray(array) {
        const arrayLenght  = array.length;
        return Math.floor(Math.random() * (arrayLenght));
    }

    async getAvailableCar(id) {
        return this.carRepository.find(id);
    }
}

module.exports = CarService;