import { CreateUpdateResponsibleModel } from "../models/ResponsibleModel";
import _ApiBase from "./_ApiBase";

export class ExpenseGroupsApi {
   find(): Promise<any> {
      const r = _ApiBase.get('/expense-groups');      
      return r;
   }

   findById(id: string): Promise<any> {
      const r = _ApiBase.get(`/expense-groups/${id}`);      
      return r;
   }

   async create(data: CreateUpdateResponsibleModel): Promise<any> {
      const r = await _ApiBase.post('/expense-groups', data);      
      return r;
   }

   async update(id: string, data: CreateUpdateResponsibleModel): Promise<any> {      
      const r = await _ApiBase.put(`/expense-groups/${id}`, data);      
      return r;
   }

   async delete(id: string): Promise<any> {      
      const r = await _ApiBase.delete(`/expense-groups/${id}`);      
      return r;
   }
}
