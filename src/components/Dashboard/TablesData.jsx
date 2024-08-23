import { useDispatch } from "react-redux";
import {
  deleteAccount,
  transactionHistoryData,
} from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

const TableDatas = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (customerID) => {
    dispatch(deleteAccount(customerID));
  };

  const handleTransactionData = (id) => {
    try {
      const result = dispatch(transactionHistoryData(id));
      result && navigate(`/transactionHistory/${id}`);
    } catch (error) {
      console.error("Login failed:", error);
      navigate("/error");
    }
  };

  return (
    <tr>
      <th scope='row'>{data.customerName}</th>
      <td>{data.customerAccountNo}</td>
      <td>{data.customerAccountBalance}</td>
      <td>{data.customerContact}</td>
      <td>{data.customerEmail}</td>
      <td>{data.customerPan}</td>
      <td>{data.customerAadhar}</td>
      <td>{data.status}</td>
      <td>
        <button
          type='button'
          className='btn btn-outline-danger action-btn'
          onClick={() => handleDelete(data.customerId)}
        >
          Delete
        </button>
        <button
          type='button'
          className='btn btn-outline-danger action-btn'
          onClick={() => handleTransactionData(data.customerId)}
        >
          View Transaction History
        </button>
      </td>
    </tr>
  );
};

export default TableDatas;
