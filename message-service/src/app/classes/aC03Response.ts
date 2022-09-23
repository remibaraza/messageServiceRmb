import {AC03MessageModel, AC03ResponseModel} from "@railmybox/api-dispo";

export class AC03Response implements AC03ResponseModel {
  constructor(
    public creationTs: string,
    public exchangeNo: string,
    public receiptTime: string,
    public receiver: string,
    public referenceNo: string,
    public referenceType: AC03MessageModel.ReferenceTypeEnum,
    public sender: string,
    public text: string, public responseId : string){

  }


}
