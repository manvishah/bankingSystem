import React, { useState } from "react";
import { useSelector } from "react-redux";
import TableDatas from "./TablesData";

export default function ViewTransactions() {
  const { usersData } = useSelector((state) => state.auth);
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChange = (e) => {
    setFilterType(e.target.value);
  };

  // Filter and search logic
  const filteredData = usersData.filter((item) => {
    const matchesSearch =
      item.customerAccountNo === searchTerm ||
      item?.customerName?.toLowerCase().includes(searchTerm?.toLowerCase());
    const matchesFilter = filterType === "all" || item.status === filterType;
    return matchesSearch && matchesFilter;
  });

  
  return (
    <div className='d-flex flex-column'>
      <div className='d-flex flex-row align-items-center'>
        <div className='col-4 mt-lg-3 m-4'>
          <select name='' id='' className='form-select' onChange={handleChange}>
            <option hidden={true}>Filter by Status</option>
            <option value='active'>active</option>
            <option value='inactive'>inactive</option>
            <option value='all'>all</option>
          </select>
        </div>
        <div className='col-4 mt-lg-3 m-4'>
          <input
            className='form-control'
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <table className='table text-center w-75 m-auto mt-3 shadow border '>
        <thead className='bg-light'>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Account Number</th>
            <th scope='col'>Account Balance</th>
            <th scope='col'>Contact Number</th>
            <th scope='col'>Email Id</th>
            <th scope='col'>PanCard Number</th>
            <th scope='col'>Adhar Card Number</th>
            <th scope='col'>Status</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((data) => (
            <TableDatas data={data} key={data.customerId} />
          ))}
        </tbody>
      </table>
    </div>
  );
}


