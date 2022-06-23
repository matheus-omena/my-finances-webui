export interface ExpenseModel {
   id: string;
   name: string;
   value: number;
   paymentDay: number;
   paymentMonth: number;
   totalInstallments: number;
   currentInstallment: number;
   isPaid: boolean;
   dateItWasPaid: Date;
   responsibleId: string;
   groupId: string;
   fixedExpenseId: string;
};

export interface CreateUpdateExpenseModel {
   name: string;
   isFixed: boolean;
   value: number;
   responsibleId: string;
   groupId: string;
   paymentDay?: number;
};