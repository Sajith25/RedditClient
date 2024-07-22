import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../redux/postsSlice';
import './PostsList.css'; // Import the CSS file

const PostsList = () => {
  const [subreddit, setSubreddit] = useState('');
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts(subreddit || 'all'));
  }, [dispatch, subreddit]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchPosts(subreddit || 'all'));
  };

  return (
    <div>
      <header className="header">
        <h1 className="title">Reddit</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={subreddit}
            onChange={(e) => setSubreddit(e.target.value)}
            placeholder="Enter subreddit name"
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </header>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-vote">
              <div className="vote-count">{post.ups}</div>
            </div>
            <div className="post-content">
              <a
                href={`https://www.reddit.com${post.permalink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="post-title"
              >
                {post.title}
              </a>
              {post.url && (
                <>
                  {post.url.match(/\.(jpg|jpeg|png)$/) ? (
                    <img src={post.url} alt={post.title} className="post-image" />
                  ) : post.url.match(/\.(mp4)$/) ? (
                    <video controls className="post-video">
                      <source src={post.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : post.selftext ? (
                    <p>{post.selftext}</p>
                  ) : post.media?.reddit_video?.fallback_url ? (
                    <video controls className="post-video">
                      <source src={post.media.reddit_video.fallback_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : null}
                </>
              )}
              <div className="post-footer">
                <span className="post-author">Posted by {post.author}</span>
                <span className="post-timestamp">{new Date(post.created_utc * 1000).toLocaleString()}</span>
                <span className="post-comments">{post.num_comments} comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;
