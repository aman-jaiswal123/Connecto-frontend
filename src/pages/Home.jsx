import { useEffect, useState } from "react";

import API from "../api/axios";

import Navbar from "../components/Navbar";

import CreatePost from "../components/Old";

import PostCard from "../components/PostCard";

import Footer from "../components/Footer";



function Home() {

  const [posts, setPosts] = useState([]);



  const fetchPosts = async () => {

    const { data } = await API.get("/posts");
     console.log(data); 
    setPosts(data);

  };



  useEffect(() => {

    fetchPosts();

  }, []);



  return (

    <>

      <Navbar />

      <div className="max-w-2xl mx-auto p-4">

        <CreatePost refresh={fetchPosts} />

       <center><h1>ALL POSTS</h1></center>

        

       {Array.isArray(posts) &&
        posts.map((post) => (
         <PostCard key={post._id} post={post} refresh={fetchPosts} />
  ))}
        {!Array.isArray(posts) && <p className="text-center text-gray-500">No posts available.</p>}



      </div>

      <Footer />

    </>

  );

}



export default Home;