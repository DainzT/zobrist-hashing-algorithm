'use client';
import { useMemo, useRef, useState } from 'react';
import { Board, PieceMove, PieceType, Position, PromotionData } from '@/types/chess';
import { initializeZobristTable } from '@/utils/zobrist';
import { validateMove } from '@/lib/rules';
import { createInitialBoard } from '@/lib/chess/boardInitialization';
import { updateBoardAfterPromotion, updateHashAfterPromotion } from '@/lib/logic/chessPromotion';
import { recordMove } from '@/lib/logic/recordMove';

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
    const [gameStatus, setGameStatus] = useState<string>('ongoing');
    const [moveHistory, setMoveHistory] = useState<PieceMove[]>([]);

    const hashCounts = useRef(new Map<bigint, number>()).current;
    const hashHistory = useRef<bigint[]>([]);

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
                {type: pieceType, color: promotion.color!},
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
            if (selectedPiece.row === row && selectedPiece.col === col) {
                setSelectedPiece(null);
                return;
            }
        }

        if (selectedPiece && selected) {
            if (validateMove(board, selectedPiece, position, enPassantTarget)) {
                const isPromotionMove = selected.type === 'pawn' && (row === 0 || row === 7);
                const isCastlingMove = selected.type === 'king' && Math.abs(position.col - selectedPiece.col) === 2;

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

                        checkThreefoldRepetition(newHash);
                        return newHash;
                    });

                    setSelectedPiece(null);
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
                    else if (clickedPiece) {
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
                        (selected.type === 'pawn' && Math.abs(col - selectedPiece.col) === 1 && !clickedPiece && enPassantTarget?.row === row && enPassantTarget?.col === col),
                    )

                    checkThreefoldRepetition(newHash);

                    return newHash;
                });

                setSelectedPiece(null);
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
    console.log(moveHistory)
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
    };
};