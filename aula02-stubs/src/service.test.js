const Service = require("./service");
const sinon = require("sinon");
const { deepStrictEqual } = require("assert");
const mocks = {
    tatooine: require("./mocks/tatooine.json")
}
const BASE_URL = "https://swapi.dev/api/planets/1/";


(async () => {
    const service = new Service();
    const stub = sinon.stub(service, service.makeRequest.name);
    const expected = { name: 'Tatooine', surfaceWater: '1', appearedIn: 5 }

    stub
        .withArgs(BASE_URL)
        .resolves(mocks.tatooine);
    {
        const response = await service.getPlanets(BASE_URL);
        deepStrictEqual(response, expected);
    }
})();