CREATE SCHEMA kweb;

USE kweb;

CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` char(128) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `unique_no` char(10) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NOT NULL DEFAULT 0);

CREATE TABLE `token` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `serial` char(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NOT NULL DEFAULT DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 12 HOUR));
ALTER TABLE token ADD FOREIGN KEY (user_id) REFERENCES user(id);

CREATE TABLE `lecture` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `prof_id` int NOT NULL,
  `title` varchar(255) NOT NULL);
ALTER TABLE lecture ADD FOREIGN KEY (prof_id) REFERENCES user(id);

CREATE TABLE `board` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `lecture_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL);
ALTER TABLE board ADD FOREIGN KEY (lecture_id) REFERENCES lecture(id);

CREATE TABLE `enrolment` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `lecture_id` int NOT NULL,
  `stdt_id` int NOT NULL);
ALTER TABLE enrolment ADD FOREIGN KEY (lecture_id) REFERENCES lecture(id);
ALTER TABLE enrolment ADD FOREIGN KEY (stdt_id) REFERENCES user(id);


use mysql;

create user 'test'@'%' identified by 'tset';
grant all privileges on `kweb`.* to 'test'@'%';
flush privileges;
