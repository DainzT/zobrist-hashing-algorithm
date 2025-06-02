export const getPieceSymbol = (type: string, color: string): string => {
    const symbols: Record<string, string> = {
        "white-king": "♚",
        "white-queen": "♛",
        "white-rook": "♜",
        "white-bishop": "♝",
        "white-knight": "♞",
        "white-pawn": "♟",
        "black-king": "♚",
        "black-queen": "♛",
        "black-rook": "♜",
        "black-bishop": "♝",
        "black-knight": "♞",
        "black-pawn": "♟",
    };
    return symbols[`${color}-${type}`] || "";
};