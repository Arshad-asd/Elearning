// EditCourseModal.js

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaTimes, FaTrash } from "react-icons/fa";
import { FcAddImage } from "react-icons/fc";
import { toast } from 'react-toastify';

Modal.setAppElement("#root");

export default function EditCourseModal({
  isOpen,
  onRequestClose,
  onUpdateCourse,
  courseData
}) {
  const [formError, setFormError] = useState({});
  const [courseName, setCourseName] = useState(courseData?.course_name || "");
  const [selectedPreviewVideo, setSelectedPreviewVideo] = useState(null);

  useEffect(() => {
    setCourseName(courseData?.course_name || "");
  }, [courseData]);

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    const errors = validate(courseName);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const updatedCourseData = new FormData();
        updatedCourseData.append('course_name', courseName);

        if (selectedPreviewVideo) {
          updatedCourseData.append('preview_video', selectedPreviewVideo);
        }

        updatedCourseData.append('courseId', courseData.id);

        const response = await onUpdateCourse(updatedCourseData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response === null) {
          setCourseName("");
          setFormError({});
          setSelectedPreviewVideo(null);
          onRequestClose();
          showToast('Course updated successfully!', 'success');
        }
      } catch (error) {
        console.error('Error updating course:', error.response.data);
        showToast('Error updating course', 'error');
      }
    }
  };

  const handlePreviewVideoChange = (e) => {
    const file = e.target.files[0];
    setSelectedPreviewVideo(file);
  };

  const handleRemovePreviewVideo = () => {
    setSelectedPreviewVideo(null);
  };

  const validate = (courseName) => {
    const errors = {};

    if (!courseName) {
      errors.courseName = "Course name is required";
    } else if (courseName.length < 3) {
      errors.courseName = "Enter at least 3 characters";
    }

    return errors;
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
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Course Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="modal-content p-4">
        <div className="header">
          <div className="close-icon" onClick={onRequestClose}>
            <FaTimes className="text-gray-500 hover:text-red-500 cursor-pointer" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mt-4">Edit Course</h2>
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full border rounded p-2 mt-2"
        />
        <span className="text-red-500">
          {formError?.courseName ? formError.courseName : ""}
        </span>

        <div className="preview-video-input mt-4">
          {/* Preview Video Preview */}
          {selectedPreviewVideo ? (
            <div className="preview-video-preview-container" style={{ display: "flex", justifyContent: "space-between" }}>
              <video
                width="100%"
                height="100%"
                controls
              >
                <source src={typeof selectedPreviewVideo === 'string' ? selectedPreviewVideo : URL.createObjectURL(selectedPreviewVideo)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div
                className="remove-preview-video text-red-500 cursor-pointer"
                onClick={handleRemovePreviewVideo}
              >
                <FaTrash />
              </div>
            </div>
          ) : (
            // Upload Preview Video Button
            <div
              style={{
                color: "#fff",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
              }}
              onClick={() => document.getElementById("editCoursePreviewVideo").click()}
            >
              <FcAddImage
                style={{ marginRight: "5px", height: "100px", width: "100px" }}
              />
              <input
                type="file"
                id="editCoursePreviewVideo"
                accept=".mp4"
                onChange={handlePreviewVideoChange}
                style={{ display: "none" }}
              />
            </div>
          )}
        </div>

        <div className="buttonDiv mt-4">
          <button
            onClick={handleUpdateCourse}
            className="add-button bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mx-auto"
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
}
