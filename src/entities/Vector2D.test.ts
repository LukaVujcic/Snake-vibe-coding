import { describe, it, expect } from 'vitest';
import { Vector2D } from './Vector2D.js';

describe('Vector2D', () => {
    it('should create with given coordinates', () => {
        const v = new Vector2D(5, 10);
        expect(v.x).toBe(5);
        expect(v.y).toBe(10);
    });

    it('should add vectors correctly', () => {
        const v1 = new Vector2D(1, 2);
        const v2 = new Vector2D(3, 4);
        const result = v1.add(v2);
        expect(result.x).toBe(4);
        expect(result.y).toBe(6);
    });

    it('should check equality correctly', () => {
        const v1 = new Vector2D(5, 5);
        const v2 = new Vector2D(5, 5);
        const v3 = new Vector2D(1, 1);
        expect(v1.equals(v2)).toBe(true);
        expect(v1.equals(v3)).toBe(false);
    });

    it('should clone correctly', () => {
        const v1 = new Vector2D(7, 8);
        const v2 = v1.clone();
        expect(v2).not.toBe(v1);
        expect(v2.x).toBe(v1.x);
        expect(v2.y).toBe(v1.y);
    });

    it('should return correct angle', () => {
        const up = Vector2D.UP;
        const right = Vector2D.RIGHT;
        expect(up.toAngle()).toBe(-Math.PI / 2);
        expect(right.toAngle()).toBe(0);
    });
});
