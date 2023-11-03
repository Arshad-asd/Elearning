import React ,{useState}from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './UserManagement.css'
import {AiOutlineAppstoreAdd} from 'react-icons/ai'
import { adminInstance } from '../Utils/axios';
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'category_name', headerName: 'Category_name', width: 130 },
  { field: 'image', headerName: 'image', width: 130 },
  { field: 'is_active', headerName: 'Active', width: 130 },

];

const rows = [
  { id: 1, category_name: 'Programing', image: '',is_active:'active' },
  { id: 2, category_name: 'UI/UX designing', image: '',is_active:'active'  },
  { id: 3, category_name: 'Mathematics', image: '',is_active:'active' },
  { id: 4, category_name: 'Science', image: '',is_active:'active'  },
  { id: 5, category_name: 'DBMS', image: '', is_active:'active' },
  { id: 6, category_name: 'RDBMS', image: '', is_active:'active' },
  { id: 7, category_name: 'ML', image: '', is_active:'active' },
  { id: 8, category_name: 'Cybersecurity', image: '', is_active:'active' },
  { id: 9, category_name: 'Web developement', image: '',is_active:'active' },
];

const CategoryManage = () => {
   
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryImage, setNewCategoryImage] = useState('');
  
    const handleAddCategory = async () => {
      try {
        // Send an HTTP POST request to the backend to add a new category
        await adminInstance.post('your_backend_api_url', {
          category_name: newCategoryName,
          image: newCategoryImage,
          // other fields as needed
        });
  
        // Refresh the data or perform any other necessary actions
      } catch (error) {
        console.error('Error adding category', error);
      }
    };


  return (
    <div className="data-grid-container">
         <div className="header d-flex justify-content-between align-items-center mb-4">
         <div style={{ fontWeight: 'bold' }}>
               CategoryManagement
         </div>
          <div className="d-flex align-items-center">
            <AiOutlineAppstoreAdd style={{fontSize: '30px'}}/> Add
          </div>
        </div>
      <div className="h-96 w-full overflow-hidden border border-gray-300">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default CategoryManage;
