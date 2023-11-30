import { Glade } from "./src/glade";

const merchantId = ""
const merchantKey = ""

const api = new Glade(merchantId, merchantKey, true)

const apiCalls = async function apiCall() {
    let resp = await api.bankList()
    return resp;
}

apiCalls().then(result => console.log(result));