
CREATE TABLE membri(
       user_id   VARCHAR(255),  
       user_name VARCHAR(255), 
       strike  VARCHAR(255)
);
/*INSERT INTO membri4(
       user_id,
       user_name,
       strike 
              ) 
VALUES(
       1234,
       "peppa",
       1
        )
;*/

/*UPDATE membri4

SET 
       strike = strike + 1  
WHERE 
       user_id = 123456789;  test rsync 2  */ 


ALTER USER 'william' IDENTIFIED WITH mysql_native_password BY '35wil2421'; flush privileges;