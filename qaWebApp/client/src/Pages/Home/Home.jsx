import './Home.scss';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Share from "../../components/share/share";
import Post from "../../components/posts/posts";

function Home() {

const {currentUser} = useContext(AuthContext)
  return (
    <div class ="Home">
    <Share/>
    <Post/>
    </div>

  )
}

export default Home