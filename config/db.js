const mysql = require('promise-mysql');
const fs = require('fs');
const path = require('path');

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
    let query =`
    CREATE TABLE IF NOT EXISTS satellites ( 
      satellite_id SERIAL NOT NULL,
      name varchar(50) NOT NULL,  
      time_cast timestamp NOT NULL,
      PRIMARY KEY (satellite_id) 
      );
    `
    await pool.query(query);
    query =`
    CREATE TABLE IF NOT EXISTS top_secret(
      resques_id SERIAL NOT NULL,
      request varchar(1000) NOT NULL, 
      ip varchar(30) NOT NULL, 
      time_cast timestamp NOT NULL,
      method VARCHAR(10) NOT NULL,
      PRIMARY KEY (resques_id) 
);
    `
    await pool.query(query);
    query =`
    CREATE TABLE IF NOT EXISTS satellites_positions( 
      id SERIAL NOT NULL,
      x float NOT NULL,  
      y float NOT NULL,  
      time_cast timestamp NOT NULL,
      FOREIGN KEY (id) 
              REFERENCES satellites(satellite_id)
              ON DELETE CASCADE
      );
    `
    await pool.query(query);

    query =`
  
      DECLARE totalOrder INT DEFAULT 0;
        DECLARE satellite_id INT DEFAULT 0 ;
        
        SELECT COUNT(*) 
        INTO totalOrder
        FROM satellites;     
        IF totalOrder=0 THEN
    
            INSERT INTO satellites(name) VALUES ('kenobi');
            SET satellite_id:=LAST_INSERT_ID();
            INSERT INTO satellites_positions (id,x,y) VALUES(satellite_id,-500,-200);
    
            INSERT INTO satellites(name) VALUES ('skywalker');
            SET satellite_id:=LAST_INSERT_ID();
            INSERT INTO satellites_positions (id,x,y) VALUES(satellite_id,100,-100);
    
            INSERT INTO satellites(name) VALUES ('sato');
            SET satellite_id:=LAST_INSERT_ID();
            INSERT INTO satellites_positions (id,x,y) VALUES(satellite_id,500,100);
    
        END IF;
    
    `
    await pool.query(query);
    // query =`
    // CALL cargas_iniciales();
    // `
    // await pool.query(query);
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
