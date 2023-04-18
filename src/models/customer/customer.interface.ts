export class customerSensetiveData {
    firstName: string;
    lastName: string;
    patronymic: string;
}


export class customerAddress {
    country: string;
    city: string;
    home: string;
    room: string;
}

export class customerPaymentMethod {
    number: string;
    name: string;
    cvv: string;
}

export class customerPlanData {
    availableInternet: number;
    availableSms: number;
    availableCalls: number;
    availableMinutes: number;
}

export class customerBanAndReason {
    isBan: boolean;
    reason: string;
}

export class customerDocumentData {
    documentNumber: string
    documentCode: string
    identicalCode: string
    dateOfCreateDocument: Date
    dateOfExpiredDocument: Date
}
