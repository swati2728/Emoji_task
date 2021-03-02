const fs = require("fs")
const express = require("express")
const app = express()
var myfile = require("./first_emoji_file.json")
app.use(express.json)
const port = 9000

fs.readFile("first_emoji_file.json",(err,data)=>{
    read = JSON.parse(data)
    // console.log(read)
});

app.get("/get",function(req,res){
    myfile = read["emoji"]
    for(i of myfile){
        console.log(i["title"])
    }
});


app.post("/post",function(req,res){
    var obj = {
        "title":"cute",
        "symbol":"😀",
        "keyword":"It makes happy while seeing this face"
    }
    fs.readFile("first_emoji_file.json",function(err,data){
        fs.writeFile("first_emoji_file.json",JSON.stringify(obj),err =>{
            if(err) throw err;
            res.send("done")
            console.log("Done writting post....")

        })
    
    })
});

app.put("/update",function(req,res){
    let new_data = req.body;
    myfile["title"] = "nice"
    console.log(myfile,"---")
    fs.writeFile("first_emoji_file.json",JSON.stringify(myfile),err=>{
        if(err){
            res.send(err)
            console.log(err)
        }else{
            console.log("Done Updateing....")
        }
    })
    res.send("Done writing...")
});

// For deleting the data from user by id
app.delete('/delete/:id', (req, res) => {
    var id = req.params.id
    var user_Details = req.body;
    delete myfile[id-1]
    fs.writeFile('first_emoji_file.json', JSON.stringify(myfile), err => {
        if(err){
            res.send(err)
        }else{
            console.log('deleted....')
        }
    })
    res.send('deleted....')
  
});


app.listen(port,function(req,res){
    console.log("server is running at port number 9000.....")
});
