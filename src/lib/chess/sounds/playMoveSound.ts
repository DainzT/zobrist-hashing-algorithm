export const playMoveSound = () => {
    const audio = new Audio('/sounds/chessMove.mp3');
    audio.volume = 1;
    audio.play().catch(e => console.log("Audio play failed:", e));
};