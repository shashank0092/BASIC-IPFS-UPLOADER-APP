import {create} from "ipfs-http-client"
import { useState } from "react";



const Home=()=>{

  const projectId=process.env.NEXT_PROJECT_ID;
  const projectSecretKey=process.env.NEXT_Project_Secret_Key;

  console.log(projectId);
  console.log(projectSecretKey);
  const authorization="Basic "+btoa(projectId+":"+projectSecretKey);

  const[uploadImages,setUploadImages]=useState([]);
  const ipfs=create({
    url:"https://ipfs.infura.io:5001/api/v0",
    headers:{
      authorization
    }
  })
  async function onSubmitHandler(e){
    e.preventDefault();
    const files=e.target[0].files;

    if(!files||files.length===0){
      return alert("NO FILES SELECTED")
    }

    const file=files[0];
    const result=await ipfs.add(file);
    console.log(result);
    setUploadImages([
      ...uploadImages,{
        cid:result.cid,
        path:result.path
      }
    ])

    console.log(uploadImages);
  }

  return(
    <>  
        <div>
          <h1>IPFS UPLOADER</h1>
          <form onSubmit={onSubmitHandler}>
            <label htmlFor="file-upload">
              Select File
            </label>
            <input type="file" id="file-upload" name="file" />
            <button type="submit" >
              Upload File
            </button>
          </form>
        </div>

        <div>
              {
                
                uploadImages.map((image,index)=>{
                 return(
                  <>
                  {console.log(index)}
                  <img 
                  src={"https://shuklatest.infura-ipfs.io/ipfs/"+image.path} 
                  alt={`Uploaded #${index+1}`} 
                  style={{maxWidth:'400px',margin:'15px'}}
                  key={image.cid.toString()+index}
                  />
                  <h4>
                    Link TO IPFS:
                  </h4>

                  <a href={"https://shuklatest.infura-ipfs.io/ipfs/"+image.path}>
                  <h3>{"https://shuklatest.infura-ipfs.io/ipfs/"+image.path}</h3>  
                  </a>                  
              </>
                 )
                })
              }
        </div>
    </>
  )
}

export default Home;