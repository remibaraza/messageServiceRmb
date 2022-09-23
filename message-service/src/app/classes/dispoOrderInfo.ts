import {DispoOrderInfoModel} from "@railmybox/api-dispo";

export class DispoOrderInfo implements DispoOrderInfoModel {
  constructor(public id?: string, public customerName?: string, public reference ?: string,
              public containerId ?: string) {
  }
}
