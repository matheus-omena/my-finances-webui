import { CreateUpdateExpenseModel } from "../models/ExpenseModel";
import _ApiBase from "./_ApiBase";

export class ExpensesApi {
   find(): Promise<any> {
      const r = _ApiBase.get('/expenses');      
      return r;
   }

   findById(id: string): Promise<any> {
      const r = _ApiBase.get(`/expenses/${id}`);      
      return r;
   }

   findByGroup(groupId: string, month: number): Promise<any> {
      const r = _ApiBase.get(`/expenses/bygroup/${groupId}/month/${month}`);
      return r;
   }

   async create(data: CreateUpdateExpenseModel): Promise<any> {
      const r = await _ApiBase.post('/expenses', data);      
      return r;
   }

   async update(id: string, data: CreateUpdateExpenseModel): Promise<any> {      
      const r = await _ApiBase.put(`/expenses/${id}`, data);      
      return r;
   }

   async delete(id: string): Promise<any> {      
      const r = await _ApiBase.delete(`/expenses/${id}`);      
      return r;
   }
}
