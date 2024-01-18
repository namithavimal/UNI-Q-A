import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comment/comment";
import { useContext, useState, useEffect } from "react";
import moment from "moment";
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { createRequest } from "../../axios";

const Post = ({ post ,isOpen, onCommentClick}) => {

  const {currentUser} = useContext(AuthContext)
  

  const [delMenuOpen, setdelMenuOpen] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () => createRequest.get("/likes?postId=" + post.id).then((res) => res.data),
  });

  console.log(data);
    // Log data within the useEffect to ensure it's available
    // useEffect(() => {
    //   console.log("Data from useQuery:", data);
    // }, [data]);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn:  (liked) => {
                    if (liked) return createRequest.delete("/likes?postId=" + post.id)
                    return createRequest.post("/likes" , {postId : post.id})   
        },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryFn: ['likes'] })
    },
  })

  const handleLike = async () => {
    console.log("handleLike");
    const likedm = data.includes(currentUser.studentId);
    console.log("likedm"+ likedm);
    mutation.mutate(data.includes(currentUser.studentId))

  };

  const delMutation = useMutation({
    mutationFn:  (postId) => {
                    return createRequest.delete("/posts/"+postId )   
        },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryFn: ['posts'] })
    },
  })

  const handleDelete =()=>{

    delMutation.mutate(post.id)
  }

  const isLiked = data && Array.isArray(data) && data.includes(currentUser.studentId);

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.studentId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.studentName}</span>
              </Link>
              <span className="date">{moment(post.postTime).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={()=>setdelMenuOpen(!delMenuOpen)}/>
          {delMenuOpen && post.studentId === currentUser.studentId &&
           (<button onClick={handleDelete}>Delete</button>)}
        </div>
        <div className="content">
          <p>{post.postsDesc}</p>
        </div>
        <div className="info">
          <div className="item">
            {/* {(isLiked) ? (<FavoriteOutlinedIcon style={{ color: "red" }} onClick={handleLike} />
            ) : (
              <FavoriteOutlinedIcon />
            )}
            {data?.length} Likes */}
             {isLoading ? (
              "loading"
            ) : data.includes(currentUser.studentId) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length} Likes
           {/* {data.length} Likes */}
          </div>
          {/* <div className="item" onClick={() => setCommentOpen(!commentOpen)}> */}
          <div className="item" onClick={onCommentClick}>
            <TextsmsOutlinedIcon />
            Show/ Give Responses
          </div>
        </div>
        {isOpen && <Comments postId={post.id}/>}
      </div>
    </div>
  );
};

export default Post;