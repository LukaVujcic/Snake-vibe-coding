import { Snake } from '../entities/Snake.js';
import { Food } from '../entities/Food.js';
import { GameBoard } from '../entities/GameBoard.js';
import { Vector2D } from '../entities/Vector2D.js';
import { CollisionDetector } from './CollisionDetector.js';
import { GameLoop } from './GameLoop.js';
import { InputHandler } from './InputHandler.js';
import { ScoreManager } from './ScoreManager.js';
import { CanvasRenderer } from '../rendering/CanvasRenderer.js';
import type { ITextureProvider } from '../interfaces/ITextureProvider.js';

type GameState = 'IDLE' | 'RUNNING' | 'GAME_OVER';

/**
 * GameController – Orchestrator (Dependency Inversion Principle).
 * Depends on interfaces and coordinates all subsystems.
 * Single Responsibility: game state transitions and update/render cycle.
 */
export class GameController {
    private readonly snake: Snake;
    private readonly food: Food;
    private readonly board: GameBoard;
    private readonly collisionDetector: CollisionDetector;
    private readonly gameLoop: GameLoop;
    private readonly inputHandler: InputHandler;
    private readonly scoreManager: ScoreManager;
    private readonly renderer: CanvasRenderer;

    private state: GameState = 'IDLE';

    // UI elements
    private readonly overlay: HTMLElement;
    private readonly overlayTitle: HTMLElement;
    private readonly overlayMessage: HTMLElement;
    private readonly overlayScore: HTMLElement;

    constructor(
        canvas: HTMLCanvasElement,
        textureProvider: ITextureProvider,
        config: {
            cols: number;
            rows: number;
            cellSize: number;
            tickRate: number;
        }
    ) {
        this.board = new GameBoard(config.cols, config.rows, config.cellSize);
        this.snake = new Snake(this.board.center);
        this.food = new Food(
            new Vector2D(
                Math.floor(config.cols * 0.75),
                Math.floor(config.rows / 2)
            )
        );

        this.collisionDetector = new CollisionDetector();

        this.scoreManager = new ScoreManager(
            document.getElementById('score-display')!,
            document.getElementById('best-display')!
        );

        this.overlay = document.getElementById('overlay')!;
        this.overlayTitle = document.getElementById('overlay-title')!;
        this.overlayMessage = document.getElementById('overlay-message')!;
        this.overlayScore = document.getElementById('overlay-score')!;

        this.inputHandler = new InputHandler(() => this.handleStartRequest());
        this.inputHandler.start();

        this.renderer = new CanvasRenderer(canvas, textureProvider, this.board);

        this.gameLoop = new GameLoop(
            config.tickRate,
            () => this.update(),
            () => this.render()
        );

        this.setupMobileControls();
        this.showIdleScreen();
        this.gameLoop.start();
    }

    private setupMobileControls(): void {
        const btnUp = document.getElementById('btn-up');
        const btnDown = document.getElementById('btn-down');
        const btnLeft = document.getElementById('btn-left');
        const btnRight = document.getElementById('btn-right');

        const handleInput = (dir: Vector2D) => {
            if (this.state === 'IDLE' || this.state === 'GAME_OVER') {
                this.startGame();
            }
            this.inputHandler.setManualDirection(dir);
        };

        btnUp?.addEventListener('click', () => handleInput(Vector2D.UP));
        btnDown?.addEventListener('click', () => handleInput(Vector2D.DOWN));
        btnLeft?.addEventListener('click', () => handleInput(Vector2D.LEFT));
        btnRight?.addEventListener('click', () => handleInput(Vector2D.RIGHT));

        // Also allow overlay click to start
        this.overlay.addEventListener('click', () => {
            if (this.state === 'IDLE' || this.state === 'GAME_OVER') {
                this.startGame();
            }
        });
    }

    private handleStartRequest(): void {
        if (this.state === 'IDLE' || this.state === 'GAME_OVER') {
            this.startGame();
        }
    }

    private startGame(): void {
        this.snake.reset(this.board.center);
        this.food.respawn(this.board.cols, this.board.rows, this.snake.body);
        this.scoreManager.reset();
        this.inputHandler.reset();
        this.state = 'RUNNING';
        this.hideOverlay();
    }

    private update(): void {
        if (this.state !== 'RUNNING') return;

        const dir = this.inputHandler.direction;
        this.snake.setDirection(new Vector2D(dir.x, dir.y));
        this.snake.move();

        // Wall collision
        if (this.collisionDetector.checkWallCollision(this.snake, this.board)) {
            this.triggerGameOver();
            return;
        }

        // Self collision
        if (this.collisionDetector.checkSelfCollision(this.snake)) {
            this.triggerGameOver();
            return;
        }

        // Food collision
        if (this.collisionDetector.checkFoodCollision(this.snake, this.food)) {
            this.snake.grow();
            this.scoreManager.increment();
            this.food.respawn(this.board.cols, this.board.rows, this.snake.body);
        }
    }

    private render(): void {
        this.renderer.clear();
        this.renderer.drawBackground();

        // Draw food
        this.renderer.drawCell(this.food.position, this.food.textureKey);

        // Draw snake segments
        const body = this.snake.body;
        for (let i = 0; i < body.length; i++) {
            let textureKey: string;
            let rotation: number = 0;

            if (i === 0) {
                textureKey = 'snake-head';
                rotation = this.snake.direction.toAngle();
            } else if (i === body.length - 1) {
                textureKey = 'snake-tail';
                rotation = this.snake.getSegmentDirection(i).toAngle();
            } else {
                textureKey = 'snake-body';
                rotation = this.snake.getSegmentDirection(i).toAngle();
            }

            this.renderer.drawCell(body[i], textureKey, rotation);
        }
    }

    private triggerGameOver(): void {
        this.state = 'GAME_OVER';
        this.showGameOverScreen();
    }

    private showIdleScreen(): void {
        this.overlayTitle.textContent = 'SNAKE';
        this.overlayTitle.className = '';
        this.overlayMessage.textContent = 'Press ENTER or SPACE to start';
        this.overlayScore.classList.add('hidden');
        this.overlay.classList.remove('hidden');
    }

    private showGameOverScreen(): void {
        this.overlayTitle.textContent = 'GAME OVER';
        this.overlayTitle.className = 'game-over';
        this.overlayMessage.textContent = 'Press ENTER or SPACE to restart';
        this.overlayScore.textContent = `SCORE: ${this.scoreManager.score}`;
        this.overlayScore.classList.remove('hidden');
        this.overlay.classList.remove('hidden');
    }

    private hideOverlay(): void {
        this.overlay.classList.add('hidden');
    }
}
