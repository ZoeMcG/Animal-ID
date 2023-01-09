// [weight in kilos, number of limbs, average lifespan yrs, furred and/or feathered]

const animals = [
    [[25,4,11,1],'Mammal'], //dog
    [[65,4,90,0.2],'Mammal'], //human
    [[4000,4,50,0],'Mammal'], //elephant
    [[2,0,7,0],'Reptile'], //snake
    [[1,4,10,0],'Reptile'], //bearded dragon
    [[250,4,120,0],'Reptile'], //galapagos tortoise
    [[0.01,6,0.5,0],'Insect'], //cockroach
    [[0.00001,6,1,0],'Insect'], //ant
    [[0.1,8,20,1],'Insect'], //tarantula
    [[1,2,20,1],'Bird'], //seagull
    [[0.02,2,1,1],'Bird'], //robin
    [[11,2,20,1],'Bird'] //pelican
];

const types = ['Mammal','Reptile','Insect','Bird'];

function getSumWeight(animalInfo,weightMatrix){
    let totals = [];
    for (let row of weightMatrix){
        let subtot = 0;
        for (let weight = 0; weight < row.length; weight++) {
            subtot += row[weight] * animalInfo[weight];
        }
        totals.push(subtot);
    }
    return totals;
}

function evaluateDecision(sumWeights){
    return types[sumWeights.indexOf(Math.max(...sumWeights))]
}

function predict(animal,weightMatrix){
    return evaluateDecision(getSumWeight(animal,weightMatrix));
}

class Model{
    constructor(parent){
        this.weights;
        this.strength = 0;
        if (parent){
            this.weights = parent.weights.map(x => x.map(x => x+Math.random()-0.5));
        }
        else {
            this.weights = [[5,5,5,5],[5,5,5,5],[5,5,5,5],[5,5,5,5]];
        }
        this.getStrength();
    }

    getStrength(){
        for (let animal of animals){
            let guess = evaluateDecision(getSumWeight(animal[0],this.weights));
            if (guess === animal[1]) this.strength++;
        }
    }
}

let base = new Model();
let best = base;

const Dolphin = [150,0,30,0];

for (let i = 0; i<10000; i++){
    let newGen = [];
    for (let j = 0; j<100; j++){
        newGen.push(new Model(best));
    }
    for (let model of newGen){
        if (model.strength >= best.strength) best = model;
    }
    console.log(best.strength,predict(Dolphin,best.weights));
}

