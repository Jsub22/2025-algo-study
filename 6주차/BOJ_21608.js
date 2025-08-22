let [[N], ...input] = require("fs")
    .readFileSync(0)
    .toString()
    .split("\n")
    .map((e)=>e.split(" ").map(Number));

let arr = Array.from({length:N}, ()=>Array(N).fill(0));
let sum = 0;
let [dx, dy] = [[0, 1, 0, -1], [1, 0, -1, 0]];
let scores = [0, 1, 10, 100, 1000];
let students = new Map();

for (let i=0; i<N*N; i++)
    students.set(input[i][0], new Set(input[i].slice(1)));

for (let i=0; i<N*N; i++)
{
    let best_x = 0;
    let best_y = 0;

    let best_blank = -1;
    let best_liked = -1;
    
    for (let x=0; x<N; x++)
    {
        for (let y=0; y<N; y++)
        {
            let blank = 0;
            let liked = 0;

            if (arr[x][y] != 0)
                continue;
            
            for (let j=0; j<4; j++)
            {
                let a = x + dx[j];
                let b = y + dy[j];

                if (a < 0 || a >= N || b < 0 || b >= N)
                    continue;
                
                if (arr[a][b] === 0)
                    blank++;
                else if (students.get(input[i][0]).has(arr[a][b]))
                    liked++;
            }

            if ((best_liked === liked && best_blank < blank) ||
                (best_liked < liked))
            {
                best_x = x;
                best_y = y;

                best_blank = blank;
                best_liked = liked;
            }
        }
    }

    arr[best_x][best_y] = input[i][0];
}

for (let x=0; x<N; x++)
{
    for (let y=0; y<N; y++)
    {
        let count = 0;
        
        for (let j=0; j<4; j++)
        {
            let a = x + dx[j];
            let b = y + dy[j];

            if (a < 0 || a >= N || b < 0 || b >= N)
                continue;
                
            if (students.get(arr[x][y]).has(arr[a][b]))
                count++;
        }

        sum += scores[count];
    }
}

console.log(sum);
