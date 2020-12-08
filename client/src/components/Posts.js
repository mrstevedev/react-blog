import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  taggedPosts: {
    "&:nth-child(odd)": {
      background: "#eaeaea",
    },
    "&:hover": {
      background: "#eaeaea",
    },
  },
  filteredPosts: {
    height: "550px",
  },
}));

function Posts(props) {
  const classes = useStyles();
  const postsPerPage = 3;
  const [page, setPage] = useState(1);

  const comments = props.location.state.comments;
  const tag = props.location.state.tag;
  const posts = props.location.state.posts;

  const [noOfPages] = useState(
    Math.floor(
      posts.filter((post) =>
        post.tags.split(", ").find((split) => split === tag)
      ).length / postsPerPage
    )
  );

  const haveTags = posts.filter(function (post) {
    const tags = post.tags.split(", ");
    return tags.find(function (splitTags) {
      // console.log(splitTags === tag)
      return splitTags === tag;
    });
  });

  const handleChange = (event, value) => {
    setPage(value);
  };
  //   console.log(haveTags);
  return (
    <Fragment>
      <div className="container">
        <h1 style={{ fontSize: "2.4rem", fontWeight: "bold", color: "#000" }}>
          Posts tagged <span style={{ color: "#ccc" }}>{tag}</span>
        </h1>
        <div style={{ margin: "2rem 0" }}>
          <h3>Showing {haveTags.length} total posts</h3>
        </div>
        <div className={classes.filteredPosts}>
          {haveTags.length > 0 ? (
            haveTags
              .slice((page - 1) * postsPerPage, page * postsPerPage)
              .map((post) => (
                <div
                  key={post.id}
                  style={{
                    margin: "2rem 0",
                    padding: "2rem",
                    borderRadius: "6px",
                  }}
                  className={classes.taggedPosts}
                >
                  <Link
                    to={{
                      pathname: `/post/${post.title}`,
                    }}
                  ></Link>
                  <h3>{post.title}</h3>
                  <p
                    style={{
                      width: "650px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textOverflow: "ellipsis",
                      fontSize: "1.3rem",
                      fontWeight: "500",
                      color: "#888",
                      lineHeight: "43px",
                    }}
                  >
                    {post.body}
                  </p>
                  <Link
                    className="link"
                    to={{
                      pathname: `/post/${post.title
                        .split(" ")
                        .join("-")
                        .toLowerCase()}`,
                      state: {
                        posts: posts,
                        post: post,
                        comments: comments,
                      },
                    }}
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "500",
                      color: "#3f51b5",
                      cursor: "pointer",
                      textDecoration: "none",
                    }}
                    //   onClick={() => props.handleGetPost(event, post)}
                  >
                    Read More
                  </Link>
                </div>
              ))
          ) : (
            <div style={{ margin: "2rem 1rem" }}>
              <h2>There are no posts</h2>
            </div>
          )}
        </div>
        {haveTags.length > 3 ? (
          <Pagination
            count={noOfPages}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
}

export default Posts;
