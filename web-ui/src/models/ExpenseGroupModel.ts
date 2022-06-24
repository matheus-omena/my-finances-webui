export interface ExpenseGroupModel {
   id: string;
   name: string;  
   color: string; 
   type: number;
   paymentDay?: number;
   category: {
      id: string;
      name: string;
   };   
};
export interface CreateUpdateExpenseGroupModel { 
   id?: string;
   name: string;  
   color: string; 
   type: number;
   paymentDay?: number;
   categoryId: string;  
};

export interface ExpenseGroupWithGroupedExpensesModel { 
   id: string;
   name: string;  
   color: string; 
   totalValue: number;
   paymentPercentual: number;   
};