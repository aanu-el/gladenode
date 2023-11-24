// import * as axios from 'axios';
const axios = require('axios').default;
// import * as https from 'https';


export class APIRequest {
    protected axiosCall: any;

    constructor(protected merchantId: string, protected merchantKey: string, protected baseUrl: string) {
        this.merchantId = merchantId
        this.merchantKey = merchantKey
        this.baseUrl = baseUrl

        this.axiosCall = axios.create({
            baseURL: this.baseUrl,
            headers: this.setHeaders()
        })

    }

    protected setHeaders() {
        return {
            'mid': this.merchantId,
            'key': this.merchantKey,
            'accept': "application/json",
            'content-type': "application/json",
        }
    }


    public async makeApiCall(method: string, url: string, payload: any) {

        try {
            if (method == "post") {
                const resp = await this.post(url, payload);
                return resp;
            } else if (method == "put") {
                const resp = await this.put(url, payload);
                return resp;
            } else if (method == "patch") {
                const resp = await this.patch(url, payload); 
                return resp;
            } else if (method == "delete") {
                const resp = await this.delete(url, payload);
                return resp;
            } else {
                const resp = await this.get(url);
                return resp;
            }

        } catch (error) {
            return this.handleFailureResponse(error);
        }

    }

    public get(url: string) {
        this.axiosCall.get(url)
            .then((response: any) => {
                return this.handleSuccessResponse(response);
            }).catch((error: any) => {
                return this.handleFailureResponse(error);
            })
    }

    public post(url: string, payload: any) {
        this.axiosCall.post(url, payload)
            .then((response: any) => {
                return this.handleSuccessResponse(response);
            }).catch((error: any) => {
                return this.handleFailureResponse(error);
            })
    }


    public async put(url: string, payload: any) {
        let axiosRes = await this.axiosCall.put(url, payload)
        axiosRes = this.handleResponse(axiosRes);
        return axiosRes;
    }

    public patch(url: string, payload: any) {
        this.axiosCall.patch(url, payload)
            .then((response: any) => {
                return this.handleSuccessResponse(response);
            }).catch((error: any) => {
                return this.handleFailureResponse(error);
            })
    }

    public delete(url: string, payload: any) {
        this.axiosCall.delete(url, payload)
            .then((response: any) => {
                return this.handleSuccessResponse(response);
            }).catch((error: any) => {
                return this.handleFailureResponse(error);
            })
    }

    public handleResponse(responsePayload: any) {

        if (responsePayload.status == 200) {
            return this.handleSuccessResponse(responsePayload);
        } else {
            return this.handleFailureResponse(responsePayload);
        }
    }

    public handleSuccessResponse(responsePayload: any) {
        const response: any = {}
        response["code"] = responsePayload.status;
        response["status"] = "success"
        response["data"] = JSON.stringify(responsePayload.data);

        return response;
    }

    public handleFailureResponse(responsePayload: any) {
        const response: any = {}
        response["code"] = responsePayload.status
        response["status"] = "error"

        if (response["code"] == 401 || response["code"] == "401") { response["message"] = "Ensure merchant key and merchant id is provided" }
        else { response["message"] = JSON.stringify(responsePayload.data) }

        return response;
    }

    public handleCustomResponse(code: number, status: string, message: string) {
        const response: any = {}
        response["code"] = code
        response["status"] = status
        response["message"] = message
        return response;
    }
}