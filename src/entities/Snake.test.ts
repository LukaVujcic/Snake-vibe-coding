import { describe, it, expect, beforeEach } from 'vitest';
import { Snake } from './Snake.js';
import { Vector2D } from './Vector2D.js';

describe('Snake', () => {
    let snake: Snake;
    const startPos = new Vector2D(10, 10);

    beforeEach(() => {
        snake = new Snake(startPos, 3);
    });

    it('should initialize with correct segments and direction', () => {
        expect(snake.body).toHaveLength(3);
        expect(snake.head.equals(startPos)).toBe(true);
        expect(snake.direction.equals(Vector2D.RIGHT)).toBe(true);
    });

    it('should move forward correctly', () => {
        snake.move();
        expect(snake.head.equals(new Vector2D(11, 10))).toBe(true);
        expect(snake.body).toHaveLength(3);
    });

    it('should grow when move is called after grow', () => {
        snake.grow();
        snake.move();
        expect(snake.body).toHaveLength(4);
        expect(snake.head.equals(new Vector2D(11, 10))).toBe(true);
    });

    it('should set direction correctly and ignore 180 degree turns', () => {
        snake.setDirection(Vector2D.UP);
        expect(snake.direction.equals(Vector2D.UP)).toBe(true);

        // Try to turn DOWN while moving UP
        snake.setDirection(Vector2D.DOWN);
        expect(snake.direction.equals(Vector2D.UP)).toBe(true);
    });

    it('should detect self collision', () => {
        // Initial snake at (10,10) length 5 moving RIGHT
        snake = new Snake(startPos, 5);
        // segments: (10,10), (9,10), (8,10), (7,10), (6,10)

        snake.setDirection(Vector2D.UP);
        snake.move(); // Head: (10,9)
        snake.setDirection(Vector2D.LEFT);
        snake.move(); // Head: (9,9)
        snake.setDirection(Vector2D.DOWN);
        snake.move(); // Head: (9,10) - overlaps original body segment

        expect(snake.checkSelfCollision()).toBe(true);
    });
});
