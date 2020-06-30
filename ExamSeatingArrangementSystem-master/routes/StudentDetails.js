const express=require('express')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');
var fs = require('fs');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'examhallarrangement'
});
// Set The Storage Engine
/*
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    console.log(file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
*/
const readXlsxFile = require('read-excel-file/node');


const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.originalname);
    
    const directory = './public/uploads/';
    fs.readdir(directory, (err, files) => {
       if (err) throw err;
      for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
       if (err) throw err;
           });
          }
       });
    readXlsxFile(`./public/uploads/${file.originalname}`).then((rows) => {
     rows.shift(); 
    connection.connect((error) => {
      if(error){
        console.log(error);
      }else{
        let sql=('truncate table students');
        connection.query(sql);
        let query='INSERT INTO students (regno,name,class,semester,branch) VALUES ?';
        connection.query(query,[rows],(error,response) => {
          if(error) throw error;
          //console.log(error || response);
          console.log('Data Inserted Successfully mysql databases!')
          // var filePath = `./public/uploads/${file.originalname}`; 
          //  fs.unlinkSync(filePath);
          const directory = './public/uploads/';
          fs.readdir(directory, (err, files) => {
             if (err) throw err;
            for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
             if (err) throw err;
                 });
                }
             });

        });
      }
    });

    });
    
    // var nsql="create table student as select * from students order by class,name;drop table students;rename table student to students" 
    // connection.query(nsql,(err,result)=>{
    //   if(err) throw err;
    // })
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /xlsm|xls|odt|doc|txt/;
 // const filetypes = /xlsm|xls|odt|txt/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: excel file only');
  }
}

// Public Folder
router.use(express.static('./public'));

router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('StudentDetails', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('StudentDetails', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('StudentDetails', {
          msg: 'File Uploaded Successfully!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});



router.get('/template',(req,res)=>{
    res.download('./public/files/studentstemplate.xlsx');
//    res.render('studentDetail')
})
module.exports=router;