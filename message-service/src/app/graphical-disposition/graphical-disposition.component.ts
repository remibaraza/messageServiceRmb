import {Component, OnInit, Optional} from '@angular/core';
import {freeApiService} from "../services/freeApiService";
import {DispoOrderInfo} from "../classes/dispoOrderInfo";
import {DispoOrderInfoModel} from "@railmybox/api-dispo/model/models";
import {untagTsFile} from "@angular/compiler-cli/src/ngtsc/shims";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MessageComponent} from "../message/message.component";
import {WagonDetailsComponent} from "../wagon-details/wagon-details.component";


@Component({
  selector: 'app-graphical-disposition',
  templateUrl: './graphical-disposition.component.html',
  styleUrls: ['./graphical-disposition.component.scss']
})
export class GraphicalDispositionComponent implements OnInit {


  constructor(public apiService: freeApiService, @Optional()
  public nextDispoOrders: Map<String, Array<DispoOrderInfoModel>>, public dialog: MatDialog) {

    this.nextDispoOrders = new Map<String, Array<DispoOrderInfoModel>>;

  }

  ngOnInit(): void {
    this.doingSomethin();
  }


  doingSomethin() {
    let nowDate = new Date();
    for (let i = 0; i < 28; i++) {
      let tmpDate = new Date(nowDate.toDateString());
      this.nextDispoOrders.set(tmpDate.toDateString(), new Array<DispoOrderInfoModel>)
      nowDate.setDate(nowDate.getDate() + 1);
    }


    nowDate = new Date()
    let tmpArr = new Array<DispoOrderInfoModel>;
    console.log(nowDate.toDateString())
    this.apiService.searchDispoOrders().subscribe(data => {
      console.log(nowDate.toDateString() + " : nowDate");
      data.forEach((v) => {
        if (v.date != undefined && this.convertISOStringDateToDate(v.date) >= nowDate && v.transportSection
          == "MAINRUN") {
          const date = this.convertISOStringDateToDate(v.date);
          console.log(date.toDateString());
          let mapValue = this.nextDispoOrders.get(date.toDateString());
          if (mapValue != undefined) {
            mapValue.push(v);
            console.log("push");
          }
        }
      })
    })


  }

  convertISOStringDateToDate(date: string | undefined): Date {
    if (typeof date == "string")
      return new Date(date.substring(0, 10))
    throw new Error("No dates")
  }

  asInOrder(a: any, b: any) {
    return 1;
  }


  showDetailsClick(reference: string | undefined) {
    this.dialog.open(WagonDetailsComponent,
      {
        data: this.findInfos(reference),
        height: '400px',
        width: '600px'
      });
  }

  findInfos(reference: String | undefined) {
    for (let elt of this.nextDispoOrders.values()) {
      for (let tmp of elt) {
        if (tmp.reference == reference) {
          let reference = tmp.reference;
          let containerId = tmp.containerId;
          let destination = tmp.trainVisit?.destinationAddressCode;
          let trainId = tmp.trainVisit?.trainId;
          let capacity = tmp.trainVisit?.remainingCapacity;
          return ["Reference : " + reference, "Container Id : " + containerId, "Destination : " +
          destination, "Train Id: " + trainId, "Remaining capacity : " + capacity];
        }
      }
    }
    return null;
  }
}

