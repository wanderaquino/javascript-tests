const {describe, it, before, beforeEach, afterEach} = require("mocha");
const {expect} = require("chai")
const CarService = require("../../src/service/carService");
const {join} = require("path");
const carsDataBase = join(__dirname, "./../../database","cars.json");
const sinon = require("sinon");
const Transaction = require("../../src/entities/transaction");

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
        const car = mocks.validCar;
        const carCategory = Object.create(mocks.validCarCategory);
        carCategory.carIds = [car.id];

        sandbox.stub(carService.carRepository, carService.carRepository.find.name).resolves(car);
        const expected = car;
        const result = await carService.getAvailableCar(carCategory);


        expect(result).to.be.deep.equal(expected);
    })

    it("Given a car categrory, customer and number of days, it should return final amount in BRL", async () => {
        const customer = Object.create(mocks.validCustomer);
        const carCategory = Object.create(mocks.validCarCategory);
        const numberOfDays = 5;

        customer.age = 50;
        carCategory.price = 37.6;

        sandbox.stub(carService, "taxByAge").get(() => {
            return [{from: 40, to: 51, tax: 1.3}]
        })

        const expected = carService.currencyFormat.format("244.40");
        const result = carService.calculateFinalPrice(customer, carCategory, numberOfDays);

        expect(result).to.be.deep.equal(expected);
    })

    it("Given a customer, a carCategory and a car it should return a transaction receipt", async () => {
        const car = mocks.validCar;
        const carCategory = {...mocks.validCarCategory,
        price: 37.6,
        carIds: [car.id]};

        const customer = Object.create(mocks.validCustomer);
        customer.age = 20;
        const numberOfDays = 5;

        const dueDate = "10 de novembro de 2020";

        
        const now = new Date(2020, 10, 5);
        sandbox.useFakeTimers(now.getTime());
        sandbox.stub(carService, carService.getAvailableCar.name).resolves(car);


        const expectedAmount = carService.currencyFormat.format(206.80);
        const result = await carService.rent(
            customer, carCategory, numberOfDays
        );

        const expected = new Transaction({
            customer, car, amount: expectedAmount, dueDate
        })

        expect(result).to.be.deep.equal(expected);

    })
})