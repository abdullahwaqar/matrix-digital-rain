var symbolSize = 24;
var streams = [];

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    background(0);
    var x = 0;
    for (let index = 0; index <= width / symbolSize; index++) {
        let stream = new Stream();
        stream.generateSymbols(x, random(-1000, 0));
        streams.push(stream);
        x += symbolSize;
    }
    textSize(symbolSize);
}

function draw() {
    background(0, 150);
    streams.forEach((stream) => {
        stream.render();
    });
}

class Symbol {
    constructor(x, y, speed, first) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.value;
        this.switchInterval = round(random(2, 10));
        this.first = first;
    }

    setToRandomSymbol() {
        if (frameCount % this.switchInterval == 0) {
            this.value = String.fromCharCode(
                0x30A0 + round(random(0, 96))
            );
        }
    }

    rain() {
        if (this.y >= height) {
            this.y = 0;
        } else {
            this.y += this.speed;
        }
    }
}

class Stream {
    constructor() {
        this.symbols = [];
        this.totalSymbols = round(random(5, 30));
        this.speed = random(5, 20);
    }

    generateSymbols(x, y) {
        var first = true;
        for (let index = 0; index <= this.totalSymbols; index++) {
            let symbol = new Symbol(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
            first = false;
        }
    }

    render() {
        this.symbols.forEach((symbol) => {
            if (symbol.first) {
                fill(180, 255, 180);
            } else {
                fill(0, 255, 70);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}