const {describe, it, before, beforeEach, afterEach} = require("mocha");
const {expect} = require("chai")
const CarService = require("../../src/service/carService");
const {join} = require("path");
const carsDataBase = join(__dirname, "./../../database","cars.json");
const sinon = require("sinon");


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

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("Should retrieve a random position from Array", async () => {
        const data = [0,1,2,3,4];
        const result = await carService.getRandomPositionOfArray(data);

        expect(result).to.be.lte(data.length).and.to.be.gte(0);
    })

    it("should choose the first id from carIds in carCategory", () => {
        const carCategory = mocks.validCarCategory;
        const carIndex = 0;

        sandbox.stub(
            carService,
            carService.getRandomPositionOfArray.name
        ).returns(carIndex);

        const result = carService.chooseRandomCar(carCategory);
        const expected = carCategory.carIds[carIndex];

        expect(carService.getRandomPositionOfArray.calledOnce);
        expect(result).to.be.equal(expected);

    })

    it("Given a carCategory should return a available car", async () => {
        const result = await carService.getAvailableCar();
    })
})