import type { ITexture } from '../interfaces/ITexture.js';

/**
 * ColorTexture – fallback texture that draws a solid colored rectangle.
 * Used when no image sprite is available.
 */
export class ColorTexture implements ITexture {
    constructor(
        private readonly fillColor: string,
        private readonly strokeColor?: string,
        private readonly cornerRadius: number = 4
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

        const r = Math.min(this.cornerRadius, width / 2, height / 2);
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + width - r, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + r);
        ctx.lineTo(x + width, y + height - r);
        ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
        ctx.lineTo(x + r, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();

        ctx.fillStyle = this.fillColor;
        ctx.fill();

        if (this.strokeColor) {
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        ctx.restore();
    }
}
