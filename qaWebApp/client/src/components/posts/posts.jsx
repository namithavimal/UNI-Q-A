import Post from "../post/post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { createRequest } from "../../axios";
import { useState , useEffect } from "react";
import Filter from "../../components/filter/filter";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useSearch } from "../../context/searchContext";

const Posts = ({stdId}) => {
  
    // const { isLoading, error, data } = useQuery({
    //   queryKey: ["posts"],
    //   queryFn: () =>
    //     createRequest.get("/posts").then((res) => {
    //       return res.data;
    //     }),
    // });

    // select category of the
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [postsData, setPostsData] = useState([]);
    const {currentUser} = useContext(AuthContext);

    const { searchTerm } = useSearch();
    console.log(searchTerm);



    // const { isLoading, error, data } = useQuery({
    //   queryKey: ['posts', selectedCategory,stdId], // Include selectedCategory in the query key
    //   queryFn: () =>
    //     createRequest.get("/posts", { params: { category: selectedCategory, stdId} }).then((res) => {
    //       return res.data;
    //     }),
    // });
    // const { isLoading, error, data } = useQuery({
    //   queryKey: ['posts', selectedCategory, stdId], // Include stdId in the query key
    //   queryFn: () =>
    //     createRequest.get("/posts", { params: { category: selectedCategory, stdId } }).then((res) => {
    //       return res.data;
    //     }),
    // });

    const { isLoading, error, data } = useQuery({
      queryKey: ['posts', selectedCategory, stdId],
      queryFn: () => {
        const queryParams = stdId ? { category: selectedCategory, stdId: currentUser.studentId } : { category: selectedCategory };
        return createRequest.get("/posts", { params: queryParams }).then((res) => {
          return res.data;
        });
      },
    });

    useEffect(() => {
      if (!isLoading && !error) {
        setPostsData(data);
      }
    }, [data, isLoading, error]);
    
  const [openCommentPostId, setOpenCommentPostId] = useState(null);

  const handleCommentClick = (postId) => {
    setOpenCommentPostId((prevId) => (prevId === postId ? null : postId));
  };

  
  const filteredData = data ?? [];
  const categories = ['ALL', 'Careers & Employment', 'Course & Modules', 'Finance' , 'General'];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Perform filtering logic based on the selected category
    // You can update the query, make a new API call, or filter the existing data array
  };

  const filteredPosts = filteredData.filter((post) => {
    // Perform filtering logic based on the selected category and search term
    const categoryMatch = selectedCategory === 'ALL' || post.postCategory === selectedCategory;
    const searchTermMatch = post.postsDesc.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchTermMatch;
  });


  console.log(data);
  return (
    <div className="container">
      <Filter options={categories} selectedOption={selectedCategory} onChange={handleCategoryChange} />
      <div className="posts">
        {error
          ? "Something went wrong!"
          : isLoading
          ? "loading"
          : filteredPosts.map((post) => <Post post={post} key={post.id}
          isOpen={openCommentPostId === post.id}
          onCommentClick={() => handleCommentClick(post.id)}
            />)}
      </div>
    </div>
  );
};

export default Posts;