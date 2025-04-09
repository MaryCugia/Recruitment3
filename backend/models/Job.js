import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

class Job {
    static async create(jobData) {
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO jobs (title, description, requirements, location, salary, company, status, recruiter_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    jobData.title,
                    jobData.description,
                    jobData.requirements,
                    jobData.location,
                    jobData.salary,
                    jobData.company,
                    jobData.status || 'active',
                    jobData.recruiter_id
                ],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve({ id: results.insertId, ...jobData });
                    }
                }
            );
        });
    }

    static async findAllActive() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM jobs WHERE status = "active"', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async findByRecruiterId(recruiterId) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM jobs WHERE recruiter_id = ?', [recruiterId], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

export default Job; 