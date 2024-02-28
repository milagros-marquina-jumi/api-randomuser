import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';

import Filters from './Filters';
import { Student } from '../service/Student';

const Table = ({ students, onFilterChange }: { students: Student[], onFilterChange: (name: string, value: string) => void }) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [filterCounts, setFilterCounts] = useState<{ [key: string]: number }>({});
  const [displayedStudents, setDisplayedStudents] = useState<Student[]>([]); // Estado para mantener los estudiantes mostrados en la tabla
  const [genders, setGenders] = useState<string[]>([]);
  const [nationalities, setNationalities] = useState<string[]>([]);
  const [filters, setFilters] = useState<{ gender: string; nationality: string }>({
    gender: '',
    nationality: '',
  });


  useEffect(() => {
    calculateFilterCounts(students);
    setDisplayedStudents(students);
    const uniqueGenders = Array.from(new Set(students.map(student => student.gender)));
    const uniqueNationalities = Array.from(new Set(students.map(student => student.nationality)));
    setGenders(uniqueGenders);
    setNationalities(uniqueNationalities);
  }, [students]);

  useEffect(() => {
    const filteredStudents = students.filter(student => {
      return (
        (filters.gender === '' || student.gender === filters.gender) &&
        (filters.nationality === '' || student.nationality === filters.nationality)
      );
    });
    setDisplayedStudents(filteredStudents);
  }, [students, filters]);

  const calculateFilterCounts = (students: Student[]) => {
    const counts: { [key: string]: number } = {};

    students.forEach(student => {
      Object.entries(student).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'name') {
          if (!counts[value]) {
            counts[value] = 0;
          }
          counts[value]++;
        }
      });
    });

    setFilterCounts(counts);
  };

  const handleEditClick = () => {
    selectedIndices.forEach(index => {
      if (students[index]) {
        console.log(`Editando estudiante: ${students[index].name}`);
      }
    });
  };

  const handleDeleteClick = () => {
    const deletedStudents = selectedIndices.map(index => students[index]?.name).filter(Boolean);
    const updatedStudents = students.filter((_, index) => !selectedIndices.includes(index));
    setSelectedIndices([]);
    if (deletedStudents.length > 0) {
      console.log(`Se eliminaron los estudiantes: ${deletedStudents.join(', ')}`);
      setDisplayedStudents(updatedStudents); // Actualizar la lista de estudiantes mostrados después de eliminar
    } else {
      console.log('No se seleccionaron estudiantes para eliminar.');
    }
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    // onFilterChange(name, value);
  };

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="dt-title">
            <h2>Mi tabla</h2>
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <Buttons onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
        </div>
        <div className="col-sm-12 mt-4 filtros-content">
          <Filters onFilterChange={handleFilterChange} genders={genders} nationalities={nationalities} />
        </div>
        <div className="col-sm-12 pt-1">
          <DataTable students={displayedStudents} selectedIndices={selectedIndices} setSelectedIndices={setSelectedIndices} filterCounts={filterCounts} />
        </div>
      </div>
    </div>
  );
};

const Buttons = ({ onEditClick, onDeleteClick }: { onEditClick: () => void, onDeleteClick: () => void }) => {
  return (
    <div className="d-flex justify-content-end align-items-center">
      <button className="btn btn-sm btn-outline-primary px-4 me-2" id="filtrosBtn">
        <i className="bi bi-sliders"></i> Filtros
      </button>
      <button className="btn btn-sm btn-outline-primary px-4 me-2" onClick={onEditClick}>
        <i className="bi bi-pencil"></i> Editar
      </button>
      <button className="btn btn-sm btn-outline-danger px-4 me-2" onClick={onDeleteClick}>
        <i className="bi bi-trash3"></i> Eliminar
      </button>
    </div>
  );
};

const DataTable = ({ students, selectedIndices, setSelectedIndices, filterCounts }: { students: Student[], selectedIndices: number[], setSelectedIndices: React.Dispatch<React.SetStateAction<number[]>>, filterCounts: { [key: string]: number } }) => {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (tableRef.current && students.length > 0) {
      const table = $(tableRef.current).DataTable({
        paging: true,
        pageLength: 10,
        destroy: true, // Agregado para destruir la tabla anterior al actualizarla
        data: students,
        columns: [
          {
            data: null,
            defaultContent: '',
            orderable: false,
            searchable: false,
            className: 'dt-checkbox',
            render: (_: any, __: any, index: number) => `<input type="checkbox"/>`
          },
          { data: 'name', searchable: true },
          { data: 'gender', searchable: true },
          { data: 'email', searchable: true },
          { data: 'phone', searchable: true },
          { data: 'nationality', searchable: true },
        ],
      });

      $(tableRef.current).on('change', '.dt-checkbox input[type="checkbox"]', function () {
        const index = table.row($(this).closest('tr')).index(); // Obtener el índice de la fila seleccionada
        if ($(this).is(':checked')) {
          setSelectedIndices(prevIndices => [...prevIndices, index]);
        } else {
          setSelectedIndices(prevIndices => prevIndices.filter(i => i !== index));
        }
      });

      return () => {
        table.destroy();
      };
    }
  }, [students, setSelectedIndices]);

  return (
    <div className="dt-example">
      <table ref={tableRef} className="table table-hover table-light" id="example">
        <thead>
          <tr>
            <th scope="col">
              <i className="bi bi-check-lg"></i>
            </th>
            <th scope="col">Nombre</th>
            <th scope="col">Género</th>
            <th scope="col">Correo electrónico</th>
            <th scope="col">Celular</th>
            <th scope="col">Nacionalidad</th>
          </tr>
        </thead>
        <tbody />
      </table>
    </div>
  );
};

export default Table;
