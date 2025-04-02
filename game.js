const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

class Game {
    constructor() {
        this.units = [];
        this.bases = [];
        this.resources = { gold: 0, wood: 0 };
        this.init();
    }

    init() {
        canvas.addEventListener('click', (e) => this.spawnUnit(e));
        document.getElementById('buildBase').addEventListener('click', () => this.buildBase());
        document.getElementById('spawnSoldier').addEventListener('click', () => this.spawnUnit('soldier'));
        document.getElementById('spawnArcher').addEventListener('click', () => this.spawnUnit('archer'));
        this.update();
    }

    buildBase() {
        const base = new Base(100, 100);
        this.bases.push(base);
    }

    spawnUnit(type) {
        const unit = new Unit(200, 200, type);
        this.units.push(unit);
    }

    update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.bases.forEach(base => base.draw());
        this.units.forEach(unit => unit.draw());
        requestAnimationFrame(() => this.update());
    }
}

class Unit {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.size = 20;
        this.type = type;
        this.color = type === 'soldier' ? 'blue' : 'green';
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
}

class Base {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 50;
        this.color = 'brown';
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
}

const game = new Game();
