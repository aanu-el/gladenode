import { Glade } from "./src/glade";

//  prod credentials
const merchantId = "GP_wxuH2sv2LpUQVrLnqYjABckJ91zq15nC"
const merchantKey = "e76c6e6a-d585-4487-8297-c11ded1e58c2"

//  testing credentials
// const merchantId = "GP_5488aac441cc4de6b4fb597c0b1dba83"
// const merchantKey = "83e0798fafa94bcbbc6ea6203cd9b64b"

const api = new Glade(merchantId, merchantKey, true)

const apiCalls = async function apiCall() {
    let resp = await api.bankList()
    return resp;
}

apiCalls().then(result => console.log(result));