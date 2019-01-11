exports.getPaymentMethods = getPaymentMethods;
exports.handlePayment = handlePayment;

function getPaymentMethods(req, res) {
    var obj = readFile('payment-options.json');
    res.send(obj);
};

function readFile(name){
    var fs = require('fs');
    var obj;
    var path = require('path');
    var jsonPath = path.join(__dirname, '..', 'responses', name);
    obj = JSON.parse(fs.readFileSync(jsonPath));
    return obj;
}

function handlePayment(req, res) {
    var obj;
    var isValid = ValidatePaymentMethod(req.body)
    if(isValid){
        obj = readFile('payment-success.json');
        obj.data.amount = req.body.amount;
    } else{
        obj = readFile('invalid-details.json');
    }
    res.send(obj);

}

function ValidatePaymentMethod(paymentObj){
    var mode = paymentObj.paymentMode;
    if(mode === "Credit" || mode === "Debit"){
        return validatecardDetails(paymentObj.paymentDetails);
    } else if(mode === "NETBANKING"){
        return validateBankingDetails(paymentObj.paymentDetails);
    }
    
}

function validateBankingDetails(bankDetails){
    if(!bankDetails.bankCode || !bankDetails.accountId || !bankDetails.routingId){
        return false;
    } else if( bankDetails.accountId !== '1234567890' && bankDetails.routingId != '987654321'){
        return false;
    }
    return true;
}

function validatecardDetails(cardDetails){
    return validateCardNo(cardDetails.cardNo) && validateCardMonthAndYear(cardDetails.month, cardDetails.year);
}

function validateCardMonthAndYear(month, year) {
    var dateObj = new Date();
    var currMonth  = dateObj.getUTCMonth() + 1;
    var currYear = dateObj.getUTCFullYear();
    if(month < currMonth && currYear<year){
        return false;
    }
    return true;
}

function validateCardNo(cardNo) {
    let value = cardNo;
    let valid = false;
    // The Luhn Algorithm
    if (value) {
        let nCheck = 0, nDigit = 0, bEven = false;
        value = value.replace(/\D/g, "");
        value = value.replace(/ /g, "");

        for (let n = value.length - 1; n >= 0; n--) {
            let cDigit = value.charAt(n),
                nDigit = parseInt(cDigit, 10);

            if (bEven) {
                if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
        }
        valid = (nCheck % 10) == 0;
    }
    return valid
}