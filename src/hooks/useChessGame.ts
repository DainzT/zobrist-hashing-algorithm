'use client';
import { useMemo, useRef, useState } from 'react';
import { Board, PieceType, Position, PromotionData } from '@/types/chess';
import { initializeZobristTable } from '@/utils/zobrist';
import { validateMove } from '@/lib/rules';
import { createInitialBoard } from '@/lib/chess/boardInitialization';

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

    const moveHistory = useRef<bigint[]>([]);

    const checkThreefoldRepetition = (hash: bigint) => {
        const occurrences = moveHistory.current.filter(h => h === hash).length;
        moveHistory.current.push(hash);
        console.log(occurrences)
        if (occurrences >= 2) {
            setGameStatus('draw');
            return true;
        }
        return false;
    };

    const handlePromotionChoice = (pieceType: Exclude<PieceType, 'pawn' | 'king'>) => {
        if (!promotion.position || !promotion.color) return;

        setBoard(prev => {
            const newBoard = [...prev.map(r => [...r])];
            newBoard[promotion.position!.row][promotion.position!.col] = {
                type: pieceType,
                color: promotion.color!
            };
            return newBoard;
        });

        setCurrentHash(prev => {
            let newHash = prev;
            newHash ^= zobristTable[promotion.color!]['pawn'][promotion.position!.row][promotion.position!.col];
            newHash ^= zobristTable[promotion.color!][pieceType][promotion.position!.row][promotion.position!.col];

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
                        position,
                        color: selected.color,
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

        console.log("empty tile")
        setSelectedPiece(null);
    };

    return { board, selectedPiece, handleSquareClick, handlePromotionChoice, promotion, zobristTable, gameStatus, currentHash };
};