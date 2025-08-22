let [[N, M], ...arr] = require("fs")
    .readFileSync(0)
    .toString()
    .split("\n")
    .map((e, _)=> _ == 0 ? e.split(" ").map(Number) : e.split(""));    

let check = Array.from({length:N}, ()=>Array(M).fill(0)); 

const dirMap = {
    'U': 0, // 상 (-1,0)
    'R': 1, // 우 (0,1)
    'D': 2, // 하 (1,0)
    'L': 3  // 좌 (0,-1)
};
const dx = [-1, 0, 1, 0]; // U, R, D, L 순서
const dy = [0, 1, 0, -1]; // U, R, D, L 순서

let safe_zone_count = 0;

function dfs(x, y) {
    check[x][y] = 1;

    const dirIdx = dirMap[arr[x][y]];
    const nx = x + dx[dirIdx];
    const ny = y + dy[dirIdx];
    
    if (check[nx][ny] === 0) {
        dfs(nx, ny);
    } else if (check[nx][ny] === 1) {
        safe_zone_count += 1;
    }
    check[x][y] = 2;
}

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (check[i][j] === 0) {
            dfs(i, j);
        }
    }
}

console.log(safe_zone_count);
