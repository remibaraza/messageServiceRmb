import {AC03MessageModel, AC03StatusModel} from "@railmybox/api-dispo";
import {AC03StatusDetail} from "./aC03StatusDetail";

export class Ac03status implements AC03StatusModel {
  constructor(public exchangeNo: string,
              public customer: string,
              public sender: string,
              public receiver: string,
              public creationTs: string,
              public referenceType: AC03MessageModel.ReferenceTypeEnum,
              public referenceNo: string, public reference: string, public containerId: string, public production: string,
              public statusDetails?: Array<AC03StatusDetail>) {
  }

}
