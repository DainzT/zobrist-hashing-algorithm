This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# How to run?

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# What is zobrist hashing?
Zobrist Hashing is an algorithm widely applied in board games to efficenctly compare current positions with previous states of the board.
It allows updating of hashes incrementally through the use of xor operations. Hashes are values that are use in calculating 
positions. Each hash is designed to be unique to prevent collision. Collision occurs from having 2 different positions sharing the same key when 
mapping. 

# know how it interacts visually?
Open the link attached to this repository or download and run the repository itself to see the full content and how it is implemented in a chess game.
