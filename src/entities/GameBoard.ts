import { Vector2D } from './Vector2D.js';

/**
 * GameBoard – holds grid dimensions and provides bounds checking.
 * Single Responsibility: only board geometry.
 */
export class GameBoard {
    constructor(
        public readonly cols: number,
        public readonly rows: number,
        public readonly cellSize: number
    ) { }

    get pixelWidth(): number {
        return this.cols * this.cellSize;
    }

    get pixelHeight(): number {
        return this.rows * this.cellSize;
    }

    isOutOfBounds(pos: Vector2D): boolean {
        return pos.x < 0 || pos.x >= this.cols || pos.y < 0 || pos.y >= this.rows;
    }

    /** Returns the center starting position of the board. */
    get center(): Vector2D {
        return new Vector2D(Math.floor(this.cols / 2), Math.floor(this.rows / 2));
    }
}
