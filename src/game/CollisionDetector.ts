import type { Snake } from '../entities/Snake.js';
import type { Food } from '../entities/Food.js';
import type { GameBoard } from '../entities/GameBoard.js';

/**
 * CollisionDetector – Single Responsibility: only collision detection.
 * Stateless – all methods are pure functions of their arguments.
 */
export class CollisionDetector {
    checkWallCollision(snake: Snake, board: GameBoard): boolean {
        return board.isOutOfBounds(snake.head);
    }

    checkSelfCollision(snake: Snake): boolean {
        return snake.checkSelfCollision();
    }

    checkFoodCollision(snake: Snake, food: Food): boolean {
        return snake.head.equals(food.position);
    }
}
