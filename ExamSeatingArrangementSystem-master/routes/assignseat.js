var express = require('express');
var fs=require('fs');
var router = express.Router();
var app     = express()
var mysql = require('mysql');
var path = require('path');
   
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "examhallarrangement"
  });
con.connect(function(err){
 if(err) throw err;
 //console.log('Databases Connected!');
});

router.post('/assignseat', function(req, res, next) {
  if(!req.body.ch){
    res.redirect('assignallocation');
  }
   var c=req.body.course
   var s=req.body.sem
   var ch=req.body.ch
   //console.log(c)
   //console.log(s)
   //console.log(ch)
   arr=[]
   var j=0
   for(var i=0;i<c.length;i++){
     if(ch[j]==c[i]+s[i]){
      arr.push({a:s[i],b:c[i]}) 
      j++;
     }
   }
   arr.sort(function(x,y){
     if(x.b!==y.b)
     return x.a-y.a;
     else
     return x.b-y.b;
   })
 //  console.log(__dirname+'..')
  //  var jsonPath = path.join(__dirname, '../public/stylesheets/table.css');
  //  var fileContents = fs.readFileSync(jsonPath, {encoding: "utf8"}, function(err, data) {
  //   if (!err) {
  //     response.write(data);
  //    // console.log('gss')
  //   } else {
  //     console.log(err);
  //   }
  //   });
  var examdetails=[];
   var examplanquery="select * from examdetails where username='"+req.session.username+"' ";
   con.query(examplanquery,(err,result)=>{
     if(err) throw err
     var string = JSON.stringify(result);
     json=JSON.parse(string);
     examdetails.push(json);
     //console.log(examdetails)
   });
if(arr.length==0){
  res.redirect('assignallocation');
}
   //console.log(arr)
    
   var username=req.session.username;
   
   // Query to fetch the data of rooms from database
   var capacity=0; 
    
   var rooms=[]
   var roomquery="select row,length,roomname from roomdetails where username='"+req.session.username+"' ";
   con.query(roomquery,(err,result)=>{
     //console.log(result)
     if(err) throw err
     var string =JSON.stringify(result);
     var json=JSON.parse(string);
     for(var i=0;i<json.length;i++){
       capacity=capacity+json[i].row*json[i].length
       json[i].empty=true;
       rooms.push(json[i])
     }
     //console.log(rooms)
    })

   


    var roomallotment=[] 
    var z=0;
    var n=0;

    res.write('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">');
     res.write(' <link rel="stylesheet" href="/stylesheets/table.css"/>')
     res.write('<script type=text/javascript src="https://code.jquery.com/jquery-1.12.3.min.js"></script>');
     res.write('<script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js"></script>');
     res.write('<script type=text/javascript src="/javascripts/table.js"></script>')
     res.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">'); 
  
     res.write('</head><body id="content" class="ridge">') 
     //res.write('<button onclick="generatePDF()"  id="cmd">' +" Download pdf " +'</button>');
     //res.write('<a href="/assignallocation">Go-Back</a>&nbsp&nbsp');
     res.write('<a href="/assignallocation" class="previous">&laquo; Go-Back</a>&nbsp&nbsp');
     res.write('<button onclick="generatePDF()"  id="cmd" class="btn"><i class="fa fa-download"></i>' +" Download pdf " +'</button>');      
     
     for(var i=0;i<arr.length;i+=2){
      var cn1students=[];
    
      if((i+1)<arr.length){
      var sql1="select regno from students where class='"+arr[i+1].b+"' and semester='"+arr[i+1].a+"' ";
      con.query(sql1,function(err,result){
        //console.log(results)
        if(err) throw err;
        var string=JSON.stringify(result);
        var json=JSON.parse(string);
  
        for(var i=0;i<json.length;i++)
        { 
          cn1students.push(json[i])
        }
      });
    }
    var cn2students=[]; 
  
    var sql2="select regno from students where class='"+arr[i].b+"' and semester='"+arr[i].a+"' ";
      con.query(sql2,function(err,result){
      if(err) throw err;
      var string=JSON.stringify(result);
      var json=JSON.parse(string);
      for(var i=0;i<json.length;i++)
      {
       cn2students.push(json[i])
      }
       if(capacity<cn1students.length+cn2students.length){
        console.log('Room should be more!')
        console.log('capacity:'+capacity)
      }else{
        // console.log(rooms)
        // console.log(cn2students)   
        // console.log(cn1students)
        capacity-=cn1students.length+cn2students.length
        var l=0;
        var m=0;
         for(;z<rooms.length;z++){
          
            if(l==cn1students.length && m==cn2students.length)
             break;
            
            let ans=new Array(rooms[z].length);
            for(var c=0;c<ans.length;c++){
              ans[c]=new Array(rooms[z].row)
            }
          
            for(var i=0;i<rooms[z].row;i++){
              for(var j=0;j<rooms[z].length;j++){
                if((l==cn1students.length && i%2==0 )|| (m==cn2students.length && i%2!=0))
                  continue;
                 else{
                   if(i%2==0){
                     ans[j][i]=cn1students[l++].regno;
                   }else{
                    ans[j][i]=cn2students[m++].regno;
                   }
                 } 
              }
            }
           // res.write(fileContents)
          //  res.write('<table  class="table" style="overflow-x:auto" width="70%" hight="100%" border="1" align="center">');
          //  res.write('<tr>');
          //  res.write('<th>'+examdetails[0][0].clgname+'</th>');
          //  res.write('</th>');

          //  res.write('<th>');
          //  res.write('</th>');
          //  res.write('</tr>');
            res.write('<div id="header" >');
            res.write('<h1 id="college" align="center">'+examdetails[0][0].clgname+'</h1>')
            res.write('<h2 id="city" align="center">'+examdetails[0][0].city+' &nbsp' +examdetails[0][0].pincode+ '&nbsp' +examdetails[0][0].state+' </h2>')
            res.write('<h2 id="city" align="center">'+examdetails[0][0].examname+'</h2>')
            res.write('<h4 id="roomname" align="left" >'+"Date:" +examdetails[0][0].date+"---------------------------Time:" +examdetails[0][0].time +"-----------------------------Room:" +rooms[z].roomname+'</h4>');
            res.write('<h4 id="time" align="right" >'+'</h4>');
            res.write('</div>');
            
           res.write('<table  class="table" style="overflow-x:auto" width="70%" hight="100%" border="1" align="center">');
            res.write('<tr id="heading">');
            for(var k=1;k<=rooms[z].row;k++){
              res.write('<td align="center">'+"Row: "+k+'</td>')
            }
            res.write('</tr>');
            for(var i=0;i<ans.length;i++){
              res.write('<tr width="70%" hight="100%">')
              for(var j=0;j<ans[i].length;j++){
                      if(ans[i][j]==undefined)
                      {
                        res.write('<td align="center" >*****</td>');
                  
                      }else{
                      res.write('<td align="center">'+ans[i][j]+'</td>');
                      }
                  }
                res.write('</tr>');
            }
            res.write('</table>')
            res.write('<p>'+"Invigilator-----------------------------------------------------------------------------------------------------------Centre Superintendent"+'</p>');
         //   console.log(ans);
            //;;;;;
          }
          res.write('</body>') 
          res.write('</html>') 
     
          //console.log(roomallotment)
        }
       });
      }          
      setTimeout(function() {
       res.end();
    }, 5000);
      });




  module.exports = router;