import { environment } from './../../environments/environment';

const apiServer = environment.serverPath;

export class AppSettings {
    public static apiEndpoints = {
        coins: {
            fetchCoins: `${apiServer}/api/coins`,
        },
        paymentMethod: {
            fetchPaymentMethods: `${apiServer}/api/payment-methods`,
            makePayment: `${apiServer}/api/make-payment`
        }
    };

    public static config = {
        bankingCard: {
            months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            maxYear: 2050
        }
    };
}
