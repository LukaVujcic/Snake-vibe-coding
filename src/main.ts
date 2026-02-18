import './style.css';
import { TextureManager } from './textures/TextureManager.js';
import { GameController } from './game/GameController.js';

const GAME_CONFIG = {
    cols: 20,
    rows: 20,
    cellSize: 28,
    tickRate: 140, // ms per tick (lower = faster)
};

async function main(): Promise<void> {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    if (!canvas) throw new Error('Canvas element not found');

    const textureManager = new TextureManager();
    await textureManager.loadTextures();

    new GameController(canvas, textureManager, GAME_CONFIG);
}

main().catch(console.error);
