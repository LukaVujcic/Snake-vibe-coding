import type { ITexture } from '../interfaces/ITexture.js';
import type { ITextureProvider } from '../interfaces/ITextureProvider.js';
import { ColorTexture } from './ColorTexture.js';
import { SpriteTexture } from './SpriteTexture.js';
import type { SpriteRect } from './SpriteTexture.js';

/**
 * Sprite configuration entry.
 * To add your own sprites:
 *   1. Place PNG files in /public/sprites/
 *   2. Add an entry here with the texture key and file path.
 *   3. Optionally specify a spriteRect for spritesheet slicing.
 */
export interface SpriteConfig {
    path: string;
    spriteRect?: SpriteRect;
}

/**
 * TextureManager – loads image assets and provides ITexture instances.
 * Falls back to ColorTexture if an image fails to load or is not configured.
 *
 * Open/Closed Principle: add new textures via SPRITE_CONFIG without
 * modifying any rendering code.
 */
export class TextureManager implements ITextureProvider {
    /**
     * ── SPRITE CONFIGURATION ──────────────────────────────────────────────────
     * Map texture keys to image files in /public/sprites/.
     * Uncomment or add entries to enable sprite rendering.
     *
     * Example (full image):
     *   'food': { path: '/sprites/food.png' }
     *
     * Example (spritesheet slice):
     *   'snake-head': { path: '/sprites/snake.png', spriteRect: { sx:0, sy:0, sw:32, sh:32 } }
     * ─────────────────────────────────────────────────────────────────────────
     */
    private static readonly SPRITE_CONFIG: Record<string, SpriteConfig> = {
        // 'snake-head': { path: '/sprites/snake-head.png' },
        // 'snake-body': { path: '/sprites/snake-body.png' },
        // 'snake-tail': { path: '/sprites/snake-tail.png' },
        // 'food':       { path: '/sprites/food.png' },
    };

    /**
     * ── FALLBACK COLOR CONFIGURATION ─────────────────────────────────────────
     * Default colors used when no sprite is configured.
     * ─────────────────────────────────────────────────────────────────────────
     */
    private static readonly FALLBACK_COLORS: Record<string, [string, string?]> = {
        'snake-head': ['#22d3ee', '#0891b2'],
        'snake-body': ['#0e7490', '#0891b2'],
        'snake-tail': ['#164e63', '#0891b2'],
        'food': ['#f43f5e', '#be123c'],
        'background': ['#060b14'],
        'grid': ['#0d1526'],
    };

    private textures: Map<string, ITexture> = new Map();

    async loadTextures(): Promise<void> {
        const loadPromises = Object.entries(TextureManager.SPRITE_CONFIG).map(
            ([key, config]) =>
                this.loadImage(config.path)
                    .then((img) => {
                        this.textures.set(key, new SpriteTexture(img, config.spriteRect));
                    })
                    .catch(() => {
                        console.warn(`[TextureManager] Failed to load sprite for "${key}", using fallback.`);
                    })
        );
        await Promise.all(loadPromises);
    }

    getTexture(key: string): ITexture {
        if (this.textures.has(key)) {
            return this.textures.get(key)!;
        }
        // Return fallback color texture
        const colors = TextureManager.FALLBACK_COLORS[key];
        if (colors) {
            return new ColorTexture(colors[0], colors[1]);
        }
        return new ColorTexture('#888888');
    }

    private loadImage(path: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = path;
        });
    }
}
