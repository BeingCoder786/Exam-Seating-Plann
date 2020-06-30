var express = require('express');
var router = express.Router();
var app     = express();
var path    = require("path");
var mysql = require('mysql');
var uids = require('short-id');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "examhallarrangement"
});
//var sess;
app.use( express.static( "public" ) );
/* GET home page. */
router.get('/', function(req, res, next) {
  
 res.render('index', { title: '' });
});
router.post('/login', function(req, res) {
	var username = req.body.username;
  var password = req.body.password;
	if (username && password) {
    con.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields)
    {
      if (results.length>0)
      {
        console.log("login successfully!");
        req.session.username=req.body.username;
        res.redirect('/userhome');
       
     	} else {
      
				res.render('index',{msg:"Invalid username & password"});
			}
			res.end();
		});
  }
   else {
		res.send('Please enter Username and Password!');
    res.end();

	}
});

router.get('/logout', function(req, res){
  req.session.destroy(function(){

    const directory = './public/uploads/';
    fs.readdir(directory, (err, files) => {
       if (err) throw err;
      for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
       if (err) throw err;
           });
          }
       });
       let sql=('truncate table students');
       con.query(sql,function(err){
         if(err) throw err;
       });
     console.log("user logged out.")
     res.redirect('/');
  }); 
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'signup form' });
});

router.post('/signup', function(req, res, next) {
  var username=req.body.username;
  var password=req.body.password;
  var fullname=req.body.fullname;
  var email=req.body.email;
  var mobile=req.body.mobile;
  var city=req.body.city;
  var uid=uids.generate();
  var sql= "INSERT INTO users (uid,username,password,fullname,email,mobile,city) VALUES ('"+uid+"','"+username+"','"+password+"','"+fullname+"', '"+email+"','"+mobile+"','"+city+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("data succcufullly registed");
    res.render('index',{msg:'Register successfully'});
    res.end();
  });
});

router.get('/userhome', function(req, res, next) {
  if(req.session.username)
  {
    res.render('userhome', { title: 'user' });
  }else{
   res.redirect('/');
  }
  
});

router.get('/adminlogin', function(req, res, next) {
  res.render('adminlogin', { title: 'adminlogin' });
});
router.post('/adminlogin', function(req, res, next) {
  var adminname = req.body.adminname;
  var password = req.body.password;
  if (adminname==="admin" && password ==="admin")
      {
        req.session.admin=req.body.adminname;
        console.log("login successfully!");
        res.redirect('/adminhome');
       } 
       else {
				res.send('Incorrect adminname and/or Password!');
			}
});
router.get('/adminhome', function(req, res, next) {
  if(req.session.admin)
  { 
    res.render('adminhome', { title: 'admin' });
  }else{
  res.redirect('/adminlogin');
  }
 
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'about' });
});
router.get('/contactus', function(req, res, next) {
  res.render('contactus', { title: 'contactus' });
});

router.get('/ExamRoomDetails', function(req, res, next) {
  if(req.session.username)
  {
    res.render('ExamRoomDetails', { title: '' });
  }else{
    res.redirect('/');
  }
  
});
router.get('/StudentDetails', function(req, res, next) {
  if(req.session.username){
    res.render('StudentDetails', { title: '' });
  }else{
   res.redirect('/');
  }
  
});
router.get('/examPlan', function(req, res, next) {
  if(req.session.username){
    res.render('examPlan', { title: '' });
  }else{
    res.redirect('/');
  }
  
});

router.post('/examroomdetails',(req,res)=>{
  var floor=req.body.floor
  var roomname=req.body.roomname
  var row=req.body.row
  var length=req.body.length
  var username=req.session.username;
  for(var i=0;i<floor.length;i++){
    if(floor.length==1){
      var sql= "INSERT INTO roomdetails (username,floor,roomname,row,length,capacity) VALUES ('"+username+"','"+floor+"', '"+roomname+"','"+row+"', '"+length+"', '"+row*length+"')";    
    }else{
    var sql= "INSERT INTO roomdetails (username,floor,roomname,row,length,capacity) VALUES ('"+username+"','"+floor[i]+"', '"+roomname[i]+"','"+row[i]+"', '"+length[i]+"', '"+row[i]*length[i]+"')";
    }
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("data succcufullly registed"); 
    //res.redirect('/StudentDetails');
  });
  }
  res.render('ExamRoomDetails',{title:'',msg:'Data Saved successfully'});
  //res.redirect('/StudentDetails');
 // res.send('studentDetails')
})


