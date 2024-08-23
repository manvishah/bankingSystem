import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { users } from "../constants/userData";
import { today } from "../utils/Date";
import { apiKey, symbols } from "../utils/ApiKey";

export const convertFunds = createAsyncThunk(
    "api/convertFunds",
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `https://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}&symbols=${symbols}&format=1`
            );
            const rates = response.data.rates;
            return { user, rates };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        userId: null,
        isAuthenticated: false,
        error: null,
        usersData: users,
        isAdmin: false,
        message: null,
        transactionHistoryData: null,
        fundsData: null,
    },
    reducers: {
        logIn: (state, action) => {
            const { userId, password } = action.payload;
            const checkUser = state.usersData.find((user) => {
                return user.customerId == userId && user.customerPin == password;
            });
            if (checkUser) {
                state.user = checkUser.customerName;
                state.userId = checkUser.customerId;
                state.error = null;
                state.isAuthenticated = true;
                if (checkUser.customerName === "ADMIN") {
                    state.isAdmin = true;
                } else {
                    state.isAdmin = false;
                }
            } else {
                state.user = null;
                state.isAuthenticated = false;
                state.error = "Invalid information";
                state.transactionHistoryData = null;
                state.userId = null;
            }
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            state.isAdmin = false;
            state.userId = null;
            state.transactionHistoryData = null;
            state.message = null;
        },
        register: (state, action) => {
            const { userId, password } = action.payload;
            const checkUser = state.usersData.find((user) => {
                return user.customerId == userId && user.customerPin == password;
            });
            if (checkUser) {
                state.error = "User Already exists";
                state.message = null;
            } else {
                const obj = {
                    customerId: userId,
                    customerName: "null",
                    customerPin: password,
                    customerAccountType: "null",
                    customerAccountNo: "null",
                    customerAccountBalance: "null",
                    customerAadhar: "null",
                    customerPan: "null",
                    customerContact: "null",
                    customerEmail: "null",
                    status: "inactive",
                };
                state.error = null;
                state.message =
                    "Account Created Successfully ! Please reach out to admin to activate your account";
                state.usersData.push(obj);
            }
        },
        createAccount: (state, action) => {
            const { customerId, customerPin } = action.payload;

            let obj = {
                ...action.payload,
                status: "active",
                customerTransactions: [],
            };

            const checkUser = state.usersData.find((user) => {
                return user.customerId == customerId && user.customerPin == customerPin;
            });
            if (checkUser) {
                state.error = null;
                state.message = "Account activated successfully";
                const updatedUsers = state.usersData.map((user) => {
                    return user.customerId == customerId ? obj : user;
                });
                state.usersData = updatedUsers;
            } else {
                state.error = "Account does not exists!";
                state.message = "";
            }
        },
        deleteAccount: (state, action) => {
            const checkUser = state.usersData.filter((user) => {
                return user.customerId !== action.payload;
            });
            state.usersData = checkUser;
        },
        clearError: (state) => {
            state.error = null;
            state.message = null;
        },
        transactionHistoryData: (state, action) => {
            const userTransactionData = state.usersData.filter((user) => {
                return user.customerId == action.payload;
            });
            state.transactionHistoryData = userTransactionData;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(convertFunds.pending, (state) => {
                state.message = "loading";
            })
            .addCase(convertFunds.fulfilled, (state, action) => {
                const { user: { accountNo, amountToTransfer, transactionType }, rates } = action.payload

                //multi currency support
                const spread = 0.01;
                const conversion = (Number(amountToTransfer) / rates[transactionType]) * (1 - spread);
                const transactionData = {
                    transactionId: new Date().valueOf().toString().slice(0, 5),
                    transactionDate: today,
                    transactionAmount: conversion.toFixed(2),
                    transactionType: transactionType,
                };

                //check account number and balance
                const checkAccountNumber = state.usersData.find((user) => {
                    return user.customerAccountNo == accountNo;
                });
                const checkBalance = state.usersData.find((user) => {
                    return (
                        state.userId == user.customerId &&
                        user.customerAccountBalance >= amountToTransfer
                    );
                });
                if (checkAccountNumber && checkBalance) {
                    state.error = null;
                    //subtract the amount from source and add in target and add transaction in transaction table
                    const updatedData = state.usersData.map((user) => {
                        return user.customerId == state.userId
                            ? {
                                ...user,
                                customerAccountBalance:
                                    user.customerAccountBalance - amountToTransfer,
                            }
                            : user && user.customerAccountNo == accountNo
                                ? {
                                    ...user,
                                    customerAccountBalance:
                                        Number(user.customerAccountBalance) +
                                        Number(amountToTransfer),
                                }
                                : user;
                    });
                    const updateTransactionTable = state.usersData.find(
                        (data) => data.customerId == state.userId
                    );

                    if (updateTransactionTable) {
                        state.error = null;
                        updateTransactionTable.customerTransactions.push(transactionData);
                    } else {
                        state.error = "Something went wrong!!";
                    }
                    state.usersData = updatedData;
                    state.message = "Amount transferred successfully";
                } else {
                    !checkAccountNumber
                        ? (state.error = "Account does not exits")
                        : (state.error = "You dont have enough balance in your account");
                    state.message = null;
                }
            })
            .addCase(convertFunds.rejected, (state, action) => {
                state.message = "failed";
                state.error = action.error.message;
            });
    },
});

export const {
    logout,
    logIn,
    register,
    clearError,
    createAccount,
    deleteAccount,
    transactionHistoryData,
} = authSlice.actions;
export default authSlice.reducer;
