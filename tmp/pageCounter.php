<?php
$domain = $_GET['domain'];
$title = $_GET['title'];
$gap = $_GET['gap'];

switch($gap) {
case 1:
	$gap = "and DATE(`timestamp`) = CURDATE()";
	break;
case 30:
	$gap = "and timestamp BETWEEN SUBDATE(CURDATE(), INTERVAL 1 MONTH) AND NOW()";
	break;
default:
	$gap = "";

$sql1 = "select pageId from counter_pages where domain='" + $domain + " and title=" + $title + " " + $gap;
$query1 = $this->db->query($sql1);
$row = $query1->row();
$pageId = $row->pageId;

$sql2 = "select count(*) as c from counter_click_log where pageId=" + $pageId;
$query2 = $this->db->query($sql2);
$row = $query2->row();
$count = $row->c;

echo $count;

$db['default']['hostname'] = SAE_MYSQL_HOST_M;
$db['default']['hostname'] = SAE_MYSQL_HOST_M;
$db['default']['username'] = SAE_MYSQL_USER;
$db['default']['password'] = SAE_MYSQL_PASS;
$db['default']['database'] = SAE_MYSQL_DB;
$db['default']['dbdriver'] = 'mysqli';
$db['default']['dbprefix'] = '';
$db['default']['pconnect'] = FALSE;
$db['default']['db_debug'] = TRUE;
$db['default']['cache_on'] = FALSE;
$db['default']['cachedir'] = '';
$db['default']['char_set'] = 'utf8';
$db['default']['dbcollat'] = 'utf8_general_ci';
$db['default']['swap_pre'] = '';
$db['default']['autoinit'] = TRUE;
$db['default']['stricton'] = FALSE;
$db['default']['port'] = SAE_MYSQL_PORT;