router.post('/examplan', function(req, res, next) {
  var examname=req.body.examname;
  var date=req.body.date;
  var time=req.body.time;
  var clgname=req.body.clgname;
  var address=req.body.address;
  var city=req.body.city;
  var pcode=req.body.pcode;
  var state=req.body.state;
  var username=req.session.username;
  var sql="insert into examdetails(username,examname,date,time,clgname,address,city,pincode,state) values('"+username+"','"+ examname +"','"+date+"','"+time+"','"+clgname+"', '"+address+"','"+city+"','"+pcode+"','"+state+"')";
  con.query(sql,function(err,result){
    if(err) throw err;
    console.log("exam data inserted successfully!");
    res.render('examplan',{title:'',msg:'Data Saved successfully'});
  });

});
router.get('/viewallocation', function(req, res, next) {
  if(req.session.username){
    res.render('viewallocation', { title: 'viewallocation' });
  }else{
    res.redirect('/');
  }
 
});

router.get('/removeuser', function(req, res, next) {
  if(req.session.admin)
  {
    var sql='select * from users';
    con.query(sql,function(err,data){
      if(err) throw err;
      res.render('removeuser', { title: '',records:data });
    })
  }else{  
    res.redirect('/adminlogin');
  }
 
});
router.get('/delete/:uid', function(req, res, next) {
var uid=req.params.uid;
var sql='delete from users where username= ?';

con.query(sql,uid,function(err,results){
  if (err) throw err;
  res.redirect('/removeuser');
});
var sql1='delete from roomdetails where username= ?';
con.query(sql1,uid);
var sql2='delete from examdetails where username= ?';
con.query(sql2,uid);
});
router.get('/assignallocation', function(req, res, next) {
  if(req.session.username){
    var sql='select distinct(class),semester from students';
    con.query(sql,function(err,results){
      if(err) throw err;
      res.render('assignallocation', { title: '',data:results });
    });
  }else{
    res.redirect('/');
  }
 
});
router.get('/showassignseat', function(req, res, next) {
  res.render('showassignseat', { title: 'showassignseat' });
});
router.get('/updateprofile', function(req, res, next) {
  if(req.session.username){
    var username=req.session.username;
    var sql="select * from users where username=?";
    con.query(sql,[username],function(err,results){
      if(err) throw err;
       var string=JSON.stringify(results);
       var json=JSON.parse(string);
      res.render('updateprofile', { title: '',data:json });
    });
  
  }else{
    res.redirect('/');
  }
  
});
router.post('/update', function(req, res, next) {
  var id=req.body.uid;
  var username=req.body.username;
  var password=req.body.password;
  var fullname=req.body.fullname;
  var email=req.body.email;
  var mobile=req.body.mobile;
  var city=req.body.city;
  var sql= "UPDATE users SET username='"+username+"', password='"+password+"', fullname='"+fullname+"', email='"+email+"', mobile='"+mobile+"', city='"+city+"' where username='"+username+"'";
  var query=mysql.format(sql,[username,password,fullname,email,mobile,city]);
  con.query(query, function (err, result) {
    if (err) throw err;
    console.log("data succcufullly Updated");
    res.redirect('/logout');
  });
});
router.get('/viewexam', function(req, res, next) {
  if(req.session.username){
    var sql="select * from examdetails where username='"+req.session.username+"' ";
    con.query(sql,function(err,results){
      if(err) throw err;
    res.render('viewexam', { title: 'ViewExamDetails',data:results });
  })
}else{
    res.redirect('/');
  }
 
});

