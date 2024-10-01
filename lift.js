{
    init: (elevators, floors) => {
        var elevator = elevators[0]; // Let's use the first elevator
        var up = []
        var down = []
        var destination = []
        var goingUp = true;
        
        // Whenever the elevator is idle (has no more queued destinations) ...
        elevator.on("idle", () => {
            // let's go to all the floors (or did we forget one?)
            console.log("Idle...")
            let highestUp = up.findLastIndex((x) => x === true)
            let highestDown = down.findLastIndex((x) => x === true)
            let highestDestivation = destination.findLastIndex((x) => x === true)
            let max = Math.max(highestDestivation, highestDown, highestUp)
            let min = Math.min(highestDestivation, highestDown, highestUp)
            console.log("max: ", max, " min: ", min)
            elevator.goToFloor(max)
        });
        
        elevator.on("floor_button_pressed", (floorNum) => {
            let currentFloor = elevator.currentFloor()
            console.log("Floor button pressed: ", floorNum, " current floor: ", currentFloor)
            destination[floorNum] = true
        });
        
        elevator.on("passing_floor", (floorNum, direction) => {
            console.log("passing_floor", floorNum, direction)

        });
        
        elevator.on("stopped_at_floor", (floorNum) => {
            // Maybe decide where to go next?
            console.log("stopped at floor", floorNum)
            up[floorNum] = false
            down[floorNum] = false
            destination[floorNum] = false
        });

        floors.map((floor) => {
            let floorNum = floor.floorNum()

            floor.on("up_button_pressed", () => {
                console.log("up_button_pressed", floorNum)
                up[floorNum] = true
            });

            floor.on("down_button_pressed", () => {
                console.log("down_button_pressed", floorNum)
                down[floorNum] = true
             });
        });

   },
    update: (dt, elevators, floors) => {
        // We normally don't need to do anything here
    }
}