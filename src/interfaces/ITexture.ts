/**
 * ITexture – Single Responsibility: knows how to draw itself onto a canvas.
 * Implementations: ColorTexture (fallback), SpriteTexture (image/spritesheet).
 */
export interface ITexture {
    draw(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        rotation?: number
    ): void;
}
