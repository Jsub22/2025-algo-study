let [[N, M], ...arr] = require("fs")
    .readFileSync(0)
    .toString()
    .split("\n")
    .map((e, _)=> _ == 0 ? e.split(" ").map(Number) : e.split(""));    

const dx = [-1, 0, 1, 0]; // U, R, D, L 순서
const dy = [0, 1, 0, -1];

let spots = setting(N, M, arr);

let result = bfs(N, M, arr, spots, dx, dy);

if (result === Number.MAX_VALUE)
    console.log(-1);
else
    console.log(result);

function setting(N, M, arr)
{
	let spots = [[],[]];
	
	for (let i=1; i<N-1; i++)
		for (let j=1; j<M-1; j++)
			if (arr[i][j] === "B")
			{
				arr[i][j] = ".";
				spots[0] = [i, j];
			}
			else if (arr[i][j] === "R")
			{
				arr[i][j] = ".";
				spots[1] = [i, j];
			}
	return spots;
}

function spots_sort(spots, d)
{
    let result = [];
    
	switch(d)
	{
		case 0: // U : x
			if (spots[0][0] > spots[1][0])
				result = [0, 1];
            else
                result = [0, 0];
			break;
		case 1: // R : y
			if (spots[0][1] < spots[1][1])
				result = [1, 1];
            else
                result = [1, 0];
			break;
		case 2: // D : x 
			if (spots[0][0] < spots[1][0])
				result = [0, 1];
            else
                result = [0, 0];
			break;
		case 3: // L : y
			if (spots[0][1] > spots[1][1])
				result = [1, 1];
            else
                result = [1, 0];
			break;
		default:
	}
	return (result);
}

function bfs(N, M, arr, spots, dx, dy)
{
    let alpha = {0:"B", 1:"R"};
	let queue = [];
	let limit = 10;
	let min = Number.MAX_VALUE;
	
	queue.push([spots, 0, -1]);
	
	while (queue.length > 0)
	{
		let [spots_c, count_c, prev_d] = queue.shift();
		for (let i=0; i<4; i++)
		{
			if (prev_d !== -1 && (prev_d === (i+2)%4 || prev_d === i))
				continue;
				
			let [d, sort] = spots_sort(spots_c, i);
			let temp = [[],[]];
			let move_sum = 0;
			let j = 0;
			let nx;
			let ny;
            let isCorrect = 0;

            // console.log("d:",d, "i:",i);
            
			while (true)
			{
				if (d === 0)
				{
					nx = spots_c[sort][0]+j;
					ny = spots_c[sort][1];
					
					if (nx+dx[i] <= 0 || nx+dx[i] >= N - 1)
						break;
					if (arr[nx+dx[i]][ny] === "O")
                    {
                        nx += dx[i];
                        j += dx[i];
        				if (sort === 1)
        					isCorrect = 1;
        				else
                            isCorrect = -1;
						break;
                    }
					if (arr[nx+dx[i]][ny] != ".")
						break;		
					j += dx[i];
				}
				else
				{
					nx = spots_c[sort][0];
					ny = spots_c[sort][1]+j;
					
					if (ny+dy[i] <= 0 || ny+dy[i] >= M - 1)
						break;
					if (arr[nx][ny+dy[i]] === "O")
                    {
                        ny += dy[i];
                        j += dy[i];
        				if (sort === 1)
        					isCorrect = 1;
        				else
                            isCorrect = -1;
                        break;
                    }
					if (arr[nx][ny+dy[i]] != ".")
						break;		
					j += dy[i];
				}
			}
			if (isCorrect === -1)
                continue;
            else if (isCorrect === 0)
    			arr[nx][ny] = alpha[sort];
            temp[sort] = [nx, ny];

			move_sum += j;
			j = 0;

			while (true)
			{
				if (d === 0)
				{
					nx = spots_c[+(!sort)][0]+j;
					ny = spots_c[+(!sort)][1];
					if (nx+dx[i] <= 0 || nx+dx[i] >= N - 1)
						break;
                    // console.log("xy:", nx+dx[i], ny);
					if (arr[nx+dx[i]][ny] === "O")
                    {
                        nx += dx[i];
                        j += dx[i]
        				if (+(!sort) === 1)
        					isCorrect = 1;
        				else
                            isCorrect = -1;
                        break;
                    }
					if (arr[nx+dx[i]][ny] != ".")
						break;	
					j += dx[i];
				}
				else
				{
					nx = spots_c[+(!sort)][0];
					ny = spots_c[+(!sort)][1]+j;
					
					if (ny+dy[i] <= 0 || ny+dy[i] >= M - 1)
						break;
					if (arr[nx][ny+dy[i]] === "O")
                    {
                        ny += dy[i];
                        j += dy[i];
        				if (+(!sort) === 1)
        					isCorrect = 1;
        				else
                            isCorrect = -1;
                        break;
                    }
					if (arr[nx][ny+dy[i]] != ".")
						break;
					j += dy[i];
				}
			}
            
            if (arr[temp[sort][0]][temp[sort][1]] === alpha[sort])
                arr[temp[sort][0]][temp[sort][1]] = ".";
            // console.log(move_sum, j, "result:", isCorrect);
            temp[+(!sort)] = [nx, ny];
        	move_sum += j;
            
			if (move_sum === 0)
				continue;
			if (count_c + 1 <= 10)
            {
                if (isCorrect === 1)
                    min = min > count_c+1 ? count_c+1 : min;
                else if (isCorrect === 0)
    				queue.push([temp, count_c+1, i]);
                else
                    continue;
            }
		}
	}
	
	return min;
}
