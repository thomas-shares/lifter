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
            //evator.goToFloor(0);
            console.log("Idle..")

            if(elevator.getPressedFloors().length > 0) {
                // Maybe go to some chosen floor first?
                console.log("getPressedFloor: ", elevator.getPressedFloors())

                // if( elevator.getPressedFloors().includes(floorNum)){
                //   console.log("deze vloer zit er in!!!")
                //   elevator.stop();
                // }
            }
            
            if(up.length > 0) {
                console.log("up: ", up)
                
            }
            
            if( down.length > 0) {
                console.log("down: ", down)
            }
        });
        
        elevator.on("floor_button_pressed", (floorNum) => {
            let currentFloor = elevator.currentFloor()
            console.log("Floor button pressed: ", floorNum, " current floor: ", elevator.currentFloor())
            //console.log(floors.length)
            elevator.goToFloor(floorNum)
            //console.log("Going to floor: ", floorNum)
            destination[floorNum] = true
        });
        
        elevator.on("passing_floor", (floorNum, direction) => {
            console.log("passing_floor", floorNum, direction)
            
            if(elevator.destinationQueue.includes(floorNum)){
                console.log("UNshift: " , floorNum)
                console.log("destinationQueue: ", elevator.destinationQueue)
            }
            

            if(elevator.getPressedFloors().length > 0) {
                // Maybe go to some chosen floor first?
                console.log(" getpressed: ", elevator.getPressedFloors())

                if( elevator.getPressedFloors().includes(floorNum)){
                    console.log("deze vloer zit er in!!!")
                    //elevator.stop();
                }
            }
            
            if(up.includes(floorNum) || down.includes(floorNum)) {
                elevator.destinationQueue.unshift(floorNum)
            }
            
            if(up.includes(floorNum) && direction === "up" ) {
                console.log("people waiting on ", floorNum, " going UP")
                //elevator.stop();
            }
            
            if(down.includes(floorNum) && direction === "down") {
                console.log("peope waiting on ", floorNum, " going DOWN")
                //elevator.stop();
            }
         });
        
        elevator.on("stopped_at_floor", (floorNum) => {
            // Maybe decide where to go next?
            console.log("stopped at floor", floorNum)
        });

        floors.map((floor) => {
            let floorNum = floor.floorNum()
            //console.log(floor)
            floor.on("up_button_pressed", () => {
                console.log("up_button_pressed", floorNum)
                //upSet.add(floorNum)
                up = add(up, floorNum)
                elevator.goToFloor(floorNum)

                //console.log("upSet: ", upSet)
               // debugger
            });

            floor.on("down_button_pressed", () => {
                console.log("down_button_pressed", floorNum)
                //downSet.add(floorNum)
                elevator.goToFloor(floorNum)

                down = add(down, floorNum)
             });
        });

  },
    update: (dt, elevators, floors) => {
        // We normally don't need to do anything here
    }
}