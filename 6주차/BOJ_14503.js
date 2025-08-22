let input = require("fs")
    .readFileSync(0)
    .toString()
    .split("\n")
    .map((e)=>e.split(" ").map(Number));

let [dx, dy] = [[-1, 0, 1, 0], [0, 1, 0, -1]];
let [N, M] = input[0];
let [r, c, d] = input[1];
let count = 0;
let arr = [];

for (let i=0; i<N; i++)
    arr[i] = input[i+2];

while (r >= 0 && r < N && c >= 0 && c < M)
{
    if (arr[r][c] === 0)
    {
        arr[r][c] = 2;
        count += 1;
    }

    let check = false;
    for (let i=0; i<4; i++)
    {
        let x = r + dx[i];
        let y = c + dy[i];

        if (x >= 0 && x < N && y >= 0 && y < M && arr[x][y] === 0)
            check = true;
    }
    if (!check)
    {
        let x = r - dx[d];
        let y = c - dy[d];

        if (x >= 0 && x < N && y >= 0 && y < M && arr[x][y] != 1)
        {
            r = x;
            c = y;
        }
        else
        {
            break;
        }
    }
    else
    {
        d = d === 0 ? 3 : d-1;

        let x = r + dx[d];
        let y = c + dy[d];

        if (x >= 0 && x < N && y >= 0 && y < M && arr[x][y] === 0)
        {
            r = x;
            c = y;
        }
    }
}

console.log(count);

