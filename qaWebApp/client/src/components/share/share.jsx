import "./share.scss";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRequest } from "../../axios";

const Share = () => {

  const {currentUser} = useContext(AuthContext)

  const [postsDesc, setDesc] = useState("");
  const [postCategory, setCategory] = useState("");


  // To access the client
  const queryClient = useQueryClient();

  // const mutation = useMutation(
  //   (newPost) => {
  //     return createRequest.post("/posts", newPost)
  //   },
  //   {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries(["posts"]);
  //     },
  //   }
  // );
  
  const mutation = useMutation({
    mutationFn:  (newPost) => {
        return createRequest.post("/posts", newPost)
        },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryFn: ['posts'] })
    },
  })

  const handleClick = (e) => {
    e.preventDefault();
    console.log("handle click")
    console.log(postsDesc)
    mutation.mutate({postsDesc,postCategory});
    setDesc("");
  };

  const categories = [ 'General', 'Careers & Employment', 'Course & Modules', 'Finance' ];

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={currentUser.profilePic}
            alt="profilePic"
          />
          <input type="text" placeholder={`What do you want to ask ${currentUser.studentName}?`}
          value={postsDesc}
           onChange={(e) => setDesc(e.target.value) 
           }  />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <span className="category">Select the query category</span>
            <select
              className="filterCategory"
              value={postCategory}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}  
            </select>
            <input type="file" id="file" style={{display:"none"}} />
          </div>
          <div className="right">
            <button onClick={handleClick} >POST</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;