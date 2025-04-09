import mysql from 'mysql';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

class Recruiter {
    static async findByEmail(email) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM recruiters WHERE email = ?', [email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }

    static async create(recruiterData) {
        const hashedPassword = await bcrypt.hash(recruiterData.password, 10);
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO recruiters (name, email, password, company) VALUES (?, ?, ?, ?)',
                [recruiterData.name, recruiterData.email, hashedPassword, recruiterData.company],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve({ id: results.insertId, ...recruiterData });
                    }
                }
            );
        });
    }

    static async comparePassword(candidatePassword, hashedPassword) {
        return bcrypt.compare(candidatePassword, hashedPassword);
    }
}

export default Recruiter;
