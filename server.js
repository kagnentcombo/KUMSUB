
const express = require('express')
const http = require('http')
const longdo = require('longdo-api')



const app = express()
const PORT = process.env.PORT || 4046

app.use('/', express.static(__dirname + '/'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
  })
app.get('/index2',function(req,res){
   res.sendFile(__dirname,'/index2.html')
})


app.use('/resources', express.static(__dirname + '/resources')); 



app.get('/getlongdo/:id', function (req, res) {
    var id = req.params.id;
    // console.log(id);
      longdo.search(id).then((result) => {
        var testres=result["พจนานุกรม ฉบับราชบัณฑิตยสถาน พ.ศ. ๒๕๕๔"];
     //console.log(result); 
     //console.log(testres);
     res.json(testres);
    }).catch(error => { 
      console.log(`The unknown error has occurred: ${error}`);
      res.json(null);
    });
})

app.get('/getsimilar/:id',function(req,res)
{
    var id= req.params.id;
    longdo.search(id).then((result)=>{
      var similarword= result["NECTEC Lexitron-2 Dictionary (TH-EN)"];
     // console.log(similarword); 
     res.json(similarword);
    }).catch(error => { 
      console.log(`The unknown error has occurred: ${error}`);
      res.json(null);
    });
})

  const server = http.createServer((req, res) => {
    const handler = (req, res) => {
        res.end(`
          <div>
            <h2 style="color: #ff3456;">Ahoy!</h2>
            <p style="color: #23dd55;">This is node.js tutorial</p>
          </div>
        `)
      }
      const server = http.createServer(handler)
  })

  app.get("/video", async (req, res) => {
    
    try {
        // Create the BlobServiceClient object which will be used to create a container client
        const blobServiceClient = BlobServiceClient.fromConnectionString(
            AZURE_STORAGE_CONNECTION_STRING
        );

        const containerName = 'videos';
        const blobName = req.query.path;

        // Get a reference to a container
        const containerClient = blobServiceClient.getContainerClient(containerName);

        // Get a block blob client
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        console.log('\nDownloaded blob content...');

        const downloadBlockBlobResponse = await blockBlobClient.download(0);

        downloadBlockBlobResponse.readableStreamBody.pipe(res);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }

});



  app.listen(PORT, ()=>{
    console.log(`Serer is running. ${PORT}`)
  })