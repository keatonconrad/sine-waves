"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utilities_1 = require("./utilities");
const Waves = require("./waves");
const Ease = require("./ease");
class SineWaves {
    constructor(options) {
        var _a;
        this.waveWidth = 0;
        this.waveLeft = 0;
        this.yAxis = 0;
        this.width = 0;
        this.height = 0;
        this.running = true;
        this.phase = 0;
        this.options = Object.assign({
            speed: 5,
            rotate: 0,
            ease: 'Linear',
            wavesWidth: '95%'
        }, options);
        this.el = this.options.el;
        if (!this.el) {
            throw new Error('No Canvas Selected');
        }
        this.ctx = this.el.getContext('2d');
        this.waves = this.options.waves;
        delete this.options.waves;
        if (!this.waves || !this.waves.length) {
            throw new Error('No waves specified');
        }
        this.dpr = window.devicePixelRatio || 1;
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions.bind(this));
        this.setupUserFunctions();
        this.easeFn = Ease[(_a = this.options.ease) === null || _a === void 0 ? void 0 : _a.toLowerCase()] || Ease.sineinout;
        this.rotation = (0, utilities_1.degreesToRadians)(this.options.rotate);
        this.running = Boolean(this.options.running);
        this.setupWaveFns();
        this.loop();
    }
    setupWaveFns() {
        var _a;
        for (let wave of this.waves) {
            wave.waveFn = Waves[(_a = wave.type) === null || _a === void 0 ? void 0 : _a.toLowerCase()] || Waves.sine;
        }
    }
    setupUserFunctions() {
        if (typeof this.options.resizeEvent === 'function') {
            this.options.resizeEvent.call(this);
            window.addEventListener('resize', this.options.resizeEvent.bind(this));
        }
        if (typeof this.options.initialize === 'function') {
            this.options.initialize.call(this);
        }
    }
    getDimension(dimension) {
        if (typeof this.options[dimension] === 'number') {
            return this.options[dimension];
        }
        else if (typeof this.options[dimension] === 'function') {
            return this.options[dimension].call(this, this.el);
        }
        else if (dimension === 'width') {
            return this.el.clientWidth;
        }
        else if (dimension === 'height') {
            return this.el.clientHeight;
        }
        return 0; // Default value
    }
    updateDimensions() {
        const width = this.getDimension('width');
        const height = this.getDimension('height');
        this.width = this.el.width = width * this.dpr;
        this.height = this.el.height = height * this.dpr;
        this.el.style.width = width + 'px';
        this.el.style.height = height + 'px';
        this.waveWidth = getWaveWidth(this.options.wavesWidth, this.width);
        this.waveLeft = (this.width - this.waveWidth) / 2;
        this.yAxis = this.height / 2;
    }
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    update() {
        this.phase -= this.options.speed / 20;
        this.clear();
        this.ctx.save();
        if (this.rotation > 0) {
            this.ctx.translate(this.width / 2, this.height / 2);
            this.ctx.rotate(this.rotation);
            this.ctx.translate(-this.width / 2, -this.height / 2);
        }
        for (let wave of this.waves) {
            const timeModifier = wave.timeModifier || 1;
            this.drawWave(this.phase * timeModifier, wave);
        }
        this.ctx.restore();
    }
    getPoint(time, position, options) {
        var _a, _b;
        let x = (this.phase + time) + (-this.yAxis + position) / options.wavelength;
        if (options.direction === 'left') {
            x = (this.phase + time) - (-this.yAxis + position) / options.wavelength;
        }
        const y = ((_a = options.waveFn) === null || _a === void 0 ? void 0 : _a.call(this, x)) || 0;
        const amplitude = (_b = this.easeFn) === null || _b === void 0 ? void 0 : _b.call(this, position / this.waveWidth, options.amplitude || 0);
        return {
            x: position + this.waveLeft,
            y: amplitude * y + this.yAxis
        };
    }
    drawWave(time, options) {
        options = Object.assign(Object.assign(Object.assign({}, this.options), SineWaves.defaultWave), options);
        this.ctx.lineWidth = options.lineWidth * this.dpr || 1;
        this.ctx.strokeStyle = options.strokeStyle || 'rgba(255, 255, 255, 0.2)';
        this.ctx.lineCap = 'butt';
        this.ctx.lineJoin = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.yAxis);
        this.ctx.lineTo(this.waveLeft, this.yAxis);
        for (let i = 0; i < this.waveWidth; i += options.segmentLength) {
            const point = this.getPoint(time, i, options);
            this.ctx.lineTo(point.x, point.y);
        }
        this.ctx.lineTo(this.width, this.yAxis);
        this.ctx.stroke();
    }
    loop() {
        if (this.running) {
            this.update();
        }
        window.requestAnimationFrame(this.loop.bind(this));
    }
    setWavesWidth(wavesWidth) {
        this.waveWidth = getWaveWidth(wavesWidth, this.width);
        this.waveLeft = (this.width - this.waveWidth) / 2;
    }
    setSpeed(speed) {
        this.options.speed = speed;
    }
}
SineWaves.defaultWave = {
    timeModifier: 1,
    amplitude: 50,
    wavelength: 50,
    segmentLength: 10,
    lineWidth: 1,
    strokeStyle: 'rgba(255, 255, 255, 0.2)',
    type: 'Sine'
};
/**
 * Takes either pixels or percents and calculates how wide the sine
 * waves should be
 *
 * @param     {Mixed}    value    0, '10px', '90%'
 * @param     {Number}   width    Width for percentages
 * @return    {Number}
 */
const getWaveWidth = (value, width) => {
    if (typeof value === 'number')
        return value;
    if (value.includes('%')) {
        let percentage = parseFloat(value) / 100;
        return width * percentage;
    }
    else if (value.includes('px')) {
        return parseInt(value, 10);
    }
    return width; // Default return
};
exports.default = SineWaves;
