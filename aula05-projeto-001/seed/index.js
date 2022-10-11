const faker = require("faker");
const Car = require("../src/entities/car");
const CarCategory = require("../src/entities/carCategory");
const Customer = require("../../aula05-projeto-001/seed");
const {join} = require("path");
const{writeFile} = require("fs/promises");
const seederBaseFolder = join(__dirname, "../","database");
const ITEMS_AMOUNT = 2;


const carCategory = new CarCategory({
    id: faker.datatype.uuid(),
    name: faker.vehicle.type(),
    carIds: [],
    price: faker.finance.amount(20, 100)
});

const cars = [];

for (let i = 0; i <= ITEMS_AMOUNT; i ++) {
    const car = new Car({
        id: faker.datatype.uuid(),
        name: faker.vehicle.model(),
        available: true,
        gasAvailable: true,
        releaseYear: faker.date.past().getFullYear()
    })


    carCategory.carIds.push(car.id);
    cars.push(car);

    const customer = new Customer({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        age: faker.random.number
    })
}

const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data));

(async () => {

    await write ("cars.json", cars);
    await write ("carCategory.json", [carCategory]);
    
})()