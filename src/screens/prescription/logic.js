import { useState, useEffect } from 'react';

const usePrescriptionLogic = (prescriptionData, routeParams) => {
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Received prescription data:", prescriptionData);
    
    if (prescriptionData && Object.keys(prescriptionData).length > 0) {
      // Use only the real data
      setPrescription(prescriptionData);
      setLoading(false);
    } else {
      setError('No prescription data found');
      setLoading(false);
    }
  }, [prescriptionData, routeParams]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return {
    prescription,
    loading,
    error,
    formatDate
  };
};

export default usePrescriptionLogic;
