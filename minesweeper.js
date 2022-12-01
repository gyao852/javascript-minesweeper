//
// This is only a SKELETON file for the 'Minesweeper' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const annotate = (input) => {
  // Make sure input is type array
  if (Array.isArray(input) === false) {
    throw new Error('Expect an array as input');
  }

  // Convert 1D array to 2D matrix for
  // easier lookup
  let res = input.map((row) => {
    return row.split('')
  });

  // Helper func to populate adj cells +1
  let populateAdj = (r,c,arr) => {
    const directions = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
    directions.forEach((dir) => {
      const r_scan = r+dir[0]
      const c_scan = c+dir[1]
      if (r_scan >= 0 && r_scan < arr.length
          && c_scan >=0 && c_scan < arr[r_scan].length) {
        if (arr[r_scan][c_scan] === ' ') {
          arr[r_scan][c_scan] = "1"
        } else if (arr[r_scan][c_scan] !== '*') {
          arr[r_scan][c_scan] = (parseInt(arr[r_scan][c_scan])+1).toString();
        }
      }
    })
  }

  // Iterate through matrix. If found mine,
  // call above function to populate count
  for (let i = 0; i < res.length; i++) {
    for(let j = 0; j < res[i].length; j++) {
      const cell = res[i][j]
      if (cell.match(/[*]|\s/) === false) throw new Error("Found illegal character in game");
      if (cell === '*') populateAdj(i, j, res);
    }
  }

  // Recast response back to 1D array
  res.forEach((row, r, arr) => {
    arr[r] = row.join('')
  });
  return res
};
