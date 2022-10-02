class Fibonacci {
    *execute (input, current = 0, next = 1) {
        if(input === 0) {
            return 0;
        }
        
        //Retorna o valor "sob demanda"
        yield current;

        //Delega a execução da função sem retornar o valor;
        yield* this.execute(input -1, next, current + next);

    }
}

module.exports = Fibonacci;