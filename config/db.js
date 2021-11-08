const mysql = require('promise-mysql');
const fs = require('fs');
let pool;
const createTcpPoolSslCerts = async config => {
    const dbSocketAddr = process.env.DB_HOST.split(':');
    return mysql.createPool({
      user: process.env.DB_USER, // e.g. 'my-db-user'
      password: process.env.DB_PASS, // e.g. 'my-db-password'
      database: process.env.DB_NAME, // e.g. 'my-database'
      host: dbSocketAddr[0], // e.g. '127.0.0.1'
      port: dbSocketAddr[1], // e.g. '3306'
      ssl: {
        sslmode: 'verify-full',
        ca: fs.readFileSync(process.env.DB_ROOT_CERT), // e.g., '/path/to/my/server-ca.pem'
        key: fs.readFileSync(process.env.DB_KEY), // e.g. '/path/to/my/client-key.pem'
        cert: fs.readFileSync(process.env.DB_CERT), // e.g. '/path/to/my/client-cert.pem'
      },
      ...config,
    });
  };
  
  const createTcpPool = async config => {
    const dbSocketAddr = process.env.DB_HOST.split(':');
    return mysql.createPool({
      user: process.env.DB_USER, 
      password: process.env.DB_PASS, 
      database: process.env.DB_NAME, 
      host: dbSocketAddr[0], 
      port: dbSocketAddr[1], 
      ...config,
    });
  };
  const createUnixSocketPool = async config => {
    const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';
    return mysql.createPool({
      user: process.env.DB_USER, 
      password: process.env.DB_PASS, 
      database: process.env.DB_NAME, 
      socketPath: `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
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
    if (process.env.DB_HOST) {
      if (process.env.DB_ROOT_CERT) {
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
        method VARCHAR(10) NOT NULL,
        PRIMARY KEY (resques_id) 
        );`
    );
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
  

module.exports={
  pool,
  createPoolAndEnsureSchema
} 
