export interface Client {
    
    id?: number;
    cnpj: string;
    cep: string;
    stateRegistration: string;
    companyName: string;
    tradingName: string;
    group: string;
    billingStreet: string;
    billingHouseNumber: string;
    billingDistrict: string;
    billingCity: string;
    billingState: string;
    billingContact: string;
    billingPhoneNumber: string;
    billingEmail: string;
    businessStreet: string;
    businessHouseNumber: string;
    businessDistrict: string;
    businessCity: string;
    businessState: string;
    businessContact: string;
    businessPhoneNumber: string;
    businessEmail: string;
    deliveryStreet: string;
    deliveryHouseNumber: string;
    deliveryDistrict: string;
    deliveryCity: string;
    deliveryState: string;
    deliveryContact: string;
    deliveryPhoneNumber: string;
    deliveryEmail: string;
    deliveryTime: string;
    purchaseFrequency: string;

}