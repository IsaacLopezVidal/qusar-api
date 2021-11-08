
CREATE TABLE IF NOT EXISTS satellites ( 
    satellite_id SERIAL NOT NULL,
    name varchar(50) NOT NULL,  
    time_cast timestamp NOT NULL,
    PRIMARY KEY (satellite_id) 
    );

CREATE TABLE IF NOT EXISTS top_secret(
        resques_id SERIAL NOT NULL,
        request varchar(1000) NOT NULL, 
        ip varchar(30) NOT NULL, 
        time_cast timestamp NOT NULL,
        method VARCHAR(10) NOT NULL,
        PRIMARY KEY (resques_id) 
);
 
CREATE TABLE IF NOT EXISTS satellites_positions( 
    id SERIAL NOT NULL,
    x float NOT NULL,  
    y float NOT NULL,  
    time_cast timestamp NOT NULL,
    FOREIGN KEY (id) 
            REFERENCES satellites(satellite_id)
            ON DELETE CASCADE
    )

delimiter $$
CREATE OR REPLACE PROCEDURE cargas_iniciales()

BEGIN
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
END$$
delimiter;


CALL cargas_iniciales();