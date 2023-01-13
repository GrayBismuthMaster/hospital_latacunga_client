import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DatePickerField = ({ ...props }:any) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val:any) => {
        setFieldValue(field.name, val);
      }}
      dateFormat="yyyy/MM/dd"
      isClearable
      showYearDropdown
      scrollableMonthYearDropdown
      placeholderText="Fecha de Nacimiento"
    />
  );
};