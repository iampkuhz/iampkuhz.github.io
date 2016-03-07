use hanzhe;
drop table if exists `blogVisitCnt` ;
create table `blogVisitCnt`(
	`Date` DATE default  NULL,
	`page` varchar(100) NOT NULL,
	`count` int(8) default 1,
	unique key(`Date`, `page`)
);
