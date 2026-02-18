/**
 * Vector2D – Immutable 2D integer vector for grid positions and directions.
 */
export class Vector2D {
    constructor(
        public readonly x: number,
        public readonly y: number
    ) { }

    add(other: Vector2D): Vector2D {
        return new Vector2D(this.x + other.x, this.y + other.y);
    }

    equals(other: Vector2D): boolean {
        return this.x === other.x && this.y === other.y;
    }

    clone(): Vector2D {
        return new Vector2D(this.x, this.y);
    }

    /** Returns the angle in radians for this direction vector (for sprite rotation). */
    toAngle(): number {
        return Math.atan2(this.y, this.x);
    }

    static readonly UP = new Vector2D(0, -1);
    static readonly DOWN = new Vector2D(0, 1);
    static readonly LEFT = new Vector2D(-1, 0);
    static readonly RIGHT = new Vector2D(1, 0);
}
