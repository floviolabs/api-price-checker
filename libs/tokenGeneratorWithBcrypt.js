const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const schedule = require('node-schedule');
const { Pool } = require('pg');

const config = require('../configs/env.config');

const secretKey = 'Semua yang ada di bumi itu akan binasa. Dan tetap kekal Dzat Tuhanmu yang mempunyai kebesaran dan kemuliaan';
const saltRounds = 10;

const pool = new Pool({
    user: config.tic.user,
    host: config.tic.host,
    database: config.tic.database,
    password: config.tic.password,
    port: config.tic.port,
});

const moment = require('moment-timezone');
const jakartaDateTime = moment().tz('Asia/Jakarta');
const formattedJakartaDateTime = jakartaDateTime.format('YYYY-MM-DD HH:mm:ss');

function generateToken(data) {
    return jwt.sign(data, secretKey, { expiresIn: '1h' });
}

async function hashSensitiveData(data) {
    const hashedData = await bcrypt.hash(data, saltRounds);
    return hashedData;
}

async function scheduleTokenGeneration() {
    const client = await pool.connect();

    try {
        const query = 'SELECT mskt_id, mskt_created_date, mskt_token, mskt_status, application, mskt_updated_date FROM public.mst_secret_key_token';
        const result = await client.query(query);

        if (result.rowCount > 0) {
            for (const row of result.rows) {

                console.log('rows', row);
                const data = { userId: 123, role: 'admin' };
                const token = generateToken(data);

                const sensitiveData = 'sensitive-info';
                const hashedSensitiveData = await hashSensitiveData(sensitiveData);

                const dateToday = formattedJakartaDateTime;

                const updateQuery = `UPDATE public.mst_secret_key_token SET mskt_token='${hashedSensitiveData}', mskt_updated_date='${dateToday}' where mskt_id = '${row.mskt_id}'`;
            
                await client.query(updateQuery);

              }
        }
    
    } catch (error) {
        console.error('Error executing query:', error);
    } finally {
        client.release(); // Release the client back to the pool
    }
}

const scheduledJob = schedule.scheduleJob('*/1 * * * *', scheduleTokenGeneration);

console.log('Token generation job scheduled.');