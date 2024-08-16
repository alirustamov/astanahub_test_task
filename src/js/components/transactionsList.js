// New component

class TransactionsList extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = /*html*/`
           <div>
            ${transactions.map(t => `<div>${t.details}</div>`).renderArray()}
           </div>
        `;


    }
}

var transactions = [{
    details: 'asd'
},
    {
        details: 'asd'
    },
    {
        details: 'asd'
    }];

customElements.define("transactions-list", TransactionsList);
