import type { IInputHandler } from '../interfaces/IInputHandler.js';
import { Vector2D } from '../entities/Vector2D.js';

const KEY_MAP: Record<string, Vector2D> = {
    ArrowUp: Vector2D.UP,
    ArrowDown: Vector2D.DOWN,
    ArrowLeft: Vector2D.LEFT,
    ArrowRight: Vector2D.RIGHT,
    w: Vector2D.UP,
    s: Vector2D.DOWN,
    a: Vector2D.LEFT,
    d: Vector2D.RIGHT,
};

/**
 * InputHandler – Single Responsibility: keyboard input only.
 * Queues direction changes to prevent multiple reversals per tick.
 */
export class InputHandler implements IInputHandler {
    private _direction: Vector2D = Vector2D.RIGHT;
    private _nextDirection: Vector2D = Vector2D.RIGHT;
    private _onStart?: () => void;

    constructor(onStart?: () => void) {
        this._onStart = onStart;
    }

    get direction(): Readonly<{ x: number; y: number }> {
        // Consume queued direction
        this._direction = this._nextDirection;
        return this._direction;
    }

    start(): void {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    stop(): void {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    reset(): void {
        this._direction = Vector2D.RIGHT;
        this._nextDirection = Vector2D.RIGHT;
    }

    private handleKeyDown = (e: KeyboardEvent): void => {
        // Start game on Enter/Space
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this._onStart?.();
            return;
        }

        const newDir = KEY_MAP[e.key];
        if (!newDir) return;

        e.preventDefault();

        // Prevent 180° reversal
        const isReverse =
            newDir.x === -this._direction.x && newDir.y === -this._direction.y;
        if (!isReverse) {
            this._nextDirection = newDir;
        }
    };
}
