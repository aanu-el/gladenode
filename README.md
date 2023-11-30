## About

To Learn more, visit https://developer.gladefinance.co/docs

## Getting Started 
You need a Merchant ID and Key to authenticate against the API, please contact support@gladefinance.co to setup a demo account.

## Installation
Simply run the 

```` 
npm install glade-api-nodejs 

```` 
in your project.

## Usage
````
import { Glade } from "glade-api-nodejs";

const merchantId = ""
const merchantKey = ""

const api = new Glade(merchantId: string, merchantKey: string, isProd: boolean) //isProd = false by default

const apiCalls = async function apiCall() {
    let resp = await api.bankList()
    return resp;
}

apiCalls().then(result => console.log(result));


````


## Set environment


For Production environment
```` 
const api = new Glade($merchantId, $merchantKey, true); 
````

For Sandbox environment
```` 
const api = new Glade($merchantId, $merchantKey, false); 
````

## Methods
BVN Verification
````
const apiCalls = async function apiCall(){
    let result = await api.bvnValidation()
    return result;
} 
apiCalls().then(result => console.log(result));
````


Get Chargeable Banks
```` 
const apiCalls = async function apiCall(){
    let result = await api.supportedChargeableBanks()
    return result;
} 
apiCalls().then(result => console.log(result));

Sample Response Data: 
{
    "code": "200",
    "status":"success",
    "data":
            {
                "bankname":"3LINE CARD MANAGEMENT LIMITED",
                "bankcode":"110005"
            }
}
````

Get Bank List
```` 
const apiCalls = async function apiCall(){
    let result = await api.bankList()
    return result;
} 
apiCalls().then(result => console.log(result));

Sample Response Data:
{
    code: 200,
    status: "success",
    data: {
        "110005":"3LINE CARD MANAGEMENT LIMITED",
        "120001":"9 PAYMENT SOLUTIONS BANK",
        "090270":"AB MICROFINANCE BANK",
        "070010":"ABBEY MORTGAGE BANK",
        "090260":"ABOVE ONLY MICROFINANCE BANK",
        "090197":"ABU MICROFINANCE BANK",
        "90202":"ACCELEREX NETWORK LIMITED",
        "090202":"ACCELEREX NETWORK LIMITED",
        "044":"Access Bank"
    }
}

````

Verify Account Name
```` 
const apiCalls = async function apiCall(){
    let result = await api.verifyAccountName(string accountNumber, string bankCode, string bankName);
    return result;
} 
apiCalls().then(result => console.log(result));

````

Get Personalized Account Info
```` 
const apiCalls = async function apiCall(){
    let result = await api.personalizedAccount(string accountName, string accountEmail, string accountBvn, string reference, string channel = "providus");
    return result;
} 
apiCalls().then(result => console.log(result));

````

Create Customer
```` 
const apiCalls = async function apiCall(){
    let result = await api.createCustomer(string name, string email, string phoneNumber,  string address); 
    return result;
} 
apiCalls().then(result => console.log(result));

````

Get All Customers
```` 
const apiCalls = async function apiCall(){
    let result = await api.getCustomers();
    return result;
} 
apiCalls().then(result => console.log(result));

````

Get A Single Customer's Details
```` 
const apiCalls = async function apiCall(){
    let result = await api.getCustomerDetail(number customerId); 
    return result;
} 
apiCalls().then(result => console.log(result));

````

Get All Bill Categories
```` 
const apiCalls = async function apiCall(){
    let result = await api.getBillCategory(string category = null);
    return result;
} 
apiCalls().then(result => console.log(result));

````

Get Bill ID
```` 
const apiCalls = async function apiCall(){
    let result = await api.getBillById(number billId);
    return result;
} 
apiCalls().then(result => console.log(result));

````

Resolve Bill
```` 
const apiCalls = async function apiCall(){
    let result = await api.resolveBill(string payCode, string reference); 
    return result;
} 
apiCalls().then(result => console.log(result));

````

Purchase Bill
```` 
const apiCalls = async function apiCall(){
    let result = await api.purchaseBill(string payCode, number amount, string reference, string orderReference = null);  
    return result;
} 
apiCalls().then(result => console.log(result));

````

Verify Bill Purchase
```` 
const apiCalls = async function apiCall(){
    let result = await api.verifyBillPurchase(string transactionReference); 
    return result;
} 
apiCalls().then(result => console.log(result));

````

Make A Single Transfer
```` 
const apiCalls = async function apiCall(){
    let result = await api.transfer(number amount, string receiverAccountNumber, string receiverBankCode, string senderName, string reference, string narration);
    return result;
} 
apiCalls().then(result => console.log(result));

````

Verify Single Transfer
```` 
const apiCalls = async function apiCall(){
    let result = await api.verifySingleTransfer(string reference); 
    return result;
} 
apiCalls().then(result => console.log(result));

````

Make Bulk Transfer
```` 
const apiCalls = async function apiCall(){
    let result = await api.bulkTransfer(array transferObjects); 
    return result;
} 
apiCalls().then(result => console.log(result));

````

Create Payment Link
````
const apiCalls = async function apiCall(){
    let result = await api.createPaymentLink(string title, string description, number amount, string type, bool payerBearsFees, bool acceptNumber, string notificationEmail, string customLink = null, string redirectUrl = null, string customMessage = null, string frequency = null); 
    return result;
} 
apiCalls().then(result => console.log(result));

 ````

Create Ticket
````
const apiCalls = async function apiCall(){
    let result = await api.createTicket(string title, string description, number amount, string type, bool payerBearsFees, bool acceptNumber, string notificationEmail, array ticketData, string customLink = null, string redirectUrl = null, string customMessage = null, string frequency = null); 
    return result;
} 
apiCalls().then(result => console.log(result));
 
````

Create Invoice
```` 
const apiCalls = async function apiCall(){
    let result = await api.invoice(number customerId, bool chargeUser, number shipping, number vat, string dueDate,  bool allowedDiscount, array invoiceItems, string note, string discountType= null, string invoiceId); 
    return result;
} 
apiCalls().then(result => console.log(result));

````


## Return Values
All methods return a JSON object.
