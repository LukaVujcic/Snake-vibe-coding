import { describe, it, expect, beforeEach } from 'vitest';
import { ScoreManager } from './ScoreManager.js';

describe('ScoreManager', () => {
    let scoreManager: ScoreManager;
    let scoreEl: HTMLElement;
    let bestEl: HTMLElement;

    beforeEach(() => {
        scoreEl = document.createElement('span');
        bestEl = document.createElement('span');
        scoreManager = new ScoreManager(scoreEl, bestEl);
    });

    it('should initialize with score 0', () => {
        expect(scoreManager.score).toBe(0);
        expect(bestEl.textContent).toBe('0');
    });

    it('should increment score and best score', () => {
        scoreManager.increment();
        expect(scoreManager.score).toBe(1);
        expect(scoreEl.textContent).toBe('1');
        expect(bestEl.textContent).toBe('1');

        scoreManager.increment();
        expect(scoreManager.score).toBe(2);
        expect(bestEl.textContent).toBe('2');
    });

    it('should reset score but keep best score', () => {
        scoreManager.increment();
        scoreManager.increment();
        expect(scoreManager.score).toBe(2);

        scoreManager.reset();
        expect(scoreManager.score).toBe(0);
        expect(scoreEl.textContent).toBe('0');
        expect(bestEl.textContent).toBe('2');
    });
});
