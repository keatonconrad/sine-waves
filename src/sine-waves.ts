import { degreesToRadians } from './utilities';
import * as Waves from './waves';
import * as Ease from './ease';

type WaveOptions = {
  timeModifier?: number;
  amplitude: number;
  wavelength?: number;
  segmentLength?: number;
  lineWidth?: number;
  strokeStyle?: string | CanvasGradient | CanvasPattern;
  type?: string;
  waveFn?: (x: number) => number;
  direction?: 'left' | 'right';
};

interface SineWavesOptions {
  speed?: number;
  rotate?: number;
  ease?: string;
  wavesWidth?: string;
  el: HTMLCanvasElement | null;
  waves?: WaveOptions[];
  resizeEvent?: Function;
  initialize?: Function;
  width?: number | Function;
  height?: number | Function;
  running?: boolean;
}

class SineWaves {
  public options: SineWavesOptions;
  public el: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  private waves: WaveOptions[];
  private dpr: number;
  public waveWidth: number = 0;
  private waveLeft: number = 0;
  private yAxis: number = 0;
  private width: number = 0;
  private height: number = 0;
  private time: number = 0;
  private running: boolean = true;
  private rotation: number;
  private easeFn: (percent: number, amplitude: number) => number;
  public phase: number = 0;


  static defaultWave: WaveOptions = {
    timeModifier: 1,
    amplitude: 50,
    wavelength: 50,
    segmentLength: 10,
    lineWidth: 1,
    strokeStyle: 'rgba(255, 255, 255, 0.2)',
    type: 'Sine'
  };

  constructor(options: SineWavesOptions) {
    this.options = {...{
      speed: 5,
      rotate: 0,
      ease: 'Linear',
      wavesWidth: '95%'
    }, ...options};
    this.time = 0;

    this.el = this.options.el!;

    if (!this.el) {
      throw new Error('No Canvas Selected');
    }

    this.ctx = this.el.getContext('2d')!;

    this.waves = this.options.waves!;
    delete this.options.waves;
    if (!this.waves || !this.waves.length) {
      throw new Error('No waves specified');
    }

    this.dpr = window.devicePixelRatio || 1;

    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));

    this.setupUserFunctions();

    this.easeFn = Ease[this.options.ease?.toLowerCase() as keyof typeof Ease] || Ease.sineinout;

    this.rotation = degreesToRadians(this.options.rotate as number);

    this.running = Boolean(this.options.running);

    this.setupWaveFns();

    this.loop();
  }

  private setupWaveFns() {
    for (let wave of this.waves) {
      wave.waveFn = Waves[wave.type?.toLowerCase() as keyof typeof Waves] || Waves.sine;
    }
  }

  public setupUserFunctions() {
    if (typeof this.options.resizeEvent === 'function') {
      this.options.resizeEvent.call(this);
      window.addEventListener('resize', this.options.resizeEvent.bind(this));
    }

    if (typeof this.options.initialize === 'function') {
      this.options.initialize.call(this);
    }
  }

  private getDimension(dimension: 'width' | 'height') {
    if (typeof this.options[dimension] === 'number') {
      return this.options[dimension];
    } else if (typeof this.options[dimension] === 'function') {
      return (this.options[dimension] as Function).call(this, this.el);
    } else if (dimension === 'width') {
      return this.el.clientWidth;
    } else if (dimension === 'height') {
      return this.el.clientHeight;
    }
    return 0; // Default value
  }

  private updateDimensions() {
    const width = this.getDimension('width');
    const height = this.getDimension('height');

    this.width = this.el.width = width * this.dpr;
    this.height = this.el.height = height * this.dpr;

    this.el.style.width = width + 'px';
    this.el.style.height = height + 'px';

    this.waveWidth = getWaveWidth(this.options.wavesWidth!, this.width);
    this.waveLeft = (this.width - this.waveWidth) / 2;
    this.yAxis = this.height / 2;
  }

  private clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  private update() {
    this.phase -= this.options.speed! / 20;

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

  private getPoint(time: number, position: number, options: WaveOptions) {
    let x = (this.phase + time) + (-this.yAxis + position) / options.wavelength!;
    if (options.direction === 'left') {
      x = (this.phase + time) - (-this.yAxis + position) / options.wavelength!
    }
    const y = options.waveFn?.call(this, x) || 0;
  
    const amplitude = this.easeFn?.call(this, position / this.waveWidth, options.amplitude);
  
    return {
      x: position + this.waveLeft,
      y: amplitude * y + this.yAxis
    };
  }
  

  private drawWave(time: number, options: WaveOptions) {
    options = {...this.options, ...SineWaves.defaultWave, ...options};

    this.ctx.lineWidth = options.lineWidth! * this.dpr || 1;
    this.ctx.strokeStyle = options.strokeStyle! || 'rgba(255, 255, 255, 0.2)';
    this.ctx.lineCap = 'butt';
    this.ctx.lineJoin = 'round';
    this.ctx.beginPath();

    this.ctx.moveTo(0, this.yAxis);
    this.ctx.lineTo(this.waveLeft, this.yAxis);

    for (let i = 0; i < this.waveWidth; i += options.segmentLength!) {
      const point = this.getPoint(time, i, options);
      this.ctx.lineTo(point.x, point.y);
    }

    this.ctx.lineTo(this.width, this.yAxis);
    this.ctx.stroke();
  }

  private loop() {
    if (this.running) {
      this.update();
    }
    window.requestAnimationFrame(this.loop.bind(this));
  }

  public setWavesWidth(wavesWidth: string) {
    this.waveWidth = getWaveWidth(wavesWidth, this.width);
    this.waveLeft = (this.width - this.waveWidth) / 2;
  }

  public setSpeed(speed: number) {
    this.options.speed = speed;
  }
}

/**
 * Takes either pixels or percents and calculates how wide the sine
 * waves should be
 *
 * @param     {Mixed}    value    0, '10px', '90%'
 * @param     {Number}   width    Width for percentages
 * @return    {Number}
 */
const getWaveWidth = (value: string | number, width: number): number => {
  if (typeof value === 'number') return value;

  if (value.includes('%')) {
    let percentage = parseFloat(value) / 100;
    return width * percentage;
  } else if (value.includes('px')) {
    return parseInt(value, 10);
  }
  return width; // Default return
}

export default SineWaves;