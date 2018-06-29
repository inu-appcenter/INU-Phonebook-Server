/* copyright(c) 2016 All rights reserved by jongwook(koyu1212@naver.com) 201003051 컴퓨터공학부 고종욱
 * thanks for Bbulbum
*/
var oracledb = require('oracledb');
var http = require('http');
var fs = require('fs');

oracledb.outFormat = oracledb.OBJECT

function getcontact(req, res, next) {

	var sql = 'select nm as name, job_div as position, offi_tel_no as phone, dpt_nm as dpart, univ_nm as part from v_campus_tel_no, v_org where v_campus_tel_no.dpt_cd = v_org.dpt_cd'
	var bindvar = {}
	var pool = oracledb.getPool();
	pool.getConnection((err,connection)=>{
			connection.execute( sql, bindvar, {maxRows:2000}, (err, results)=> {
				if(err){
					next(err);
					return;
				}
				res.header("Content-Type", "application/json; charset=utf-8");
				res.send(results.rows);
				res.end();
				}
			);
	});
}

function getcontactgroup(req, res, next) {
	var sql = 'select distinct univ_nm as part from v_campus_tel_no, v_org where v_campus_tel_no.dpt_cd = v_org.dpt_cd'
	var bindvar = {}
	var pool = oracledb.getPool();
	pool.getConnection((err,connection)=>{
			connection.execute( sql, bindvar, {maxRows:2000}, (err, results)=> {
				if(err){
					next(err);
					return;
				}
				res.header("Content-Type", "application/json; charset=utf-8");
				res.send(results.rows);
				res.end();
				}
			);
	});
}

module.exports.getcontact = getcontact;
module.exports.getcontactgroup = getcontactgroup;
