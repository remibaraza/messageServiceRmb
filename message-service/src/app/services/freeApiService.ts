import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
  DispoOrderStatusModel,
  DispoOrderStatusTypeModel,
  DispoService,
  ExternalService,
  HelpdeskService
} from "@railmybox/api-dispo";
import {ServiceMessage} from "./servicemessage";
import {Ac03} from "../classes/ac03";
import {DispoOrderInfo} from "../classes/dispoOrderInfo";
import {Observable} from "rxjs";
import {AC03Response} from "../classes/aC03Response";
import {Ac03status} from "../classes/ac03status";

@Injectable()
export class freeApiService {

  private url = "https://api.dev.railmybox.io"

  constructor(private httpclient: HttpClient, public serviceMessage: ServiceMessage, public externalService: ExternalService, public helpdeskService: HelpdeskService,
              public dispoService: DispoService) {
  }

  postAc03Message(msg: Ac03): void {
    this.externalService.processAc03Message(msg).subscribe();
  }

  postAc03ResponseMessage(msg: AC03Response): void {
    this.externalService.processAc03Message(msg).subscribe();
  }

  postAc03StatusInformationMessage(msg: Ac03status): void {
    this.externalService.processAc03Message(msg).subscribe();
  }

  getOrders(dispoReference: string): Observable<DispoOrderInfo[]> {
    return this.dispoService.searchDispoOrders({bookingReference: dispoReference}, 2)

  }

  getCommunicationFromOrder(dispoOrderID: string): Observable<DispoOrderStatusModel[]> {
    return this.dispoService.getDispoOrderMessages(dispoOrderID);
  }

  updateDispoOrderInfo(orderDispoId: string, status: DispoOrderStatusTypeModel): Observable<DispoOrderInfo> {
    return this.dispoService.updateDispoOrder(orderDispoId, {status: status});

  }


}
