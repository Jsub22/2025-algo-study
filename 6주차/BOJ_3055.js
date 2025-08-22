let [input, ...arr] = require("fs")
    .readFileSync(0)
    .toString()
    .split("\n");

arr = arr.map((e)=>e.split(""));

let [R, C] = input.split(" ").map(Number);
let [dx, dy] = [[0, 1, 0, -1], [1, 0, -1, 0]];
let check = Array.from({length:R}, ()=>Array(C).fill(Infinity));
let start = [0, 0];
let end = [0, 0];
let flood = [];

for (let i=0; i<R; i++)
{
    for (let j=0; j<C; j++)
    {
        if (arr[i][j] === "S")
            start = [i, j];
        else if (arr[i][j] === "D")
            end = [i, j];
        else if (arr[i][j] === "*")
            flood.push([i, j]);
    }
}

pq_bfs();
console.log(check[end[0]][end[1]] === Infinity ? "KAKTUS" : check[end[0]][end[1]]);

function pq_bfs()
{
    let pq = [];
    let fq = [...flood];

    let [a, b] = start;

    arr[a][b] = ".";
    check[a][b] = 0;
    pq.push([a, b, check[a][b]]);
    
    while (pq.length > 0)
    {
        let fq_tmp = [];
        while (fq.length > 0)
        {
            let [x, y] = fq.shift();
    
            for (let i=0; i<4; i++)
            {
                let xx = x + dx[i];
                let yy = y + dy[i];
    
                if (xx >= 0 && xx < R && yy >= 0 && yy < C && arr[xx][yy] === ".")
                {
                    arr[xx][yy] = "*";
                    fq_tmp.push([xx, yy]);
                }
            }            
        }
        fq = fq_tmp;
        
        let pq_tmp = [];
        while (pq.length > 0)
        {
            let [x, y, c] = pq.shift();
    
            for (let i=0; i<4; i++)
            {
                let xx = x + dx[i];
                let yy = y + dy[i];
    
                if (xx >= 0 && xx < R && yy >= 0 && yy < C && 
                    arr[xx][yy] !== "*" && arr[xx][yy] !== "X" &&
                    check[xx][yy] > c + 1)
                {
                    check[xx][yy] = c+1;
                    pq_tmp.push([xx, yy, c+1]);
                }
            }
        }
        pq = pq_tmp;
    }
}
