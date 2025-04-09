import { pool } from './config/db.js';

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Successfully connected to the database');
  
  // Test a simple query
  connection.query('SELECT 1 + 1 AS solution', (error, results) => {
    connection.release(); // Always release the connection back to the pool
    
    if (error) {
      console.error('Error executing query:', error);
      return;
    }
    
    console.log('Query test successful. Result:', results[0].solution);
    process.exit(); // Exit the script after testing
  });
}); 