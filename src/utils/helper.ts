export class Helper {
    public static validateMultiArray(array: string[]) {
        array.sort((a: any, b: any) => b - a ); // sort in descending order
        return array.length > 0 && Array.isArray(array[0]);
        
    }

    public static validateBulkTransferArray(arrayOfObjects: any[]) {
        const transferData: string[] = ["amount", "accountnumber", "bankcode", "sender_name", "narration", "orderRef"]

        for (const array of arrayOfObjects) {
            if (Object.keys(array).length !== transferData.length || !transferData.every(key => array.hasOwnProperty(key))) {
                return false;
            }
        }

        return true;
        
    }
}