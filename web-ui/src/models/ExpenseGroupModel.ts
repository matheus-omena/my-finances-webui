export interface ExpenseGroupModel {
   id: string;
   name: string;  
   color: string; 
   type: number;
   paymentDay?: number;
   category: {
      name: string;
   };   
};

export interface CreateUpdateExpenseGroupModel {   
   name: string;  
   color: string; 
   type: number;
   paymentDay?: number;
   categoryId: string;  
};