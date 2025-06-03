'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Board, Color, gameStatus, PieceMove, PieceType, Position, PromotionData, RookMovedKeys } from '@/types/chess';
import { initializeZobristTable } from '@/lib/chess/utils/zobrist';
import { validateMove } from '@/lib/chess/rules';
import { createInitialBoard } from '@/lib/chess/logic/board/boardInitialization';
import { updateBoardAfterPromotion, updateHashAfterPromotion } from '@/lib/chess/logic/promotion/chessPromotion';
import { recordMove } from '@/lib/chess/logic/history/recordMove';
import { hasLegalMovesForKing } from '@/lib/chess/logic/check/hasLegalMovesForKing';
import { isKingInCheck } from '@/lib/chess/logic/check/isKingInCheck';
import { findKingPosition } from '@/lib/chess/logic/movement/findKingPosition';
import { wouldLeaveKingInCheck } from '@/lib/chess/logic/check/wouldLeaveKingInCheck';
import { canCheckBeBlocked } from '@/lib/chess/logic/check/canCheckBeBlocked';
import { canCheckingPieceBeCaptured } from '@/lib/chess/logic/check/canCheckingPieceBeCaptured';
import { findAllCheckingPieces } from '@/lib/chess/logic/check/findAllCheckingPieces';

export const useChessGame = () => {
    const zobristTable = useMemo(initializeZobristTable, []);
    const [board, setBoard] = useState<Board>(createInitialBoard);
    const [selectedPiece, setSelectedPiece] = useState<Position | null>(null);
    const [currentHash, setCurrentHash] = useState<bigint>(0n);
    const [enPassantTarget, setEnPassantTarget] = useState<Position | null>(null);
    const [promotion, setPromotion] = useState<PromotionData>({
        isPromoting: false,
        position: null,
        color: null,
    });
    const [gameStatus, setGameStatus] = useState<gameStatus>('ongoing');
    const [moveHistory, setMoveHistory] = useState<PieceMove[]>([]);
    const [castlingRights, setCastlingRights] = useState<{
        whiteKingMoved: boolean;
        blackKingMoved: boolean;
        hasRookMoved: Record<RookMovedKeys, boolean>;
    }>({
        whiteKingMoved: false,
        blackKingMoved: false,
        hasRookMoved: {
            'white-7-0': false,
            'white-7-7': false,
            'black-0-7': false,
            'black-0-0': false
        }
    });
    const hashCounts = useRef(new Map<bigint, number>()).current;
    const hashHistory = useRef<bigint[]>([]);
    const [gameMode, setGameMode] = useState<'turn-based' | 'free-move'>('free-move');
    const [currentTurn, setCurrentTurn] = useState<'white' | 'black'>('white');
    const [review, setReview] = useState<boolean>(false);
    console.log(zobristTable)
    const resetBoard = () => {
        setBoard(createInitialBoard());
        setSelectedPiece(null);
        setCurrentHash(0n);
        setEnPassantTarget(null);
        setPromotion({
            isPromoting: false,
            position: null,
            color: null,
        });
        setGameStatus('ongoing');
        setMoveHistory([]);
        hashCounts.clear();
        hashHistory.current = [];
        setCastlingRights({
            whiteKingMoved: false,
            blackKingMoved: false,
            hasRookMoved: {
                'white-7-0': false,
                'white-7-7': false,
                'black-0-7': false,
                'black-0-0': false
            }
        });
        setCurrentTurn('white');
        setReview(false);
    };

    const checkThreefoldRepetition = (hash: bigint) => {
        const newCount = (hashCounts.get(hash) || 0) + 1;
        hashCounts.set(hash, newCount);
        hashHistory.current.push(hash);
        if (newCount >= 3) {
            setGameStatus('draw');
            return true;
        }
        return false;
    };

    const checkForCheckmate = (board: Board, currentTurn: Color) => {
        const kingPosition = findKingPosition(board, currentTurn);

        if (gameMode === "turn-based" && isKingInCheck(board, kingPosition, currentTurn)) {
            if (hasLegalMovesForKing(board, kingPosition, currentTurn)) {
                return;
            }

            const checkingPieces = findAllCheckingPieces(board, kingPosition, currentTurn);

            if (checkingPieces.length > 1) {
                setGameStatus('checkmate');
                return;
            }

            const canBeCaptured = canCheckingPieceBeCaptured(board, checkingPieces[0], currentTurn);
            const canBeBlocked = canCheckBeBlocked(board, checkingPieces[0], kingPosition, currentTurn);

            if (!canBeCaptured && !canBeBlocked) {
                setGameStatus('checkmate');
            }
        }
    };

    const handlePromotionChoice = (pieceType: Exclude<PieceType, 'pawn' | 'king'>) => {
        if (!promotion.position && !promotion.color) return;

        setBoard(prev => updateBoardAfterPromotion(
            prev,
            promotion.position,
            promotion.color,
            pieceType
        ));

        setCurrentHash(prev => {
            const newHash = updateHashAfterPromotion(
                prev,
                promotion.from!,
                promotion.position,
                promotion.color,
                pieceType,
                zobristTable,
                promotion.capturedPiece!,
            );

            recordMove(
                { type: pieceType, color: promotion.color! },
                promotion.from!,
                promotion.position!,
                zobristTable,
                currentHash,
                setMoveHistory,
                promotion.capturedPiece,
                undefined,
                undefined,
                undefined,
                true
            );
            checkThreefoldRepetition(newHash);
            return newHash;
        });

        setPromotion({
            isPromoting: false,
            position: null,
            color: null,
        });

    };

    const handleSquareClick = (position: Position) => {
        if (promotion.isPromoting) return;

        const { row, col } = position;
        const clickedPiece = board[row][col];
        const selected = selectedPiece ? board[selectedPiece.row][selectedPiece.col] : null;

        if (selectedPiece) {
            if (selectedPiece.row === row &&
                selectedPiece.col === col
            ) {
                setSelectedPiece(null);
                return;
            }
        }

        if (gameMode === 'turn-based') {
            if (!selectedPiece && clickedPiece && clickedPiece.color !== currentTurn) {
                return;
            }
            if (selected && selected.color !== currentTurn) {
                return;
            }
        }

        if (selectedPiece && selected) {
            const kingMovedFlag = castlingRights[`${selected.color}KingMoved`];
            const rookMovedFlags = castlingRights.hasRookMoved;

            if (validateMove(
                board,
                selectedPiece,
                position,
                enPassantTarget,
                kingMovedFlag,
                rookMovedFlags,
            )) {
                if (gameMode === "turn-based") {
                    if (wouldLeaveKingInCheck(board, selectedPiece, position, selected.color)) {
                        setSelectedPiece(null);
                        return;
                    };
                }
                const isPromotionMove = selected.type === 'pawn' && (row === 0 || row === 7);
                const isCastlingMove = selected.type === 'king' && Math.abs(position.col - selectedPiece.col) === 2;

                if (selected.type === 'king') {
                    setCastlingRights(prev => ({
                        ...prev,
                        [`${selected.color}KingMoved`]: true
                    }));
                }

                if (selected.type === 'rook') {
                    setCastlingRights(prev => {
                        const color = selected.color;
                        const row = selectedPiece.row;
                        const col = selectedPiece.col;
                        const rookKey = `${color}-${row}-${col}` as RookMovedKeys;
                        if (rookKey in prev.hasRookMoved && !prev.hasRookMoved[rookKey]) {
                            return {
                                ...prev,
                                hasRookMoved: {
                                    ...prev.hasRookMoved,
                                    [rookKey]: true
                                }
                            };
                        }
                        return prev;

                    });
                }

                if (isCastlingMove) {
                    setBoard(prev => {
                        const newBoard = [...prev.map(r => [...r])];

                        newBoard[selectedPiece.row][selectedPiece.col] = null;
                        newBoard[row][col] = selected;

                        const rookCol = position.col > selectedPiece.col ? 7 : 0;
                        const newRookCol = position.col > selectedPiece.col ? position.col - 1 : position.col + 1;
                        const rook = newBoard[row][rookCol];

                        if (rook) {
                            newBoard[row][rookCol] = null;
                            newBoard[row][newRookCol] = rook;
                            const color = selected.color;
                            const rookKey = `${color}-${row}-${rookCol}`;
                            setCastlingRights(prev => ({
                                ...prev,
                                hasRookMoved: {
                                    ...prev.hasRookMoved,
                                    [rookKey]: true
                                }
                            }));
                        }

                        return newBoard;
                    });

                    setCurrentHash(prev => {
                        let newHash = prev;
                        const color = selected.color;

                        newHash ^= zobristTable[color]['king'][selectedPiece.row][selectedPiece.col];
                        newHash ^= zobristTable[color]['king'][row][col];

                        const rookCol = position.col > selectedPiece.col ? 7 : 0;
                        const newRookCol = position.col > selectedPiece.col ? position.col - 1 : position.col + 1;
                        newHash ^= zobristTable[color]['rook'][row][rookCol];
                        newHash ^= zobristTable[color]['rook'][row][newRookCol];

                        newHash ^= zobristTable.castling[`${color}Kingside`];
                        newHash ^= zobristTable.castling[`${color}Queenside`];

                        recordMove(
                            selected,
                            selectedPiece,
                            position,
                            zobristTable,
                            currentHash,
                            setMoveHistory,
                            null,
                            null,
                            undefined,
                            {
                                valid: true,
                                from: rookCol,
                                to: newRookCol,
                                kingSideHash: zobristTable.castling[`${color}Kingside`],
                                queenSideHash: zobristTable.castling[`${color}Queenside`]
                            },
                            undefined,
                        )

                        checkThreefoldRepetition(newHash);
                        return newHash;
                    });

                    setSelectedPiece(null);

                    if (gameMode === 'turn-based') {
                        setCurrentTurn(prev => (prev === 'white' ? 'black' : 'white'));
                    }

                    return;
                }

                if (isPromotionMove) {
                    setPromotion({
                        isPromoting: true,
                        from: selectedPiece,
                        position,
                        color: selected.color,
                        capturedPiece: clickedPiece!,
                    });

                    setBoard(prev => {
                        const newBoard = [...prev.map(r => [...r])];
                        newBoard[selectedPiece.row][selectedPiece.col] = null;
                        newBoard[row][col] = selected;
                        return newBoard;
                    });

                    setSelectedPiece(null);
                    return;
                }

                setBoard(prev => {
                    const newBoard = [...prev.map(r => [...r])];

                    // En passant capture
                    if (selected.type === 'pawn' && Math.abs(col - selectedPiece.col) === 1 &&
                        !clickedPiece && enPassantTarget?.row === row && enPassantTarget?.col === col) {
                        newBoard[selectedPiece.row][col] = null;
                    }

                    newBoard[selectedPiece.row][selectedPiece.col] = null;

                    newBoard[row][col] = selected;

                    return newBoard;
                });

                if (selected.type === 'pawn' && Math.abs(row - selectedPiece.row) === 2) {
                    const enPassantRow = selectedPiece.row + (row - selectedPiece.row) / 2;
                    setEnPassantTarget({ row: enPassantRow, col: selectedPiece.col });
                } else {
                    setEnPassantTarget(null);
                }

                setCurrentHash(prev => {
                    let newHash = prev;
                    
                    newHash ^= zobristTable[selected.color][selected.type][selectedPiece.row][selectedPiece.col];

                    // En passant capture
                    if (selected.type === 'pawn' &&
                        Math.abs(col - selectedPiece.col) === 1 &&
                        !clickedPiece && enPassantTarget?.row === row && enPassantTarget?.col === col) {
                        const capturedColor = selected.color === 'white' ? 'black' : 'white';
                        newHash ^= zobristTable[capturedColor]['pawn'][selectedPiece.row][col];

                    }
                    // Regular capture
                    if (clickedPiece) {
                        newHash ^= zobristTable[clickedPiece.color][clickedPiece.type][row][col];
                    }

                    newHash ^= zobristTable[selected.color][selected.type][row][col];

                    const capturedColor = selected.color === 'white' ? 'black' : 'white';
                    recordMove(
                        selected,
                        selectedPiece,
                        position,
                        zobristTable,
                        currentHash,
                        setMoveHistory,
                        clickedPiece,
                        { type: 'pawn', color: capturedColor },
                        (selected.type === 'pawn'
                            && Math.abs(col - selectedPiece.col) === 1
                            && !clickedPiece
                            && enPassantTarget?.row === row
                            && enPassantTarget?.col === col),
                    )

                    checkThreefoldRepetition(newHash);

                    return newHash;
                });

                setSelectedPiece(null);

                if (gameMode === 'turn-based') {
                    setCurrentTurn(prev => (prev === 'white' ? 'black' : 'white'));
                }

                return;
            }
        }

        // Select piece
        if (clickedPiece?.color) {
            setSelectedPiece(position);
            return;
        }

        setSelectedPiece(null);
    };

    useEffect(() => {
        if (gameStatus === 'ongoing') {
            checkForCheckmate(board, currentTurn);
        }
    }, [board, currentTurn, gameStatus]);

    const toggleGameMode = () => {
        setGameMode(prev => (prev === 'turn-based' ? 'free-move' : 'turn-based'));
        resetBoard();
    };
    return {
        board,
        selectedPiece,
        handleSquareClick,
        handlePromotionChoice,
        promotion,
        zobristTable,
        gameStatus,
        currentHash,
        moveHistory,
        hashHistory,
        resetBoard,
        gameMode,
        toggleGameMode,
        currentTurn,
        review,
        setReview
    };
};