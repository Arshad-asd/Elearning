import React, { useState, useEffect } from 'react';
import { adminInstance } from '../../Utils/axios';
import "./CategoryAdd.css";

const AddSubcategoryModal = ({ isOpen, onClose, onAdd }) => {
  const [newSubCategory, setNewSubCategory] = useState({
    sub_category_name: '',
    category_name: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await adminInstance.get('/categories/');
        const data = response.data;
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubCategory((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddSubCategory = () => {
    // Validation for sub_category_name
    if (newSubCategory.sub_category_name.length < 3) {
      alert('Subcategory name should be at least 3 characters');
      return;
    }

    // Pass the new subcategory data to the onAdd function in the parent component
    onAdd(newSubCategory);
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Subcategory</h2>
        <label htmlFor="sub_category_name">Subcategory Name:</label>
        <input
          type="text"
          id="sub_category_name"
          name="sub_category_name"
          value={newSubCategory.sub_category_name}
          onChange={handleInputChange}
        />
        <label htmlFor="category_name">Category Name:</label>
        <select
          id="category_name"
          name="category_name"
          value={newSubCategory.category_name}
          onChange={handleInputChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.category_name}>
              {category.category_name}
            </option>
          ))}
        </select>
        <button onClick={handleAddSubCategory}>Add Subcategory</button>
      </div>
    </div>
  );
};

export default AddSubcategoryModal;





import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { adminInstance } from '../Utils/axios';
import AddSubcategoryModal from './modal/AddSubcategoryModal';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'sub_category_name', headerName: 'Sub_category_name', width: 200 },
  { field: 'category_name', headerName: 'Category_name', width: 200 },
  { field: 'is_active', headerName: 'Active', width: 200 },
];

const SubCategory = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  // Define fetchSubCategories outside the useEffect block
  const fetchSubCategories = async () => {
    try {
      const response = await adminInstance.get('/sub-categories/');
      const data = response.data;
      setSubCategories(data);
    } catch (error) {
      console.error('Error fetching subcategories', error);
    }
  };

  useEffect(() => {
    // Fetch subcategories on component mount
    fetchSubCategories();
  }, []);

  const handleAddModalOpen = () => {
    console.log('Opening Add Modal');
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleAddSubCategory = async (newSubCategory) => {
    try {
      // Add logic to send the new subcategory data to the backend
      await adminInstance.post('/sub-categories/', newSubCategory);

      // Refresh the subcategory list after adding
      fetchSubCategories();
      setAddModalOpen(false);
    } catch (error) {
      console.error('Error adding subcategory', error);
    }
  };

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
        onAdd={handleAddSubCategory}
      />
    </div>
  );
};

export default SubCategory;


