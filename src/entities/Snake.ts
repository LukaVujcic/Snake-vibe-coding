import { Vector2D } from './Vector2D.js';

/**
 * Snake entity – manages body segments, direction, and growth.
 * Single Responsibility: only snake state, no rendering or input logic.
 */
export class Snake {
    private segments: Vector2D[];
    private _direction: Vector2D;
    private pendingGrowth: number = 0;

    constructor(startPos: Vector2D, initialLength: number = 3) {
        this.segments = [];
        for (let i = 0; i < initialLength; i++) {
            this.segments.push(new Vector2D(startPos.x - i, startPos.y));
        }
        this._direction = Vector2D.RIGHT;
    }

    get head(): Vector2D {
        return this.segments[0];
    }

    get body(): ReadonlyArray<Vector2D> {
        return this.segments;
    }

    get direction(): Vector2D {
        return this._direction;
    }

    /**
     * Set a new direction, ignoring 180° reversals.
     */
    setDirection(newDir: Vector2D): void {
        const isReverse =
            newDir.x === -this._direction.x && newDir.y === -this._direction.y;
        if (!isReverse) {
            this._direction = newDir;
        }
    }

    /**
     * Move the snake one step in the current direction.
     * If growth is pending, the tail is not removed.
     */
    move(): void {
        const newHead = this.head.add(this._direction);
        this.segments.unshift(newHead);
        if (this.pendingGrowth > 0) {
            this.pendingGrowth--;
        } else {
            this.segments.pop();
        }
    }

    /**
     * Queue one extra segment to be added on the next move.
     */
    grow(): void {
        this.pendingGrowth++;
    }

    /**
     * Returns true if the head overlaps any body segment.
     */
    checkSelfCollision(): boolean {
        const head = this.head;
        return this.segments.slice(1).some((seg) => seg.equals(head));
    }

    /**
     * Returns the direction from segment[i+1] to segment[i] (for body rotation).
     */
    getSegmentDirection(index: number): Vector2D {
        if (index === 0) return this._direction;
        const curr = this.segments[index];
        const prev = this.segments[index - 1];
        return new Vector2D(prev.x - curr.x, prev.y - curr.y);
    }

    reset(startPos: Vector2D, initialLength: number = 3): void {
        this.segments = [];
        for (let i = 0; i < initialLength; i++) {
            this.segments.push(new Vector2D(startPos.x - i, startPos.y));
        }
        this._direction = Vector2D.RIGHT;
        this.pendingGrowth = 0;
    }
}
