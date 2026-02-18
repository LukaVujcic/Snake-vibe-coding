import type { IScoreManager } from '../interfaces/IScoreManager.js';

/**
 * ScoreManager – Single Responsibility: tracks score and updates DOM.
 */
export class ScoreManager implements IScoreManager {
    private _score: number = 0;
    private _bestScore: number = 0;

    constructor(
        private readonly scoreEl: HTMLElement,
        private readonly bestEl: HTMLElement
    ) {
        this.updateDOM();
    }

    get score(): number {
        return this._score;
    }

    get bestScore(): number {
        return this._bestScore;
    }

    increment(): void {
        this._score++;
        if (this._score > this._bestScore) {
            this._bestScore = this._score;
        }
        this.updateDOM();
    }

    reset(): void {
        this._score = 0;
        this.updateDOM();
    }

    private updateDOM(): void {
        this.scoreEl.textContent = String(this._score);
        this.bestEl.textContent = String(this._bestScore);
    }
}
