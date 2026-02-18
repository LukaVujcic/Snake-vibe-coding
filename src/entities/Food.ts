import { Vector2D } from './Vector2D.js';

/**
 * Food entity – holds position and texture key.
 * Single Responsibility: only food state and respawning logic.
 */
export class Food {
    private _position: Vector2D;
    private _textureKey: string;

    constructor(position: Vector2D, textureKey: string = 'food') {
        this._position = position;
        this._textureKey = textureKey;
    }

    get position(): Vector2D {
        return this._position;
    }

    get textureKey(): string {
        return this._textureKey;
    }

    /**
     * Respawn food at a random position, avoiding excluded positions.
     */
    respawn(
        boardWidth: number,
        boardHeight: number,
        excludePositions: ReadonlyArray<Vector2D>
    ): void {
        let newPos: Vector2D;
        let attempts = 0;
        const maxAttempts = boardWidth * boardHeight;

        do {
            const x = Math.floor(Math.random() * boardWidth);
            const y = Math.floor(Math.random() * boardHeight);
            newPos = new Vector2D(x, y);
            attempts++;
        } while (
            excludePositions.some((p) => p.equals(newPos)) &&
            attempts < maxAttempts
        );

        this._position = newPos;
    }
}
