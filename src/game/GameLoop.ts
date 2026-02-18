/**
 * GameLoop – fixed-timestep loop using requestAnimationFrame.
 * Single Responsibility: only timing and loop management.
 */
export class GameLoop {
    private rafId: number = 0;
    private lastTime: number = 0;
    private accumulator: number = 0;
    private running: boolean = false;

    constructor(
        private readonly tickRate: number, // ms per game tick
        private readonly onUpdate: () => void,
        private readonly onRender: () => void
    ) { }

    start(): void {
        if (this.running) return;
        this.running = true;
        this.lastTime = performance.now();
        this.accumulator = 0;
        this.rafId = requestAnimationFrame(this.loop);
    }

    stop(): void {
        this.running = false;
        cancelAnimationFrame(this.rafId);
    }

    private loop = (timestamp: number): void => {
        if (!this.running) return;

        const delta = timestamp - this.lastTime;
        this.lastTime = timestamp;
        this.accumulator += delta;

        while (this.accumulator >= this.tickRate) {
            this.onUpdate();
            this.accumulator -= this.tickRate;
        }

        this.onRender();
        this.rafId = requestAnimationFrame(this.loop);
    };
}
