import {Component, ViewChild} from "@angular/core";
import {AC03MessageModel} from "@railmybox/api-dispo";
import {freeApiService} from "../services/freeApiService";
import {AC03StatusDetail} from "../classes/aC03StatusDetail";
import {Details} from "../classes/details";
import ReferenceTypeEnum = AC03MessageModel.ReferenceTypeEnum;


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {


  /* Attributes for Ac03 messages */

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
  qualiferAndCode !: string;
  statusDetails ?: Array<AC03StatusDetail>;


  @ViewChild('messageId') messageDataList !: any;
  @ViewChild('detailsDL') detailsDataList !: any;
  @ViewChild('referenceDataList') referenceDataList !: any;

  /* Show-display variables */

  showReceiptTime = true;
  showResponseId = true;
  showQualifier = true;
  showImg = true;
  showLoading = false;
  showDetailsNoDetails = true;

  /*HMLT elements */


  constructor(public apiService: freeApiService) {
  }

  /* Send the right Ac03 message depends on the referenceType */
  oncClickSendButton() {
    switch (this.referenceType) {
      case "StatusInformation":
        let detailsArr = new Array<AC03StatusDetail>;
        detailsArr.push(new AC03StatusDetail(this.qualifier, this.code, "Test", new Date().toISOString()));
        this.apiService.postAc03StatusInformationMessage({
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
        })
        break;
      case "Response":
        this.apiService.postAc03ResponseMessage({
          creationTs: this.creationTS,
          exchangeNo: this.generateExchangeNo(),
          receiptTime: new Date().toISOString(),
          receiver: "RAILMYBOX",
          referenceNo: this.generateReferenceNo(),
          referenceType: this.referenceType,
          sender: "BOXB",
          text: "",
          responseId: this.responseId
        })
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

  //KeyEvent
  /*                  ---                           */


  onResponseIdKeyPressed() {
    let refs = new Array<String | undefined>;
    this.apiService.getCommunicationFromOrder(this.orderDispoId).subscribe(data => {
      data.forEach(function (v) {
        let optionForDatalist = String(v.statusType) + " from " + String(v.date).substring(0, 10) + " at " + String(v.date).substring(11, 19);
        refs.push(optionForDatalist)
      })
      let displayedDatalist = ''
      refs.forEach(function (v) {
        if (typeof v === "string") {
          displayedDatalist += '<option value="' + v + '" />';
        }
      })
      this.referenceDataList.nativeElement.innerHTML = displayedDatalist;
    });


  }

  onChooseReferenceType() {

    this.showQualifier = false;
    if (this.referenceType == "StatusInformation") {

      this.showReceiptTime = false;
      this.showResponseId = false;
      this.showDetailsNoDetails = true;


    } else {
      this.showReceiptTime = true;
      this.showResponseId = true;
      this.showDetailsNoDetails = false;

    }
  }

  onChooseDetailsNoDetails() {

    if (this.details == "No details") {
      this.showQualifier = false;

    } else {
      this.showQualifier = true;
      let detailsQualifierCode = new Details(new Map<number, string[]>)
      detailsQualifierCode.addDetails();
      let displayedDataList = '';
      for (let key of detailsQualifierCode.details.keys()) {
        let qualiferCode = detailsQualifierCode.details.get(key);
        if (qualiferCode != undefined)
          displayedDataList += '<option value="' + qualiferCode[0] + " " + qualiferCode[1] + '"/>'

      }
      console.log(displayedDataList);

      this.detailsDataList.nativeElement.innerHTML = displayedDataList;
    }

  }

  next1OnClick() {

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


  onReferenceInputKeyPressed() {
    let refs = new Array<String | undefined>;
    const inputReference = document.getElementById('referenceInput')
    if (inputReference) {
      inputReference.addEventListener("keypress", (e) => {
        if (this.reference && this.reference.length >= 2) {
          this.showLoading = true;
          this.showImg = false;
          this.apiService.getOrders(this.reference).subscribe(data => {
            data.forEach(function (v) {
                let tmp = String(v.reference)
                refs.push(tmp)
              }
            )
            this.showLoading = false;
            this.showImg = true;
            let optionForDataList = ''
            refs.forEach(function (v) {
              if (typeof v === "string") {
                optionForDataList += '<option value="' + v + '" />';
              }
            })
            const referenceChoice = document.getElementById('refs');
            if (referenceChoice) {
              referenceChoice.innerHTML = optionForDataList;
            }
          });
        }
      })
    }
  }


  /*          ExchangeNo and ReferenceNo generators                   */

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

  onChooseDetails() {
    const qualifierAndCode = this.qualiferAndCode?.split(' ')
    if (qualifierAndCode) {
      this.qualifier = qualifierAndCode[0]
      this.code = qualifierAndCode[1]
    }
    console.log("qualifier:" + this.qualifier + "code:" + this.code)

  }
}
