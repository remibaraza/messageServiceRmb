import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
  DispoOrderStatusModel,
  DispoOrderStatusTypeModel,
  DispoService,
  ExternalService,
  HelpdeskService, TrainVisitService
} from "@railmybox/api-dispo";
import {ServiceMessage} from "./servicemessage";
import {Ac03} from "../classes/ac03";
import {DispoOrderInfo} from "../classes/dispoOrderInfo";
import {Observable} from "rxjs";
import {AC03Response} from "../classes/aC03Response";
import {Ac03status} from "../classes/ac03status";
import {BookingInfoModel, BookingService} from "@railmybox/api-booking";
import {GroupedBookingInfoModel} from "@railmybox/api-booking/model/models";
import {DispoOrderInfoModel, TrainVisitModel} from "@railmybox/api-dispo/model/models";

@Injectable()
export class freeApiService {


  constructor(private httpclient: HttpClient, public serviceMessage: ServiceMessage, public externalService: ExternalService, public helpdeskService: HelpdeskService,
              public dispoService: DispoService, public bookingService: BookingService,
              public trainVisitService : TrainVisitService
              ) {
  }

  getTrainVisit():  Observable<TrainVisitModel[]>{
    return this.trainVisitService.searchTrainVisits("ACTIVE",undefined,new Date().toISOString())
  }
  listBookings(): Observable<Array<GroupedBookingInfoModel>> {
    return this.bookingService.listBookings('FUTURE', new Date().toISOString());
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

  searchDispoOrders(): Observable<Array<DispoOrderInfoModel>>{
    return this.helpdeskService.searchDispoOrders()

  }

  getCommunicationFromOrder(dispoOrderID: string): Observable<DispoOrderStatusModel[]> {
    return this.dispoService.getDispoOrderMessages(dispoOrderID);
  }

  updateDispoOrderInfo(orderDispoId: string, status: DispoOrderStatusTypeModel): Observable<DispoOrderInfo> {
    return this.dispoService.updateDispoOrder(orderDispoId, {status: status});

  }


}
