import React, { createContext, useContext, useState, useCallback } from 'react';
// Importing database configuration
import { db } from '../utils/dbConfig';
import { Users, Records } from '../utils/Schema';

// For creating equality condition from drizzle-orm
import { eq } from 'drizzle-orm';

const StateContext = createContext();

// Provider context that will wrap the application
export const StateContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [currentUser, setcurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Add this line

  // Fetch all users from the database
  const fetchUsers = useCallback(async () => {
    try {
      const results = await db.select().from(Users).execute();
      setUsers(results);
    } catch (error) {
      console.error('Error Fetching Users', error);
    }
  }, []);

  // Fetch a user by their email
  const fetchUserByEmail = useCallback(async (email) => {
    try {
      const result = await db.select().from(Users).where(eq(Users.createdBy, email)).execute();
      if (result.length > 0) {
        setcurrentUser(result[0]);
      }
    } catch (error) {
      console.error('Error Fetching User by Email', error);
    }
  }, []);
  // Create a new user
  const createUser = useCallback(async (userData) => {
    try {
      const newUser = await db.insert(Users).values(userData).returning().execute();
      setUsers((prevUsers) => [...prevUsers, newUser[0]]);
      return newUser[0]; // Return the newly created user
    } catch (error) {
      console.error('Error Creating User', error);
      return null;
    }
  }, []);

  // Fetch records for a specific user
  const fetchUserRecords = useCallback(async (userEmail) => {
    try {
      const result = await db.select().from(Records).where(eq(Records.createdBy, userEmail)).execute();
      setRecords(result);
    } catch (error) {
      console.error('Error Fetching Records', error);
    }
  }, []);

  // Create a new record
  const createRecord = useCallback(async (Recorddata) => {
    try {
      const newRecord = await db.insert(Records).values(Recorddata).returning({ id: Records.id }).execute();
      setRecords((prevRecords) => [...prevRecords, newRecord[0]]);
      return newRecord[0];
    } catch (error) {
      console.error('Error Creating Records', error);
      return null;
    }
  }, []);

  // Update an existing record
  const updateRecord = useCallback(async (recordData) => {
    try {
      const { documentId, ...dataToUpdate } = recordData;
      const updaterecords = await db.update(Records).set(dataToUpdate).where(eq(Records.id, documentId)).returning().execute();
      setRecords((prevRecords) =>
        prevRecords.map((record) => (record.id === documentId ? updaterecords[0] : record))
      );
    } catch (error) {
      console.error('Error Updating Record', error);
      return null;
    }
  }, []);

  return (
    <StateContext.Provider
      value={{
        users,
        records,
        fetchUsers,
        fetchUserByEmail,
        createUser,
        fetchUserRecords,
        createRecord,
        currentUser,
        updateRecord,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the state context
export const useStateContext = () => useContext(StateContext);
