import type { Vector2D } from '../entities/Vector2D.js';

/**
 * IRenderer – Interface Segregation: only rendering concerns.
 * Decouples game logic from canvas implementation details.
 */
export interface IRenderer {
    /** Width of the canvas in pixels */
    readonly width: number;
    /** Height of the canvas in pixels */
    readonly height: number;
    /** Clear the entire canvas */
    clear(): void;
    /** Draw a texture at a grid cell position */
    drawCell(
        gridPos: Vector2D,
        textureKey: string,
        rotation?: number
    ): void;
    /** Draw the grid background */
    drawBackground(): void;
}
