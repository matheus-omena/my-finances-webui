import { Controller, FieldValues, UseFormReturn } from "react-hook-form";

type SelectProps = {
   label: string;
   value: any;
};

type Props = {
   form: UseFormReturn<FieldValues | any>;
   name: string;
   label?: any;
   className?: string;
   defaultValue?: string | number;
   disabled?: boolean;
   options?: SelectProps[];
   onBlur?: any;
};

export function Select(props: Props) {
   return (
      <div className={`${props.className} px-2 mb-5`}>
         <Controller
            name={props.name}
            control={props.form.control}
            render={({ field: { onChange, value } }) => (
               <>
                  <label htmlFor={props.name} className="block text-gray-700 text-sm font-bold mb-2">
                     {props.label}
                  </label>
                  <select
                     className={`bg-transparent rounded-md w-full p-3 text-white text-sm leading-tight border focus:ring-0
                        ${props.form.formState.errors[props.name] ? "border-red-500 focus:border-red-500" : "border-gray-700 focus:border-gray-700"}`}                     
                     onChange={onChange}
                     value={value}
                     onBlur={props.onBlur}
                     disabled={props.disabled}
                  >                     
                     {props.options?.map((item) => {
                        return (
                           <option value={item.value} key={item.value}>
                              {item.label}
                           </option>
                        );
                     })}
                  </select>
                  {props.form.formState.errors[props.name] && (
                     <small className="text-red-500 text-xs">
                        <>
                           *{props.form.formState.errors[props.name]?.message || "Valor inválido"}
                        </>
                     </small>
                  )}
               </>
            )}
         />
      </div>
   );
}
