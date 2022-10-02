const Fibonacci = require("./fibonacci.js");
const sinon = require("sinon");
const assert = require("assert");

(async () => {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    // generators retornam iterators, que possuem os métodos .next;
    // Para capturar cada yield, precisa invocar o .next;
    // Temos 3 possibilidades:
        // funções .next
        // for await
        // rest/spread

    for await (const i of fibonacci.execute(7)) {};
    const expectedCallCount = 8;
    assert.deepStrictEqual(spy.callCount, expectedCallCount);

    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(fibonacci, fibonacci.execute.name);

        [...results] = fibonacci.execute(5);

        const expectedResult = [0,1,1,2,3];
        
        const expectedParams = {
            firstArg: 3,
            lastArg: 2,
            args: [3,1,2]
        };

        assert.deepStrictEqual(results, expectedResult);
        assert.deepStrictEqual(spy.getCall(2).firstArg, expectedParams.firstArg);
        assert.deepStrictEqual(spy.getCall(2).lastArg, expectedParams.lastArg);
        assert.deepStrictEqual(spy.getCall(2).args, expectedParams.args);

    }
})();