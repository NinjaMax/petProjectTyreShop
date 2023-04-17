declare const sendSmsPass: (valuePass: number, phoneNumber: bigint) => Promise<void | import("axios").AxiosResponse<any, any>>;
export { sendSmsPass };
