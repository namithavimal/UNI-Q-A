import './Profile.scss'
import { useContext , useRef} from "react";
import { AuthContext } from "../../context/authContext";
import Posts from "../../components/posts/posts";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { createRequest } from "../../axios";
import { useState , useEffect } from "react";
import axios from 'axios';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Update from "../../components/update/update";



const Profile = () =>  {

  const {currentUser} = useContext(AuthContext);
   const [openUpdate, setOpenUpdate] = useState(false);

  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState(null);
  const [imagePath, setImagePath] = useState(currentUser.profilePic);


  const upload = async (file) => {
    console.log("upload")
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log("file"+formData)
      const res = await createRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn:  (user) => {
              return createRequest.put("/students", user); 
        },
    onSuccess: () => {
      queryClient.invalidateQueries(["student"]);
    },
  })

  const handlePicClick = async (e) => {
    
   
    inputRef.current.click();
   // let profileUrl = profile ? await upload(profile) : currentUser.profilePic;

   
    let profileUrl =  await upload(profile) 
    console.log("handlePicClick"+profileUrl)
    mutation.mutate({ profilePic: profileUrl });
    setProfile(null);
    
  }

  const profileImageUrl = profile ? URL.createObjectURL(profile) : imagePath || "/default-profile-image.png";
  return (
    <div className='Profile'>
    <div className='container'>
      <div className='box'>
      <div className='pimage'>
        {/* <img
           src={imagePath} 
          alt="Profile Picture"
          className="profilePic"
        />
              <AddPhotoAlternateIcon id="updateimg" onClick ={handlePicClick} /> */}
         <img
                  src={profileImageUrl}
                  alt=""
                />
                 <CloudUploadIcon id="updateimg"  onClick ={handlePicClick} className="icon" />
         <input type="file" id="profile"  ref={inputRef} onChange={(e) => setProfile(e.target.files[0])} style={{ display: 'none' }} />

         <button onClick={() => setOpenUpdate(true)}>update</button>
      </div>
      <div className="profileContainer">
        <div className="box">
          <div className="left">
            <span>{currentUser.studentEmail}</span>
          </div>
          <div className="center">
            <span>{currentUser.studentName}</span>
          </div>
        </div>
      </div>
      </div>
    </div>
    <Posts stdId={currentUser.studentId} />
    {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={currentUser} />}
    {/* <Update user={currentUser}/> */}
  </div>
  )
}

export default Profile