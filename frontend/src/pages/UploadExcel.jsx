// import { useState } from 'react';
// import axios from 'axios';

// const UploadExcel = () => {
//   const [data, setData] = useState([]);
//   const [columns, setColumns] = useState([]);

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append('file', file);

//     const res = await axios.post('http://localhost:5000/api/excel/upload', formData);
//     setData(res.data.data);
//     setColumns(res.data.columns);
//   };

//   return (
//     <div className="p-4">
//       <input type="file" onChange={handleFileChange} accept=".xls,.xlsx" />
//       {data.length > 0 && (
//         <div className="mt-4">
//           <h2 className="font-bold">Preview:</h2>
//           <table className="w-full border">
//             <thead>
//               <tr>{columns.map((col) => <th key={col}>{col}</th>)}</tr>
//             </thead>
//             <tbody>
//               {data.slice(0, 5).map((row, i) => (
//                 <tr key={i}>{columns.map(col => <td key={col}>{row[col]}</td>)}</tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadExcel;
