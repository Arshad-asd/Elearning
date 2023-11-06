import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";

import { adminInstance } from "../Utils/axios";
import "./UserManagement.css";
import CategoryAddModal from "./modal/CategoryAddModal";
import EditCategoryModal from "./modal/EditCategoryModal"; // Import the new modal
import { toast } from "react-toastify";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "category_name", headerName: "Category_name", width: 130 },
  {
    field: "image",
    headerName: "Image",
    width: 130,
    renderCell: (params) => (
      <img
        src={`${params.value}`}
        alt="Category"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ),
  },
  { field: "is_active", headerName: "Active", width: 130 },
];

const showToast = (message, type = "error") => {
  toast[type](message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await adminInstance.get("/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (categoryData) => {
    try {
      await adminInstance.post("/create-categories/", categoryData);
      fetchCategories();
      showToast("Category added", "success");
      setIsAddModalOpen(false);
    } catch (error) {
      showToast("Error adding category", "error");
      console.error("Error adding category", error);
    }
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = async (updatedCategoryData, categoryId) => {
    try {
      await adminInstance.put(`/categories/${categoryId}/`, updatedCategoryData);
      fetchCategories();
      showToast("Category updated", "success");
      setIsEditModalOpen(false);
    } catch (error) {
      showToast("Error updating category", "error");
      console.error("Error updating category", error);
    }
  };
  

  const columnsWithActions = [
    ...columns,
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleEditCategory(params.row)}
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            <BiSolidEdit style={{ fontSize: '24px' ,color:"blue"}} />
          </button>{" "}
        </div>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: "pink", height: "100vh" }}>
      <div className="data-grid-container">
        <div className="header d-flex justify-content-between align-items-center mb-4">
          <div style={{ fontWeight: "bold" }}>Category Management</div>
          <div
            className="d-flex align-items-center"
            onClick={() => setIsAddModalOpen(true)}
          >
            <AiOutlineAppstoreAdd style={{ fontSize: "30px" }} /> Add
          </div>
        </div>
        <div className="h-500 w-full overflow-hidden border border-gray-300">
          <DataGrid
            rows={categories}
            columns={columnsWithActions}
            pageSize={5}
            checkboxSelection
            sx={{ backgroundColor: "white" }}
            isCellEditable={(params) => params.field !== "id"}
            onCellEditCommit={(params) => {
              const updatedData = [...categories];
              updatedData[params.id - 1][params.field] = params.props.value;
              handleUpdateCategory(updatedData[params.id - 1]);
            }}
          />
        </div>

        <CategoryAddModal
          isOpen={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)}
          onAddCategory={handleAddCategory}
        />

<EditCategoryModal
  isOpen={isEditModalOpen}
  onRequestClose={() => setIsEditModalOpen(false)}
  onUpdateCategory={(updatedData) => handleUpdateCategory(updatedData, selectedCategory.id)}
  categoryData={selectedCategory}
/>
      </div>
    </div>
  );
};

export default CategoryManagement;
