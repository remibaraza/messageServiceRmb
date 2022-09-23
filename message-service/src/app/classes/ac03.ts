import {AC03MessageModel} from "@railmybox/api-dispo";

export class Ac03 implements AC03MessageModel {




  constructor( public exchangeNo: string,
              public sender: string,public receiver:string,  public creationTs: string,
              public referenceType: AC03MessageModel.ReferenceTypeEnum,public referenceNo: string) {
  }

}
