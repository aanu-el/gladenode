import { Glade } from "../src/glade";

test('return a json response', () => {
    const api = new Glade("GP_wxuH2sv2LpUQVrLnqYjABckJ91zq15nC", "e76c6e6a-d585-4487-8297-c11ded1e58c2", true);
    const apiCalls = async function apiCall() {
        let resp = await api.supportedChargeableBanks()
        return resp;
    }

    apiCalls().then(result => {
        expect(result).toHaveProperty("code", 200);
        expect(result).toHaveProperty("status", "success");
    });
   
});