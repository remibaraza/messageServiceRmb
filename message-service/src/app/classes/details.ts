export class Details {


  constructor(public details: Map<number, Array<string>>) {
  }

  addDetails() {
    this.details.set(0, ["TERMINAL", "STA"]);
    this.details.set(1, ["TERMINAL", "STE"]);
    this.details.set(2, ["TERMINAL", "STO"]);
    this.details.set(3, ["TERMINAL", "UMG"]);
    this.details.set(4, ["TERMINAL", "UNL"]);
    this.details.set(5, ["TERMINAL", "VER"]);
    this.details.set(6, ["TERMINAL", "WEG"]);
    this.details.set(7, ["Transport", "1100"]);
    this.details.set(8, ["Transport", "15000"]);
    this.details.set(9, ["Transport", "18000"]);
    this.details.set(10, ["Transport", "30000"]);
    this.details.set(11, ["Transport", "40000"]);
    this.details.set(12, ["Transport", "47000"]);
    this.details.set(13, ["Transport", "50000"]);
    this.details.set(14, ["WORKFLOW", "ARRIV"]);
    this.details.set(15, ["WORKFLOW", "BOOKE"]);
    this.details.set(16, ["WORKFLOW", "CANCE"]);
    this.details.set(17, ["WORKFLOW", "DISPA"]);
    this.details.set(18, ["WORKFLOW", "INITI"]);
    this.details.set(19, ["WORKFLOW", "PLANN"]);
    this.details.set(20, ["TRANSPORT", "LOAD"])
    this.details.set(21, ["TRANSPORT", "RAILI"])
    this.details.set(22, ["TRANSPORT", "ROADI"])
    this.details.set(23, ["TRANSPORT", "BOOKE"])
    this.details.set(24, ["TRANSPORT", "BOOKED"])
    this.details.set(25, ["CTR_STATUS", "CANCELLED"]);
    this.details.set(26, ["CTR_STATUS", "FINISHED"]);
    this.details.set(27, ["CTR_STATUS", "IN_TRANSIT"]);
    this.details.set(28, ["CTR_STATUS", "NONE"]);
    this.details.set(29, ["CTR_STATUS", "SEARCHING_FOR_TRUCKERS"]);
    this.details.set(30, ["CTR_STATUS", "TRUCKER_FOUND"]);
    this.details.set(31, ["CTR_STATUS", "ACTIVE"]);
    this.details.set(32, ["CTR_STATUS", "CANCELLED"]);
    this.details.set(33, ["STATUS", "ACTIVE"]);
    this.details.set(34, ["STATUS", "CANCELLED"]);
    this.details.set(35, ["STATUS", "FINISHED"]);
    this.details.set(36, ["STATUS", "FUTURE"]);
    this.details.set(37, ["TRIP_STAT", "CANCELLED"]);
    this.details.set(38, ["TRIP_STAT", "EXECUTABLE"]);
    this.details.set(39, ["TRIP_STAT", "FINISHED"]);
    this.details.set(40, ["TRIP_STAT", "IN_TRANSIT"]);
    this.details.set(41, ["TRIP_STAT", "STARTED"]);
    this.details.set(42, ["TRIP_STAT", "TRANSIT_READY"]);
  }
}
