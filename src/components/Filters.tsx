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
      setSearchResults(false);
    }
  };

  return (
    <div className='select-filters'>
      <div className='d-flex py-3 col-8'>
        <select
          id="gender"
          value={selectedGender}
          onChange={handleGenderChange}
          className="form-select form-select-sm single-select select-bs select-filter"
        >
          <optgroup label="GENERO">
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </optgroup>
        </select>
        <select
          id="nationality"
          value={selectedNationality}
          onChange={handleNationalityChange}
          className="form-select form-select-sm single-select select-bs mx-4 select-filter"
        >
          <optgroup label="NACIONALIDAD">
            <option value="US">EEUU</option>
            <option value="FR">Francia</option>
            <option value="ES">España</option>
            <option value="CH">Chile</option>
            <option value="FI">FILANDIA</option>
            <option value="BR">BRASIL</option>
            <option value="IR">IRLANDA</option>
            <option value="TR">TR</option>
            <option value="NZ">NZ</option>
            <option value="NO">NO</option>
            <option value="IE">IE</option>
            <option value="IE">UA</option>
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
