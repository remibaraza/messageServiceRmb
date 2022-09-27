import {Component, ViewChild} from "@angular/core";
import {AC03MessageModel} from "@railmybox/api-dispo";
import {freeApiService} from "../services/freeApiService";
import {Ac03status} from "../classes/ac03status";
import {AC03Response} from "../classes/aC03Response";
import {AC03StatusDetail} from "../classes/aC03StatusDetail";
import ReferenceTypeEnum = AC03MessageModel.ReferenceTypeEnum;


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {


  error!: string;
  sender!: string;
  customer !: string;
  creationTS!: string;
  referenceType !: ReferenceTypeEnum;
  reference !: string;
  containerId !: string;
  receiptTime !: string;
  text !: string;
  responseId !: string;
  qualifier !: string;
  code !: string;
  details ?: string;
  info ?: string;
  orderDispoId !: string;
  showDiv !: boolean
  statusDetails ?: Array<AC03StatusDetail>;
  hideStyle = 'display: none'
  showStyle = 'display: inline'

  @ViewChild('card') container !: HTMLElement


  constructor(public apiService: freeApiService) {
  }

  oncClickSendButton() {
    switch (this.referenceType) {
      case "StatusInformation":
        let ac03StatusMessage !: Ac03status;
        let detailsArr = new Array<AC03StatusDetail>;
        let ac03Details = new AC03StatusDetail(this.qualifier, this.code, "Test", new Date().toISOString());
        detailsArr.push(ac03Details);
        ac03StatusMessage = {
          customer: this.customer,
          exchangeNo: this.generateExchangeNo(),
          sender: "BOXB",
          receiver: "RAILMYBOX",
          creationTs: new Date().toISOString(),
          referenceType: this.referenceType,
          referenceNo: this.generateReferenceNo(),
          reference: this.reference,
          containerId: this.containerId,
          production: "",
          statusDetails: detailsArr
        }
        this.apiService.postAc03Message(ac03StatusMessage);
        break;
      case "Response":
        let ac03ResponseMessage !: AC03Response;
        ac03ResponseMessage = {
          creationTs: this.creationTS,
          exchangeNo: "004UE5ZYBE21LC",
          receiptTime: new Date().toISOString(),
          receiver: "RAILMYBOX",
          referenceNo: "637610330958933600",
          referenceType: this.referenceType,
          sender: "BOXB",
          text: "",
          responseId: this.responseId
        }
        this.apiService.postAc03Message(ac03ResponseMessage)
        break;
      case "Error":
        this.apiService.postAc03Message({
          creationTs: this.creationTS,
          exchangeNo: this.generateExchangeNo(),
          receiver: "RAILMYBOX",
          referenceNo: this.generateReferenceNo(),
          referenceType: this.referenceType,
          sender: "BOXB"
        });
        break;
    }
  }

  /*                  ---                           */


  onResponseIdKeyPressed() {
    let refs = new Array<String | undefined>;
    this.apiService.getCommunicationFromOrder(this.orderDispoId).subscribe(data => {
      data.forEach(function (v) {
        console.log(data);
        let statusType = String(v.statusType)
        let receivedOn = String(v.date)

        let res = statusType + " from " + receivedOn.substring(0, 10) + " at " + receivedOn.substring(11, 19);
        refs.push(res)
      })
      let str = ''
      refs.forEach(function (v) {
        if (typeof v === "string") {
          str += '<option value="' + v + '" />';
        }
      })
      const responseIdChoice = document.getElementById('messagesId');
      if (responseIdChoice) {
        responseIdChoice.innerHTML = str;
      }
    });


  }

  onChooseReferenceType() {
    let receipt = document.getElementById("rTime");
    let responseId = document.getElementById("responseIdInput");
    let detailsChoice = document.getElementById("detailsId")
    let labelDetailsNoDetails = document.getElementById("labelDetailsNoDetails")
    let labelReceiptTime = document.getElementById("labelReceiptTime")
    let codeInput = document.getElementById('codeID')
    let labelCode = document.getElementById("codeLabelId")
    let labelResponseId = document.getElementById("labelReponseId")
    let qualifierInput = document.getElementById('qualifierId');
    let labelQualifier = document.getElementById('qualifierLabelId')

    if (codeInput && labelCode && qualifierInput && labelQualifier) {
      codeInput.style.display = "none";
      labelCode.style.display = "none";
      qualifierInput.style.display = "none";
      labelQualifier.style.display = "none";
    }
    if (this.referenceType == "StatusInformation") {
      if (receipt && responseId && detailsChoice && labelDetailsNoDetails
        && labelReceiptTime && labelResponseId) {
        labelReceiptTime.style.display = "none"
        receipt.style.display = "none";


        responseId.style.display = "none";
        labelResponseId.style.display = "none"

        labelDetailsNoDetails.style.display = "inline"
        detailsChoice.style.display = "inline";

      }
    } else {
      if (receipt && responseId && detailsChoice && labelResponseId && labelDetailsNoDetails && labelReceiptTime) {
        labelReceiptTime.style.display = "inline"
        receipt.style.display = "inline";

        labelResponseId.style.display = "inline"
        responseId.style.display = "inline";


        labelDetailsNoDetails.style.display = "none"
        detailsChoice.style.display = "none";
      }
    }
  }

  next1OnClick() {

    this.error = ''
    let customerInput = document.getElementById('customer')
    const form1 = document.getElementById('form1');
    const form2 = document.getElementById('form2');
    const prog = document.getElementById('progress')
    if (form1 != null && form2 != null && prog != null) {
      form1.style.left = '-1000px';
      form2.style.left = '625px'
      prog.style.width = "1266px"
    }
    if (this.reference) {
      this.apiService.getOrders(this.reference).subscribe(data => {
        this.customer = data[0].customerName || ''
        console.log(this.customer)
        console.log(data[0].containerId);

        this.containerId = data[0].containerId || ''
        this.orderDispoId = data[0].id || ''
      });

    }
  }

  next2OnClick() {
    const form3 = document.getElementById('form3');
    const form2 = document.getElementById('form2');
    const prog = document.getElementById('progress');
    const container = document.getElementById('card')

    if (form3 != null && form2 != null && prog != null && container != null) {
      form2.style.left = '-1000px';
      form3.style.left = '625px'
      prog.style.width = "1900px"
      container.style.overflowY = "scroll";
    }
    if (this.referenceType == "Response")
      this.onResponseIdKeyPressed();
  }

  back2OnClick() {
    const form1 = document.getElementById('form1');
    const form2 = document.getElementById('form2');
    const prog = document.getElementById('progress')
    if (form1 != null && form2 != null && prog != null) {
      form1.style.left = '625px';
      form2.style.left = '2000px'
      prog.style.width = "633px"
    }
  }

  back3OnClick() {
    const form3 = document.getElementById('form3');
    const form2 = document.getElementById('form2');
    const prog = document.getElementById('progress')
    const container = document.getElementById('card')
    if (form3 != null && form2 != null && prog != null && container != null) {
      form2.style.left = '625px';
      form3.style.left = '2000px'
      prog.style.width = "1266px"
      container.style.overflowY = '';
    }
  }

  onChooseDetailsNoDetails() {
    let codeElement = document.getElementById("codeID");
    let qualifierElement = document.getElementById("qualifierId");
    let labelQualifier = document.getElementById('qualifierLabelId');
    let labelCode = document.getElementById('codeLabelId')
    if (codeElement && qualifierElement && labelCode && labelQualifier) {
      if (this.details == "No details") {

        labelCode.style.display = "none";
        codeElement.style.display = "none";

        labelQualifier.style.display = "none";
        qualifierElement.style.display = "none";

      } else {

        labelCode.style.display = "inline";
        codeElement.style.display = "inline";

        labelQualifier.style.display = "inline";
        qualifierElement.style.display = "inline"
      }
    }
  }

  onReferenceInputKeyPressed() {
    let refs = new Array<String | undefined>;
    const inputReference = document.getElementById('referenceInput')
    let loading = document.getElementById('loading')
    let img = document.getElementById('logo')
    if (inputReference) {
      inputReference.addEventListener("keypress", (e) => {
        if (img && loading && this.reference && this.reference.length >= 2) {
          loading.style.display = "inline";
          img.style.display = "none"
          this.apiService.getOrders(this.reference).subscribe(data => {
            data.forEach(function (v) {
                let tmp = String(v.reference)
                refs.push(tmp)
              }
            )
            if (loading)
              loading.style.display = "none"
            if (img)
              img.style.display = "inline"
            var str = ''
            refs.forEach(function (v) {
              if (typeof v === "string") {
                str += '<option value="' + v + '" />';
              }
            })
            const referenceChoice = document.getElementById('refs');
            if (referenceChoice) {
              referenceChoice.innerHTML = str;
            }
          });
        }
      })
    }

  }

  generateExchangeNo(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = '';
    const length = characters.length;
    for (let i = 0; i < 12; i++)
      result += characters.charAt(Math.floor(Math.random() * length))
    return result;

  }

  generateReferenceNo(): string {
    const characters = "0123456789"
    let result = ''
    for (let i = 0; i < 18; i++)
      result += characters.charAt(Math.floor(Math.random() * 10))
    return result;
  }

  displayLoading(): void {

  }

}
