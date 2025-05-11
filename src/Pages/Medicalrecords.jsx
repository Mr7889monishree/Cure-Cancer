/* import React from 'react';
import { useStateContext } from '../../context/Index';
import RecordCard from '../../Components/RecordCard';
import { useNavigate } from 'react-router-dom';

const MedicalRecords = () => {
  const { records, searchTerm, setSearchTerm } = useStateContext();
  const navigate = useNavigate();

  const handleNavigate = (recordName) => {
    navigate(`/medical-records/${recordName}`);
  };

  const filteredRecords = records
    .filter(record =>
      record.recordName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aStarts = a.recordName.toLowerCase().startsWith(searchTerm.toLowerCase());
      const bStarts = b.recordName.toLowerCase().startsWith(searchTerm.toLowerCase());

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.recordName.localeCompare(b.recordName);
    });

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search records..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full rounded border border-gray-700 bg-black px-4 py-2 text-white"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filteredRecords.map(record => (
          <RecordCard key={record.id} record={record} onNavigate={handleNavigate} />
        ))}
      </div>
    </div>
  );
};

export default MedicalRecords;
 */
import React from 'react'

const Medicalrecords = () => {
  return (
    <div>Medicalrecords</div>
  )
}

export default Medicalrecords