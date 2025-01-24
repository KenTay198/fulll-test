export const helpCommand = async () => {
  console.log("Available commands :");
  console.log(
    `
      create <userId>                                                        - Create a new fleet for this user
      list <userId>                                                          - Show fleets by user
      show <fleetId>                                                         - Show a fleet
      register-vehicle <fleetId> <type (car|truck|motocycle)> <plateNumber>  - Register a new vehicle
      park <fleetId> <plateNumber> lat lon [alt]                              - Park a vehicle at a location
      exit                                                                   - Exit Fleet CLI
    `
  );
};