router.get('/viewroom', function(req, res, next) {
  if(req.session.username){
    var sql="select * from roomdetails where username='"+req.session.username+"' ";
    con.query(sql,function(err,results){
      if(err) throw err;
    res.render('viewroom', { title: 'ViewRoomDetails',data:results });
  })
}else{
    res.redirect('/');
  }
});
// router.get('/students', function(req, res, next) {
//   if(req.session.username){
//     var sql="select * from students ";
//     con.query(sql,function(err,results){
//       if(err) throw err;
//     res.render('students', { title: 'StudentsDetails',data:results });
//   })
// }else{
//     res.redirect('/');
//   }
// });

router.get('/del/:uid', function(req, res, next) {
  var uid=req.params.uid;
  var sql='delete from roomdetails where rid= ?';
  
  con.query(sql,uid,function(err,results){
    if (err) throw err;
    res.redirect('/viewroom');
  });
});
router.post('/upr', function(req, res, next) {
  var id=req.body.rid;
  var floor=req.body.floor;
  var roomname=req.body.roomname;
  var row=req.body.row;
  var length=req.body.length;
  var sql= "UPDATE roomdetails SET floor='"+floor+"', roomname='"+roomname+"', row='"+row+"', length='"+length+"' where rid='"+id+"'";
  var query=mysql.format(sql,[floor,roomname,row,length]);
  con.query(query, function (err, result) {
    if (err) throw err;
    console.log("data succcufullly Updated");
    res.redirect('/viewroom');
  });
});

router.get('/examedit/:uid', function(req, res, next) {
  var uid=req.params.uid;
  var sql='select * from examdetails where eid= ?';
  con.query(sql,uid,function(err,results){
    if (err) throw err;
    //res.redirect('/viewroom');
    res.render('examedit',{title: 'Update Exam Details',data:results[0]});
  });
});
router.post('/examedit/:uid', function(req, res, next) {
  var uid=req.params.uid;
  var username=req.session.username;
  var examname=req.body.examname;
  var date=req.body.date;
  var time=req.body.time;
  var clgname=req.body.clgname;
  var address=req.body.address;
  var city=req.body.city;
  var pincode=req.body.pincode;
  var state=req.body.state;
  var sql= "UPDATE examdetails SET username='"+username+"',examname='"+examname+"', date='"+date+"', time='"+time+"', clgname='"+clgname+"', address='"+address+"', city='"+city+"',pincode='"+pincode+"',state='"+state+"' where eid='"+uid+"'";
  var query=mysql.format(sql,[username,examname,date,time,clgname,address,city,pincode,state]);
  con.query(query,function(err,results){
    if (err) throw err;
    res.redirect('/viewexam');
    // res.render('viewexam',{title: ''});
  });
});
router.get('/examdel/:uid', function(req, res, next) {
  var uid=req.params.uid;
  var sql='delete  from examdetails where eid= ?';
  con.query(sql,uid,function(err,results){
    if (err) throw err;
    res.redirect('/viewexam');
    // res.render('examedit',{title: ''});
  });
});

router.get('/roomedit/:uid', function(req, res, next) {
  var uid=req.params.uid;
  var sql='select * from roomdetails where rid= ?';
  con.query(sql,uid,function(err,results){
    if (err) throw err;
    //res.redirect('/viewroom');
    res.render('roomedit',{title: 'Update Rooms Details',data:results[0]});
  });
});
router.post('/roomedit/:uid', function(req, res, next) {
  var uid=req.params.uid;
  var floor=req.body.floor;
  var roomname=req.body.roomname;
  var row=req.body.row;
  var length=req.body.length;
  var sql= "UPDATE roomdetails SET floor='"+floor+"', roomname='"+roomname+"', row='"+row+"', length='"+length+"' where rid='"+uid+"'";
 // var query=mysql.format(sql,[username,examname,date,time,clgname,address,city,pincode,state]);
  con.query(sql,function(err,results){
    if (err) throw err;
    res.redirect('/viewroom');
    // res.render('viewexam',{title: ''});
  });
});
router.get('/roomdel/:uid', function(req, res, next) {
  var uid=req.params.uid;
  var sql='delete  from roomdetails where rid= ?';
  con.query(sql,uid,function(err,results){
    if (err) throw err;
    res.redirect('/viewroom');
    // res.render('examedit',{title: ''});
  });
});
module.exports = router;
