export const playCaptureSound = () => {
    const audio = new Audio('/sounds/chessCapture.mp3');
    audio.volume = 1;
    audio.play().catch(e => console.log("Audio play failed:", e));
};