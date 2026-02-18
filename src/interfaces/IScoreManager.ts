/**
 * IScoreManager – Single Responsibility: only manages score tracking.
 */
export interface IScoreManager {
    readonly score: number;
    readonly bestScore: number;
    increment(): void;
    reset(): void;
}
