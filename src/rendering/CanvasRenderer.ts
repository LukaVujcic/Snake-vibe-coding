import type { IRenderer } from '../interfaces/IRenderer.js';
import type { ITextureProvider } from '../interfaces/ITextureProvider.js';
import type { Vector2D } from '../entities/Vector2D.js';
import type { GameBoard } from '../entities/GameBoard.js';

/**
 * CanvasRenderer – implements IRenderer using HTML Canvas 2D API.
 * Dependency Inversion: depends on ITextureProvider, not concrete texture classes.
 */
export class CanvasRenderer implements IRenderer {
    private readonly ctx: CanvasRenderingContext2D;

    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly textureProvider: ITextureProvider,
        private readonly board: GameBoard
    ) {
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get 2D canvas context');
        this.ctx = ctx;

        canvas.width = board.pixelWidth;
        canvas.height = board.pixelHeight;
    }

    get width(): number {
        return this.canvas.width;
    }

    get height(): number {
        return this.canvas.height;
    }

    clear(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    drawBackground(): void {
        const bgTexture = this.textureProvider.getTexture('background');
        bgTexture.draw(this.ctx, 0, 0, this.width, this.height);

        // Draw subtle grid
        const gridTexture = this.textureProvider.getTexture('grid');
        const { cellSize, cols, rows } = this.board;
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                const px = col * cellSize + 1;
                const py = row * cellSize + 1;
                gridTexture.draw(this.ctx, px, py, cellSize - 2, cellSize - 2);
            }
        }
    }

    drawCell(gridPos: Vector2D, textureKey: string, rotation: number = 0): void {
        const texture = this.textureProvider.getTexture(textureKey);
        const padding = 1;
        const x = gridPos.x * this.board.cellSize + padding;
        const y = gridPos.y * this.board.cellSize + padding;
        const size = this.board.cellSize - padding * 2;
        texture.draw(this.ctx, x, y, size, size, rotation);
    }
}
