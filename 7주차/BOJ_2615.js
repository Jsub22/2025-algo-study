let map = require("fs")
    .readFileSync(0)
    .toString()
    .split("\n")
    .map((e)=>e.split(" ").map(Number));

for (let i=0; i<19; i++)
{   
    for (let j=0; j<19; j++)
    {
        if (map[i][j] < 1)
            continue;

        let result = check(i, j);
        
        if (result === -1)
            map[i][j] *= -1;
        else
        {
            console.log(map[i][j]);

            if (result === 3)
                console.log([i+1+4, j+1-4].join(" "));
            else
                console.log([i+1, j+1].join(" "));
                
            return;
        }
    }
}

console.log(0);

function check(a, b)
{
    let [dx, dy] = [[0, 1, 1, 1], [1, 1, 0, -1]];

    let team = map[a][b];

    for (let i=0; i<4; i++)
    {
        let tmp_x = a - dx[i];
        let tmp_y = b - dy[i];

        if (tmp_x >= 0 && tmp_x < 19 && tmp_y >= 0 && tmp_y < 19
           && team * (-1) === map[tmp_x][tmp_y])
            continue;

        let x = a;
        let y = b;
        let count = 1;
        
        for (let j=0; j<5; j++)
        {
            x += dx[i];
            y += dy[i];
            
            if (x < 0 || x >= 19 || y < 0 || y >= 19)
                break;
            
            if (team !== map[x][y])
                break;
            
            count += 1;
        }

        if (count === 5)
            return i;
    }

    return -1;
}
