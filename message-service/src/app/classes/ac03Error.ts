import {AC03ErrorModel, AC03MessageModel} from "@railmybox/api-dispo";

export class Ac03Error implements AC03ErrorModel {
  constructor(
    public creationTs: string,
    public exchangeNo: string,
    public receiptTime: string,
    public receiver: string,
    public referenceNo: string,
    public referenceType: AC03MessageModel.ReferenceTypeEnum,
    public sender: string,
    public text: string, public responseId: string) {

  }

}
