import type { ITexture } from './ITexture.js';

/**
 * ITextureProvider – Open/Closed: new texture sources can be added
 * without modifying consumers.
 */
export interface ITextureProvider {
    getTexture(key: string): ITexture;
    loadTextures(): Promise<void>;
}
