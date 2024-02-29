import React, { useState } from 'react'; //needed import

//elevator component

const Elevator = ({ name, currentFloor, direction, destination }) => {
    return (
        <tr>
            <td>
                {name}
            </td>
            <td>
                {currentFloor}
            </td>
            <td>
                {direction}
            </td>
            <td>
                {destination}
            </td>
        </tr>
    );
};


//elevator system-component

const ElevatorSystem = () => {

    //LiftA
    const [elevatorA] = useState({
        name: "ElevatorA",
        currentFloor: 0, //ground
        direction: 'down',
        destination: null,
    });

    //LiftB
    const [elevatorB] = useState({
        name: "ElevatorB",
        currentFloor: 6, //floor 7
        direction: 'up',
        destination: null,
    });

    //State-floor--status
    const [floorStatus, setFloorStatus] = useState(Array(7).fill(''));

    //State-for the floor where I call the elevator
    const [callFloor, setCallFloor] = useState(null);

    //State-for the floor where is the destination
    const [destinationFloor, setDestinationFloor] = useState(null);

    //function which choose the elevator
    const chooseElevator = () => {
        if (callFloor !== null && destinationFloor !== null) {
            const distanceA = Math.abs(callFloor - elevatorA.currentFloor);
            const distanceB = Math.abs(callFloor - elevatorB.currentFloor);

            const selectedElevator = distanceA < distanceB || (distanceA === distanceB && elevatorA.currentFloor < elevatorB.currentFloor)
                ? elevatorA : elevatorB;

            movingElevator(selectedElevator, callFloor, destinationFloor);
        }
    }

    //function to move the selected elevator
    const movingElevator = (elevator, callFloor, destinationFloor) => {
        const newDirection = destinationFloor > elevator.currentFloor ? 'up' : 'down';

        elevator.direction = newDirection;
        elevator.destination = destinationFloor; //update destination floor

        //write in the floor status the "from which floor"
        const newFloorStatusFrom = [...floorStatus] //new array(floorStatus elements)
        newFloorStatusFrom[elevator.currentFloor] = `From ${callFloor}`;

        setFloorStatus(newFloorStatusFrom);

        //set timing 
        setTimeout(() => {
            //select floor
            elevator.currentFloor = destinationFloor;
            //elevator stop
            elevator.direction = null;
            //destination stop
            elevator.destination = null;

            //write in the floor status the "reached with x lift"
            const newFloorStatusReached = [...floorStatus];
            newFloorStatusReached[elevator.currentFloor] = `Reached ${destinationFloor} with ${elevator.name}`;

            setFloorStatus(newFloorStatusReached); //set reached floor


            //clear reached status after 3 seconds
            setTimeout(() => {
                const clearReachedStatus = [...newFloorStatusReached];
                clearReachedStatus[elevator.currentFloor] = '';
                setFloorStatus(clearReachedStatus);
            }, 3000);
        }, 3000);
    };

    return (
        <div>
            <h2>Elevator System</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Current Floor</th>
                        <th>Direction</th>
                        <th>Destination</th>
                    </tr>
                </thead>
                <tbody>
                    <Elevator {...elevatorA}></Elevator>
                    <Elevator {...elevatorB}></Elevator>
                </tbody>
            </table>

            <h2>Floor Status</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Floor</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {floorStatus.map((status, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <label>
                    Call Floor:
                    <input type='number' value={callFloor} onChange={(e) => setCallFloor(parseInt(e.target.value, 10))}></input>
                </label>
            </div>
            <div>
                <label>
                    Destination Floor:
                    <input type='number' value={destinationFloor} onChange={(e) => setDestinationFloor(parseInt(e.target.value, 10))}></input>
                </label>
            </div>

            <button onClick={chooseElevator}>Choose</button>
        </div>
    );

};

export default ElevatorSystem;


