export type WaveOptions = {
    timeModifier?: number;
    amplitude?: number;
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
declare class SineWaves {
    options: SineWavesOptions;
    el: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    waves: WaveOptions[];
    dpr: number;
    waveWidth: number;
    waveLeft: number;
    yAxis: number;
    width: number;
    height: number;
    running: boolean;
    rotation: number;
    easeFn: (percent: number, amplitude: number) => number;
    phase: number;
    static defaultWave: WaveOptions;
    constructor(options: SineWavesOptions);
    private setupWaveFns;
    setupUserFunctions(): void;
    private getDimension;
    updateDimensions(): void;
    private clear;
    update(): void;
    private getPoint;
    private drawWave;
    private loop;
    setWavesWidth(wavesWidth: string): void;
    setSpeed(speed: number): void;
}
export default SineWaves;
