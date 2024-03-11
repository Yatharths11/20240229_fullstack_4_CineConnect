import { Component ,  OnInit, ElementRef, Renderer2  } from '@angular/core';
// import { FormGroup, FormControl, Validators  } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent  implements OnInit  {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    const d = this.elRef.nativeElement.ownerDocument;
    const body = d.getElementsByTagName('body')[0];
    const ppForm = d.getElementsByTagName('form')[0];
    const ccForm = d.getElementsByTagName('form')[1];
    const ecForm = d.getElementsByTagName('form')[2];
    const cCard = d.querySelector('#cc-card');
    const pCard = d.querySelector('#pp-card');
    const eCard = d.querySelector('#ec-card');
    const info = d.querySelector('#choosen-paymenttype');
    const ccNumber = ccForm.querySelector('#cardnumber');
    const cNumber = d.querySelectorAll('.card-number');
    const ccName = ccForm.querySelector('#cardholder');
    const cName = d.querySelectorAll('.card-holder');
    const ccMonth = ccForm.querySelector('#expires-month');
    const cMonth = d.querySelectorAll('.e-month');
    const ccYear = ccForm.querySelector('#expires-year');
    const cYear = d.querySelectorAll('.e-year');
    const ccCCV = ccForm.querySelector('#ccv');
    const cCCV = d.querySelector('.ccv strong');
    const ccCard = d.querySelectorAll('.credit-card-type');
    const defaultNumber = cNumber[0].getElementsByTagName('span')[0].innerHTML;
    const defaultName = cName[0].getElementsByTagName('span')[0].innerHTML;

    body.className = 'cc-bg';

    const switchPos = (elm: HTMLElement) => {
      if (elm.classList.contains('selected')) {
        if (elm.getElementsByTagName('input').length) {
          elm.getElementsByTagName('input')[0].focus();
        }
        return;
      }
      const selected = d.querySelector('.selected');

      if (elm.classList.contains('unselected-left')) {
        selected.classList.remove('selected');
        selected.classList.add('unselected-left');
        elm.classList.add('selected');
        elm.classList.remove('unselected-left');
        if (window.matchMedia("(max-width: 1039px)").matches) {
          setTimeout(() => { elm.scrollIntoView(); }, 500);
        }
      } else if (elm.classList.contains('unselected-right')) {
        selected.classList.remove('selected');
        selected.classList.add('unselected-right');
        elm.classList.add('selected');
        elm.classList.remove('unselected-right');
        if (window.matchMedia("(max-width: 1039px)").matches) {
          setTimeout(() => { elm.scrollIntoView(); }, 500);
        }
      }
    };

    const addEvent = (elem: EventTarget, event: string, func: (event: Event) => void) => {
      this.renderer.listen(elem, event, func);
    };
    
   
    const getCardType = (number: string) => {
      let re;
      // Mastercard
      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) {
        return "mastercard";
      }
      // AMEX
      re = new RegExp("^3[47]");
      if (number.match(re) != null) {
        return "amex";
      }

      // visa
      re = new RegExp("^4");
      if (number.match(re) != null) {
        return "visa";
      }

      return "";
    };

    const syncText = (elCol: NodeListOf<Element>, text: string) => {
      let collection;
      for (let j = 0; j < elCol.length; j++) {
        collection = elCol[j].querySelectorAll('span');
        if (!collection.length) {
          elCol[j].innerHTML = text;
        } else {
          for (let i = 0; i < collection.length; i++) {
            collection[i].innerHTML = text;
          }
        }
      }
    };

    const numSplit = (number: string, indexes: number[]) => {
      const tempArr = number.split('');
      const parts = [];
      for (let i = 0; i < indexes.length; i++) {
        if (tempArr.length) {
          parts.push(tempArr.splice(0, indexes[i]).join(''));
        }
      }
      return parts;
    };

    addEvent(pCard, 'click', () => {
      switchPos(d.querySelector('.paymenttype.pp'));
      body.className = 'pp-bg';
      info.innerHTML = 'PayPal';
    });
    addEvent(cCard, 'click', () => {
      switchPos(d.querySelector('.paymenttype.cc'));
      body.className = 'cc-bg';
      info.innerHTML = 'Credit Card';
    });
    addEvent(eCard, 'click', () => {
      switchPos(d.querySelector('.paymenttype.ec'));
      body.className = 'ec-bg';
      info.innerHTML = 'Bank account';
    });

    addEvent(ccNumber, 'keyup', () => {
      let cardNumber = ccNumber.value.replace(/[^0-9\s]/g, '');
      if (!!ccNumber.value.match(/[^0-9\s]/g)) {
        ccNumber.value = cardNumber;
      }
      const cardType = getCardType(cardNumber.replace(/\s/g, ''));
      let parts;
      switch (cardType) {
        case 'amex':
          parts = numSplit(cardNumber.replace(/\s/g, ''), [4, 6, 5]);
          ccCard[0].className = 'credit-card-type amex';
          break;
        case 'mastercard':
          parts = numSplit(cardNumber.replace(/\s/g, ''), [4, 4, 4, 4]);
          ccCard[0].className = 'credit-card-type mastercard';
          break;
        case 'visa':
          parts = numSplit(cardNumber.replace(/\s/g, ''), [4, 4, 4, 4]);
          ccCard[0].className = 'credit-card-type visa';
          break;
        default:
          parts = cardNumber.split(' ');
          ccCard[0].className = 'credit-card-type';
      }
      cardNumber = parts.join(' ');
      if (cardNumber != ccNumber.value) {
        ccNumber.value = cardNumber;
      }
      if (!cardNumber) {
        cardNumber = defaultNumber;
      }
      syncText(cNumber, cardNumber);
    });

    // Add other event listeners and functionality similarly
  }
}
