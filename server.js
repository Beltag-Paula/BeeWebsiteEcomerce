const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 5500;
const publicDirectory = path.join(__dirname, 'public');

const mediaTypes = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
 // '.wav': 'audio/wav',
//  '.mp3': 'audio/mpeg',
//  '.svg': 'image/svg+xml',
 // '.pdf': 'application/pdf',
 // '.zip': 'application/zip',
 // '.doc': 'application/msword',
  //'.eot': 'application/vnd.ms-fontobject',
  //'.ttf': 'application/x-font-ttf',
};

const serveStatic = (req, res) => {
// res.writeHead(200, {'Content-Type':'text/html'});
    // return res.end(fs.readdirSync(publicDirectory, {encoding:'utf-8'}).map(fileName => `<a href="/${fileName}">${fileName}</a>`).join('<br>'));



  let pathName = req.url;

  if(pathName === '/') {
    pathName = "index.html";
  }
  //Serve static files
  const filePath = path.join(publicDirectory, pathName);

  //Get the extension from a file path?
  const extension = path.extname(filePath);

  const contentType = mediaTypes[extension] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 Not Found');
    }else{
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content);
    }
  });
}

const handleProducts = (req, res) => {
  const productsPathName = path.join(__dirname, "data", "products.json");
  switch(req.method) {
    case 'GET':
      res.writeHead(200, {'Content-Type':'application/json'});
      res.end(fs.readFileSync(productsPathName, {encoding: "utf-8"}));
      break;
    case 'POST':
     
        // TODO -- 
        // append to json a product
        // 
        // -- razpunzi la client cu res.write.. 
        res.writeHead(200, {'Content-Type':'text/plain'});
        res.end("da paula o sa adaug");

    
      break;
    default:
      res.writeHead(404, {"Content-Type": "text/plain"});
      return res.end("Method Not Found");
  }

}



const serveApi = (req, res) => {
// GET /api/products

if(req.url.includes("/api/products")) {
  handleProducts(req,res);
} else {
  res.writeHead(404, {"Content-Type": "text/plain"});
  res.end("Endpoint Not Found");
}


// POST /api/products

// PUT /api/products/:id

// DELETE /api/products/:id

// POST /api/orders

// DELETE /api/order/:id


  
  
}
 
const server = http.createServer((req,res) => {
  //handle the request and send back a static file 
  //from a folder called "public"


  // Set CORS headers (for development)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if(req.url.includes('/api'))
    return serveApi(req,res);
  else
    return serveStatic(req, res);
});



server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});