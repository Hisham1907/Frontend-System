import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const TableCard = ({ developer, toggleModal, setSelectedDeveloper,getData }) => {
  const { id,firstname,lastname, email, role, department } = developer;
  const handleView = (id) => {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:3001/frontend/${id}`);
      setSelectedDeveloper(data);
      toggleModal("view", developer);
    };
    fetchData();
  };
  const handleEdit = () => {
    toggleModal("update", developer);
  };
  const handleDelete=(id,firstname)=>{
    Swal.fire({
      title: `Are you sure?`,
      text: `You ware going to delete ${firstname}'s data`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const fetchData = async () => {
          await axios.delete(`http://localhost:3001/frontend/${id}`);
        };
        await fetchData();
        getData();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      
      }
    });
   
  }
  return (
    <tr>
      <td className="p-3 text-start text-white">{id}</td>
      <td className="p-3 text-start text-white">{firstname}</td>
      <td className="p-3 text-start text-white">{lastname}</td>
      <td className="p-3 text-start text-white">{email}</td>
      <td className="p-3 text-start text-white">{role}</td>
      <td className="p-3 text-start text-white">{department}</td>
      <td className="p-3">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleView(id)}
        >
          <i className="fa-regular fa-eye"></i>
        </button>
        <button className="btn btn-warning mx-2 text-white btn-sm" onClick={()=>{handleEdit()}}>
          <i className="fa-solid fa-pen-to-square" ></i>
        </button>
        <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(id,firstname)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default TableCard;
