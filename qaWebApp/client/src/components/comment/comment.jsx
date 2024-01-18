import './comment.scss'
import { AuthContext } from "../../context/authContext";
import { useContext ,useState} from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createRequest } from "../../axios";
import moment from "moment";

const Comments = ({postId}) => {

  const { currentUser } = useContext(AuthContext);

  const [commentDesc, setDesc] = useState("");

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      createRequest.get("/comments?postId="+postId).then((res) => {
        return res.data;
      }),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn:  (newComment) => {
        return createRequest.post("/comments", newComment)
        },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryFn: ['comments'] })
    },
  })

  const handleClick = (e) => {
    e.preventDefault();
    console.log("click1");
    console.log(postId);
    mutation.mutate({commentDesc,postId});
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment" 
         value={commentDesc}
         onChange={(e) => setDesc(e.target.value)}/>
        <button onClick={handleClick}>Send</button>
      </div>
      { error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        :data.map((comment) => (
        <div className="comment">
          <img src={comment.profilePic} alt="" />
          <div className="info">
            <span>{comment.studentName}</span>
            <p>{comment.commentDesc}</p>
          </div>
          <span className="date">{moment(comment.createTime).fromNow()}</span>
        </div>
      ))}
    </div>
  )
}

export default Comments;
