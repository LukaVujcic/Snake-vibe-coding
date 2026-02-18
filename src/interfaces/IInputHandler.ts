/**
 * IInputHandler – Single Responsibility: only handles keyboard input.
 */
export interface IInputHandler {
    /** Current direction as [dx, dy] */
    readonly direction: Readonly<{ x: number; y: number }>;
    /** Start listening for input */
    start(): void;
    /** Stop listening for input */
    stop(): void;
}
