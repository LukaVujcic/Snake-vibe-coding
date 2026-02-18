import type { ITexture } from '../interfaces/ITexture.js';

/** Source rectangle within a spritesheet */
export interface SpriteRect {
    sx: number;
    sy: number;
    sw: number;
    sh: number;
}

/**
 * SpriteTexture – draws a slice of an HTMLImageElement onto the canvas.
 * Supports full images or spritesheet slices via SpriteRect.
 */
export class SpriteTexture implements ITexture {
    constructor(
        private readonly image: HTMLImageElement,
        private readonly spriteRect?: SpriteRect
    ) { }

    draw(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        rotation: number = 0
    ): void {
        ctx.save();
        if (rotation !== 0) {
            ctx.translate(x + width / 2, y + height / 2);
            ctx.rotate(rotation);
            ctx.translate(-(x + width / 2), -(y + height / 2));
        }

        if (this.spriteRect) {
            const { sx, sy, sw, sh } = this.spriteRect;
            ctx.drawImage(this.image, sx, sy, sw, sh, x, y, width, height);
        } else {
            ctx.drawImage(this.image, x, y, width, height);
        }

        ctx.restore();
    }
}
