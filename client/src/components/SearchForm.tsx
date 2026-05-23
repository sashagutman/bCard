import { FunctionComponent } from "react";

interface SearchFormProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: () => void; // 👈 добавили
  }
  
  const SearchForm: FunctionComponent<SearchFormProps> = ({ value, onChange, onSubmit }) => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (onSubmit) onSubmit(); 
    };
  
    return (
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button type="submit" className="search-button">Go</button>
      </form>
    );
  };
  
  export default SearchForm;