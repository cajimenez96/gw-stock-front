import { Input } from "antd"

interface CustomSearchProps {
  placeholder?: string;
  setQuery: (e: string) => void;
}

const { Search } = Input;

const CustomSearch = ({
  placeholder = '',
}: CustomSearchProps) => {
  const handleSearch = (e) => {
    console.log(e)
  }

  return (
    <Search
      placeholder={placeholder}
      enterButton
      onSearch={handleSearch}
    />
  )
}

export default CustomSearch