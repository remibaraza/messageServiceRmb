import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DispoOrderStatusModel, DispoService, ExternalService, HelpdeskService} from "@railmybox/api-dispo";
import {ServiceMessage} from "./servicemessage";
import {Ac03} from "../classes/ac03";
import {DispoOrderInfo} from "../classes/dispoOrderInfo";
import {Observable} from "rxjs";

@Injectable()
export class freeApiService {
  private url = "https://api.dev.railmybox.io"

  constructor(private httpclient: HttpClient, public serviceMessage: ServiceMessage, public externalService: ExternalService, public helpdeskService: HelpdeskService,
              public dispoService: DispoService) {
  }

  postAc03Message(ac: Ac03): void {
    this.externalService.processAc03Message(ac).subscribe();
  }

  getOrders(dispoReference: string): Observable<DispoOrderInfo[]> {
    return this.dispoService.searchDispoOrders({bookingReference: dispoReference}, 2)

  }

  getCommunicationFromOrder(dispoOrderID: string): Observable<DispoOrderStatusModel[]> {
    return this.dispoService.getDispoOrderMessages(dispoOrderID);
  }

}