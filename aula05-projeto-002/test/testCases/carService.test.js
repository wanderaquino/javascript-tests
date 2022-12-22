const {describe, it, before} = require("mocha");
const {expect} = require("chai")
const CarService = require("../../src/service/carService");
const {join} = require("path");
const carsDataBase = join(__dirname, "./../../database","cars.json");

const mocks = {
    validCarCategory: require(join(__dirname, "../mocks/valid-carCategory.json")),
    validCustomer: require(join(__dirname, "../mocks/valid-customer.json")),
    validCar: require(join(__dirname, "../mocks/valid-car.json"))
}

describe("CarService Test", () => {
    let carService = {};
    before(() => {
        carService = new CarService({
            cars: carsDataBase
        });
    });

    it("Should retrieve a random position from Array", async () => {
        const data = [0,1,2,3,4];
        const result = await carService.getRandomPositionOfArray(data);

        expect(result).to.be.lte(data.length).and.to.be.gte(0);
    })

    it("Given a carCategory should return a available car", async () => {
        const result = await carService.getAvailableCar();
    })
})