function PondCreator(boundsStr){
  let bounds = boundsStr.split(' ').map(elem => +elem)
  let args = []
  
  return function(str){
    args = [...args, str]
    if (args.length===2) {
      let passedArgs = [...args]
      args =[]
      return duckSwimulator(passedArgs)
    }
    
    function duckSwimulator([start, movementStr]) {
      let location = start.split(' ').map(elem => isNaN(+elem) ? elem: +elem)
      const directions = 'NESW'
      
      for (let i=0; i<movementStr.length; i++) {
        if (movementStr[i]==='F') location = moveDuck(location)
        else location[2] = spinDuck(location[2], movementStr[i])
      }
      
      function spinDuck(facing, action) {
        let directionInd = directions.indexOf(facing)
        let change = action === 'S' ? 1: -1
        return directions[(directionInd + change) % 4] || 'W'
      }
    
      function moveDuck(location) {
        let directionInd = directions.indexOf(location[2])
        let change = directionInd<2 ? 1 : -1
        let xOrY = (directionInd+1)%2 ? 1 : 0
        let newCoord = location[xOrY]+change
        if (newCoord>=0 && newCoord<=bounds[0] && newCoord<=bounds[1]) {
          location[xOrY]=newCoord
        } 
        return location
      }
      
      return location.join(' ')  
    }
  }
}

let swimulator = PondCreator('5 5')
swimulator('1 2 N')
swimulator('PFPFPFPFF')

// swimulator('3 3 E')
// swimulator('FFSFFSFSSF')
