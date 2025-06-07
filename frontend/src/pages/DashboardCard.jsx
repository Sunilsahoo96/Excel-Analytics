import React, { useState, useRef } from 'react';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { FileUpload } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { setExcelData } from '../redux/excelSlice'; // Adjust if path differs

const StyledDropArea = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '100px',
  borderRadius: '12px',
  width: '600px',
  border: '2px dashed #d9d9d9',
  backgroundColor: '#fafafa',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'border-color 0.3s ease, background-color 0.3s ease',
  '&:hover': {
    borderColor: '#40a9ff',
    backgroundColor: '#e6f7ff',
  },
  '&:active': {
    borderColor: '#096dd9',
    backgroundColor: '#d0f0fd',
  },
}));

const StyledInput = styled('input')({
  display: 'none',
});

const ConvertButton = styled(Button)(() => ({
  marginTop: '30px',
  backgroundColor: '#1890ff',
  color: 'white',
  fontWeight: 'bold',
  borderRadius: '6px',
  padding: '12px 24px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#096dd9',
  },
  '&:active': {
    backgroundColor: '#074d9e',
  },
}));

const FileUploadButton = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      setFileName(files[0].name);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      setFileName(files[0].name);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    // Step 1: Upload file to backend
    const formData = new FormData();
    formData.append('excelFile', file);

    try {
      const uploadRes = await fetch('http://localhost:5000/api/excel/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // <-- Add this
        },
      });
      

      if (!uploadRes.ok) {
        throw new Error('Failed to upload file to database');
      }

      console.log("✅ File successfully uploaded to backend");
    } catch (err) {
      console.error("❌ Error uploading file:", err.message);
    }

    // Step 2: Parse the file in frontend and navigate (existing functionality)
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      dispatch(setExcelData(jsonData));
      navigate('/visualize');
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        maxWidth: '1000px',
        margin: '0 auto',
        marginTop: '150px',
        border: '1px solid #e0e0e0',
      }}
    >
      <Typography variant="h6" color="textSecondary" style={{ marginBottom: '16px' }}>
        Upload file
      </Typography>
      <StyledDropArea onDrop={handleDrop} onDragOver={handleDragOver} onClick={handleClick}>
        <FileUpload style={{ fontSize: '48px', color: '#888' }} />
        <Typography variant="h6" color="textSecondary" style={{ marginTop: '16px' }}>
          Drop items here or <span style={{ color: '#1890ff', textDecoration: 'underline' }}>Browse files</span>
        </Typography>
      </StyledDropArea>

      <StyledInput type="file" ref={fileInputRef} onChange={handleFileChange} accept=".xls,.xlsx" />

      {fileName && (
        <Typography
          variant="body2"
          color="textSecondary"
          style={{
            marginTop: '20px',
            fontSize: '14px',
          }}
        >
          Selected File: {fileName}
        </Typography>
      )}

      <ConvertButton onClick={handleConvert}>Convert</ConvertButton>
    </div>
  );
};

export default FileUploadButton;
