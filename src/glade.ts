import { APIRequest } from "./utils/request"
import { Constants } from "./utils/constants"
import { Helper } from "./utils/helper";

export class Glade {
    protected baseUrl;
    protected request;

    constructor(protected merchantId: string, protected merchantKey: string, protected isProduction: boolean = false) {
        this.merchantId = merchantId
        this.merchantKey = merchantKey
        this.baseUrl = isProduction ? Constants.productionEnv : Constants.sandboxEnv

        this.request = new APIRequest(this.merchantId, this.merchantKey, this.baseUrl)
    }

    public async bvnValidation(bvnNumber: string) {
        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.resourceUrl,
            {
                'inquire': 'bvn',
                'bvn': bvnNumber
            }
        )
        return resp
    }

    public async supportedChargeableBanks() {
        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.resourceUrl,
            {
                'inquire': 'supported_chargable_banks'
            }
        )
        return resp
    }

    public async bankList() {
        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.resourceUrl,
            {
                'inquire': 'banks'
            }
        )
        return resp;
    }

    public async verifyAccountName(accountNumber: string, bankCode: string, bankName: string) {
        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.resourceUrl,
            {
                "inquire": "accountname",
                "accountnumber": accountNumber,
                "bankcode": bankCode,
                "bankname": bankName
            }
        )
        return resp;
    }

    public async personalizedAccount(accountName: string, accountEmail: string, accountBvn: string, reference: string, channel: string = "providus") {
        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.resourceUrl,
            {
                "request": "personalized-accounts",
                "name": accountName,
                "reference": reference,
                "email": accountEmail,
                "bvn": accountBvn,
                "bank": channel
            }
        )
        return resp;
    }


    public async createCustomer(name: string, email: string, phoneNumber: string, address: string) {
        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.resourceUrl,
            {
                "request": "customer",
                "address": address,
                "email": email,
                "name": name,
                "phone": phoneNumber
            }
        )
        return resp;
    }

    public async getCustomers() {
        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.resourceUrl,
            {
                "inquire": "customer"
            }
        )
        return resp;
    }

    public async getCustomerDetail(customerId: number) {
        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.resourceUrl,
            {
                "inquire": "customer_detail",
                "customer_id": customerId
            }
        )
        return resp;
    }

    public async getBillCategory(category: any = null) {
        let data = {
            "action": "pull"
        }
        if (category != null) {
            Object.assign(data, { category: category });
        }

        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.billUrl, data)
        return resp;
    }

    public async getBillById(billId: number) {
        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.billUrl,
            {
                "action": "pull",
                "bills_id": billId
            }
        )
        return resp;
    }

    public async resolveBill(payCode: string, reference: string) {
        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.billUrl,
            {
                "action": "resolve",
                "paycode": payCode,
                "reference": reference
            }
        )
        return resp;
    }

    public async purchaseBill(payCode: string, amount: number, reference: string, orderReference: any = null) {
        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.billUrl,
            {
                "action": "resolve",
                "paycode": payCode,
                "reference": reference,
                "amount": amount,
                "orderRef": orderReference
            }
        )
        return resp;
    }

    public async verifyBillPurchase(transactionReference: string) {
        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.billUrl,
            {
                "action": "verify",
                "txnRef": transactionReference
            }
        )
        return resp;
    }

    public async transfer(amount: number, receiverAccountNumber: string, receiverBankCode: string, senderName: string, reference: string, narration: string) {
        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.transferUrl,
            {
                "action": "transfer",
                "amount": amount,
                "accountnumber": receiverAccountNumber,
                "bankcode": receiverBankCode,
                "sender_name": senderName,
                "narration": narration,
                "orderRef": reference
            }
        )
        return resp;
    }

    public async verifySingleTransfer(reference: string) {
        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.transferUrl,
            {
                "action": "verify",
                "txnRef": reference,
            }
        )
        return resp;
    }

    public async bulkTransfer(transferObjects: string[]) {
        if (!Helper.validateMultiArray(transferObjects)) {
            return this.request.handleCustomResponse(400, 'error', 'array object must be a multidimensional array')
        }

        if (!Helper.validateBulkTransferArray(transferObjects)) {
            return this.request.handleCustomResponse(400, 'error', 'Data structure does not match required data, please refer to documentation')
        }

        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.transferUrl,
            {
                "action": "transfer",
                "type": "bulk",
                "data": transferObjects
            }
        )
        return resp;
    }

    public async createPaymentLink(title: string, description: string, amount: number, type: string, payerBearsFees: boolean, acceptNumber: boolean, notificationEmail: string, customLink: any = null, redirectUrl = null, customMessage = null, frequency = null) {
        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.resourceUrl,
            {
                "request": "paylink",
                "title": title,
                "description": description,
                "amount": amount,
                "currency": "NGN",
                "type": type,
                "payer_bears_fees": payerBearsFees,
                "accept_number": acceptNumber,
                "custom_link": customLink,
                "redirect_url": redirectUrl,
                "custom_message": customMessage,
                "notification_email": notificationEmail,
                "frequency": frequency
            }
        )
        return resp;
    }

    public async createTicket(title: string, description: string, amount: number, type: string, payerBearsFees: boolean, acceptNumber: boolean, notificationEmail: string, ticketData: string[], customLink: any = null, redirectUrl = null, customMessage = null, frequency = null) {

        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.resourceUrl,
            {
                "request": "ticket",
                "title": title,
                "description": description,
                "amount": amount,
                "currency": "NGN",
                "type": type,
                "payer_bears_fees": payerBearsFees,
                "accept_number": acceptNumber,
                "custom_link": customLink,
                "redirect_url": redirectUrl,
                "custom_message": customMessage,
                "notification_email": notificationEmail,
                "frequency": frequency,
                "ticket_data": ticketData
            }
        )
        return resp;
    }

    public async invoice(customerId: number, chargeUser: boolean, shipping: number, vat: number, dueDate: string, allowedDiscount: boolean, invoiceItems: string[], note: string, discountType: any = null, invoiceId: string) {
        const resp = await this.request.makeApiCall(Constants.putMethod, Constants.resourceUrl,
            {
                "request": "invoice",
                "invoice_id": invoiceId,
                "currency": "NGN",
                "customer_id": customerId,
                "date_due": dueDate,
                "discount_type": discountType,
                "discount": allowedDiscount,
                "shipping": shipping,
                "vat": vat,
                "note": note,
                "charge_user": chargeUser,
                "items": invoiceItems
            }
        )
        return resp;
    }

}