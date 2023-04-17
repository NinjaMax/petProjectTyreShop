var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { $hostPost } from './index';
const sendSmsPass = (valuePass, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    return yield $hostPost
        .post('/api/v2/api.php', {
        auth: {
            key: 'n7GyAj36j6uZyBA5y1AUwVxNZrml9R2r',
        },
        action: 'GETBALANCE',
        data: {},
    })
        .catch((error) => {
        console.log('Не вистачає залишків, або не вірно вказані дані', error);
    });
});
export { sendSmsPass };
