// SubCategory.js
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { adminInstance } from '../Utils/axios';
import AddSubcategoryModal from './modal/AddSubcategoryModal';
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'sub_category_name', headerName: 'Sub_category_name', width: 200 },
  { field: 'category_name', headerName: 'Category_name', width: 200 },
  { field: 'is_active', headerName: 'Active', width: 200 },
];

export default function SubCategory() {
  const [subCategories, setSubCategories] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await adminInstance.get('/sub-categories/');
        const data = response.data;
        setSubCategories(data);
      } catch (error) {
        console.error('Error fetching subcategories', error);
      }
    };

    fetchSubCategories();
  }, []);

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleAddSubcategory = async (newSubCategoryData) => {
    try {
      // Send a POST request to create a new subcategory
      await adminInstance.post('create/sub-categories/', newSubCategoryData);
      showToast('added sub_category','success')
      // After successfully adding a new subcategory, refresh the subcategory list
      await fetchSubCategories();
      
      // Close the modal after adding
      handleAddModalClose();
    } catch (error) {
        showToast('Error adding subcategory','error')
      console.error('Error adding subcategory', error);
      // Handle error and show appropriate feedback to the user
    }
  };


  const fetchSubCategories = async () => {
    try {
      const response = await adminInstance.get('/sub-categories/');
      const data = response.data;
      setSubCategories(data);
    } catch (error) {
      console.error('Error fetching subcategories', error);
    }
  };

  const showToast = (message, type = 'error') => {
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
}
  return (
    <div style={{ backgroundColor: 'pink', height: '100vh' }}>
      <div className="data-grid-container">
        <div className="header d-flex justify-content-between align-items-center mb-4">
          <div style={{ fontWeight: 'bold' }}>SubCategory Management</div>
          <div className="d-flex align-items-center" onClick={handleAddModalOpen}>
            <AiOutlineAppstoreAdd style={{ fontSize: '30px' }} /> Add
          </div>
        </div>
        <DataGrid
          rows={subCategories}
          columns={columns}
          pageSize={5}
          checkboxSelection
          sx={{ backgroundColor: 'white' }}
        />
      </div>

      {/* Add Subcategory Modal */}
      <AddSubcategoryModal
        isOpen={isAddModalOpen}
        onClose={handleAddModalClose}
        onAdd={handleAddSubcategory} // Updated prop name to onAdd
      />
    </div>
  );
}
