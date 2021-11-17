const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const resolution = 10;

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

const columns = Math.floor(canvas.width / resolution);
const rows = Math.floor(canvas.height / resolution);

let grid = gridBuilder();

setInterval(() => {
    updateRender()
}, 50);

function gridBuilder() {
    return new Array(columns)
        .fill(null)
        .map(() => new Array(rows)
            .fill(null)
            .map(() => Math.floor(Math.random() * 2)));
}

function drawLifeOnCanvas(grid) {

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];

            context.beginPath();
            context.rect(col * resolution, row * resolution, resolution, resolution);
            context.fillStyle = cell ? 'black' : 'white';
            context.fill();
        }
    }
}

function advanceGeneration(grid) {

    //console.log(grid);

    const nextGenGrid = grid.map(arr => [...arr]);

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {

            const cell = grid[col][row];
            let numberOfNeighbours = 0;

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {

                    if (i === 0 && j === 0) {
                        continue;
                    }

                    const xCell = col + i;
                    const yCell = row + j;

                    if (xCell >= 0 &&
                        yCell >= 0 &&
                        xCell < columns &&
                        yCell < rows) {
                        const currentNeighbour = grid[col +i][row + j];

                        numberOfNeighbours += currentNeighbour;
                    }
                }
            }

            //rules enforcement
            if (cell === 1 && numberOfNeighbours < 2) {
                nextGenGrid[col][row] = 0;
            } else if (cell === 1 && numberOfNeighbours > 3) {
                nextGenGrid[col][row] = 0;
            } else if (cell === 0 && numberOfNeighbours === 3) {
                nextGenGrid[col][row] = 1;
            }

        }
    }

    //console.log(nextGenGrid);

    return nextGenGrid;

}


function updateRender() {
    grid = advanceGeneration(grid)
    drawLifeOnCanvas(grid);
    // requestAnimationFrame(updateRender)
}
