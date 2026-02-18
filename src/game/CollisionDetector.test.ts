import { describe, it, expect, beforeEach } from 'vitest';
import { CollisionDetector } from './CollisionDetector.js';
import { Snake } from '../entities/Snake.js';
import { Food } from '../entities/Food.js';
import { GameBoard } from '../entities/GameBoard.js';
import { Vector2D } from '../entities/Vector2D.js';

describe('CollisionDetector', () => {
    let detector: CollisionDetector;
    let board: GameBoard;

    beforeEach(() => {
        detector = new CollisionDetector();
        board = new GameBoard(20, 20, 20);
    });

    it('should detect wall collisions', () => {
        const snake = new Snake(new Vector2D(19, 10), 3);
        // Move out of bounds to the right
        snake.move();
        expect(detector.checkWallCollision(snake, board)).toBe(true);

        const snake2 = new Snake(new Vector2D(0, 0), 3);
        snake2.setDirection(Vector2D.UP);
        snake2.move();
        expect(detector.checkWallCollision(snake2, board)).toBe(true);
    });

    it('should detect food collisions', () => {
        const snake = new Snake(new Vector2D(10, 10), 3);
        const food = new Food(new Vector2D(11, 10));

        // Not colliding yet
        expect(detector.checkFoodCollision(snake, food)).toBe(false);

        // After move
        snake.move();
        expect(detector.checkFoodCollision(snake, food)).toBe(true);
    });
});
