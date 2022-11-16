DROP DATABASE IF EXISTS article ;
/* 데이터베이스 생성*/
CREATE DATABASE article_project;
USE article_project;

/*테이블 생성*/
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`(
seq INT(12) NOT NULL PRIMARY KEY AUTO_INCREMENT,
id VARCHAR(100) NOT NULL,
`password` VARCHAR(255) NOT NULL,
nickname VARCHAR(50) NOT NULL
);
/*테스트 데이터 생성*/

DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`(
seq INT(12) NOT NULL PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(255) NOT NULL,
`body` TEXT NOT NULL,
user_seq INT(12) NOT NULL
);

DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply`(
seq INT(12) NOT NULL PRIMARY KEY AUTO_INCREMENT,
`body`VARCHAR(255) NOT NULL,
user_seq INT(12) NOT NULL,
article_seq INT(12) NOT NULL
);

INSERT INTO `reply`(`body`,`user_seq`,article_seq) VALUES
('asd1',1,1),
('asd2',1,1),
('asd3',2,1),
('asd4',2,1);

INSERT INTO `article`(title,`body`,user_seq) VALUES
('asd1','asd1',1),
('asd2','asd2',2),
('asd3','asd3',3),
('asd4','asd4',4);

INSERT INTO `user`(id,`password`,nickname) VALUES
('asd1','asd1','성민'),
('asd2','asd2','철수'),
('asd3','asd3','영희'),
('asd4','asd4','길동');

INSERT INTO `user` SET
id = 'asd1',
`password` = 'asd1',
nickName = '성민';


/*데이터 조회*/
SELECT * FROM `user`;
SELECT * FROM `article`;
/*데이터 삭제*/
DELETE FROM `user` WHERE seq = 1;

/*데이터 업데이트*/
UPDATE `user` SET 
id = 'asd1',
`password` = 'asd1',
nickName = '성민'
WHERE seq = 2;



SELECT nickName FROM `user` ORDER BY seq DESC;

SELECT r.*,b.nickname writer FROM reply r INNER JOIN `user` b ON r.user_seq = b.seq;                                      
SELECT a.*


