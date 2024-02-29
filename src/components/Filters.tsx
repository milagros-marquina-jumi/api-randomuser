import React, { useState } from 'react';

const Filters = ({ onFilterChange }: { onFilterChange: (name: string, value: string) => void }) => {
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedNationality, setSelectedNationality] = useState<string>('');
  const [searchResults, setSearchResults] = useState<boolean | null>(null);

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGender(e.target.value);
  };

  const handleNationalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedNationality(e.target.value);
  };

  const handleSearch = () => {
    if (selectedGender !== '' || selectedNationality !== '') {
      onFilterChange('gender', selectedGender);
      onFilterChange('nationality', selectedNationality);
      setSearchResults(true);
    } else {
      onFilterChange('gender', '');
      onFilterChange('nationality', '');
      setSearchResults(null);
    }
  };

  return (
    <div className='select-filters'>
      <div className='d-flex py-3 col-8'>
        <select
          id="nationality"
          value={selectedNationality}
          onChange={handleNationalityChange}
          className="form-select form-select-sm single-select select-bs select-filter"
        >
          <optgroup label="NACIONALIDAD">
            <option value="">Todos</option>
            <option value="US">US</option>
            <option value="FR">FR</option>
            <option value="ES">ES</option>
            <option value="CH">CH</option>
            <option value="FI">FI</option>
            <option value="MX">MX</option>
            <option value="BR">BR</option>
            <option value="IR">IR</option>
            <option value="TR">TR</option>
            <option value="NZ">NZ</option>
            <option value="NO">NO</option>
            <option value="IE">IE</option>
            <option value="GB">GB</option>
            <option value="CA">CA</option>
            <option value="NZ">NZ</option>
            <option value="RS">RS</option>
            <option value="IN">IN</option>
            <option value="NL">NL</option>
          </optgroup>
        </select>
        <select
          id="gender"
          value={selectedGender}
          onChange={handleGenderChange}
          className="form-select form-select-sm single-select select-bs mx-4 select-filter"
        >
          <optgroup label="GENERO">
            <option value="">Todos</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </optgroup>
        </select>
      </div>
      <button onClick={handleSearch} className="btn btn-sm btn-primary px-4 me-2" id="filtrosBtn">
        <i className="bi bi-search"></i> Buscar
      </button>
    </div>
  );
};

export default Filters;
