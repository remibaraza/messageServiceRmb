import {AC03StatusDetailModel} from "@railmybox/api-dispo";

export class AC03StatusDetail implements AC03StatusDetailModel{

  constructor(public qualifier: string, public code:string,
              public text?: string,public statusTime?: string,
              public reference?: string) {
  }
}
