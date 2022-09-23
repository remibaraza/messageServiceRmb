import {DispoOrderSearchModel, DispoOrderStatusModel} from "@railmybox/api-dispo";

export class DispoOrderSearch implements DispoOrderSearchModel{

  constructor(public bookingReference : string,
              public containerId: string,
              ) {
  }

}
