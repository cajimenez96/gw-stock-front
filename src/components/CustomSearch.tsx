import { Input } from "antd"
import { ChangeEvent } from "react";

interface CustomSearchProps {
  placeholder?: string;
  name?: string;
  label?: string;
  id?: string;
  value?: string | number;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch?: (e: string) => void;
}

const { Search } = Input;

const CustomSearch = ({
  value,
  placeholder = '',
  label,
  id,
  name = 'name',
  handleChange,
  handleSearch,
}: CustomSearchProps) => {
  
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <Search
        id={id}
        name={name}
        placeholder={placeholder}
        enterButton
        value={value}
        onChange={handleChange}
        onSearch={handleSearch}
        style={{ marginTop: 10 }}
      />
    </>
  )
}

export default CustomSearch