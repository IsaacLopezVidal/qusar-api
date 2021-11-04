const mysql = require('promise-mysql');
const fs = require('fs');
var path = require("path");
const {parsed} = require('dotenv').config({ path: path.resolve("./")+'/.env' })

let pool;
const createTcpPoolSslCerts = async config => {
    const dbSocketAddr = parsed.DB_HOST.split(':');
    return mysql.createPool({
      user: parsed.DB_USER, // e.g. 'my-db-user'
      password: parsed.DB_PASS, // e.g. 'my-db-password'
      database: parsed.DB_NAME, // e.g. 'my-database'
      host: dbSocketAddr[0], // e.g. '127.0.0.1'
      port: dbSocketAddr[1], // e.g. '3306'
      ssl: {
        sslmode: 'verify-full',
        ca: fs.readFileSync(parsed.DB_ROOT_CERT), // e.g., '/path/to/my/server-ca.pem'
        key: fs.readFileSync(parsed.DB_KEY), // e.g. '/path/to/my/client-key.pem'
        cert: fs.readFileSync(parsed.DB_CERT), // e.g. '/path/to/my/client-cert.pem'
      },
      ...config,
    });
  };
  
  const createTcpPool = async config => {
    const dbSocketAddr = parsed.DB_HOST.split(':');
    return mysql.createPool({
      user: parsed.DB_USER, 
      password: parsed.DB_PASS, 
      database: parsed.DB_NAME, 
      host: dbSocketAddr[0], 
      port: dbSocketAddr[1], 
      ...config,
    });
  };
  const createUnixSocketPool = async config => {
    const dbSocketPath = parsed.DB_SOCKET_PATH || '/cloudsql';
    return mysql.createPool({
      user: parsed.DB_USER, 
      password: parsed.DB_PASS, 
      database: parsed.DB_NAME, 
      socketPath: `${dbSocketPath}/${parsed.CLOUD_SQL_CONNECTION_NAME}`,
      ...config,
    });
  };
  
  
  const createPool = async () => {
    const config = {
      connectionLimit: 5,
      connectTimeout: 10000, 
      acquireTimeout: 10000, 
      waitForConnections: true,
      queueLimit: 0, 
    };
    if (parsed.DB_HOST) {
      if (parsed.DB_ROOT_CERT) {
        return createTcpPoolSslCerts(config);
      } else {
        return createTcpPool(config);
      }
    } else {
      return createUnixSocketPool(config);
    }
  };
  
  const ensureSchema = async pool => {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS top_secret( 
        resques_id SERIAL NOT NULL,
        request varchar(1000) NOT NULL, 
        ip varchar(30) NOT NULL, 
        time_cast timestamp NOT NULL,
        PRIMARY KEY (resques_id) 
        );`
    );
    console.log("Ensured that table 'top_secret' exists");
  };
  
  const createPoolAndEnsureSchema = async () =>
    await createPool()
      .then(async pool => {
        await ensureSchema(pool);
        return pool;
      })
      .catch(err => {
        // logger.error(err);
        console.error(err)
        throw err;
      });
  

exports.pool = pool,
exports.createPoolAndEnsureSchema=createPoolAndEnsureSchema
