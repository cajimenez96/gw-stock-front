import { Form, Input, Select } from 'antd';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  RegisterOptions
} from 'react-hook-form';

interface Props {
  name: string;
  label: string;
  type?: "text" | "password" | "select";
  options?: any[];
  placeholder?: string;
  errors: FieldErrors<FieldValues>;
  control?: Control<any>;
  rule?: Omit<RegisterOptions<FieldValues, any>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled" | "password">
}

const ModalInput = ({
  name,
  label,
  type = 'text',
  placeholder,
  options,
  errors,
  control,
  rule
}: Props) => {

  const renderInput = (field: ControllerRenderProps<any, string>, type: "text" | "password" | "select") => {
    return type === 'select' ? (
      <Select {...field} value={field.value.key}>
      {options?.map((option, index) => (
        <Select.Option value={option.value} key={index}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
    ) : type === 'password' ? (
      <Input.Password {...field} placeholder={placeholder} />
    ) : (
      <Input {...field} placeholder={placeholder} />
    )
  }

  return (
    <Form.Item
      label={label}
      validateStatus={errors[name]?.message ? 'error' : ''}
      help={typeof errors[name]?.message === 'string' ? errors[name].message : ''}
    >
      <Controller
        name={name}
        control={control}
        rules={rule}
        render={({ field }) => renderInput(field, type)}
      />
    </Form.Item>
  );
};

export default ModalInput;
