import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import DayJS from 'react-dayjs';
import { SpinnerRoundFilled } from 'spinners-react';
import useProgressiveImg from "./useProgressiveImg";
import skyline from '../../public/skyline.jpg';
import axios from "axios";
import { mutate } from "swr";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    marginTop: "0.4rem",
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
  },
  paperContent: {
    padding: "3rem 8rem",
    margin: "1rem 1rem 0 1rem",
    textAlign: "left",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    height: "96%",
    "@media(max-width: 768px)": {
      padding: "3rem 2rem !important",
      whiteSpace: "normal !important",
    },
  },
  title: {
    flexGrow: 1,
  },
  postText: {
    padding: "0.4rem 0 1rem",
  },
  commentSection: {
    padding: "1rem 0",
    maxHeight: "624px",
    overflow: "scroll",
  },
  commentHeader: {
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width: 768px)": {
      display: "initial",
      padding: "3rem 1rem !important",
    },
  },
  comment: {
    margin: "0.2rem 0",
    padding: "1rem 2rem",
    borderRadius: "6px",
    transition: "0.4s ease",
    "&:nth-child(odd)": {
      backgroundColor: "#f7f7f7",
    },
    "&:hover": {
      backgroundColor: "#f7f7f7",
    },
    "@media(max-width: 415px)": {
      padding: "2rem 0",
      borderBottom: "solid 1px #ccc",
      "&:last-child": {
        borderBottom: "solid 1px transparent",
      },
      "&:nth-child(odd)": {
        backgroundColor: "transparent",
      },
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  },
  commentTxt: {
    padding: "0.5rem 0",
  },
  commentName: {
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width: 768px)": {
      display: "initial",
    },
  },
  postDate: {
    fontWeight: "500",
    fontSize: "12px",
  },
  successMsg: {
    fontWeight: "bold",
    color: "cadetblue",
    padding: "2rem 0",
  },
  postContent: {
    // padding:  '2rem 2rem',
    "@media(min-width: 768px)": {
      // padding:  '5rem 8rem'
    },
  },
  relatedPosts: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridGap: '16px',
    margin: "1rem 0",
  },
  chip: {
    margin: "0 0.5rem 0 0",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#797979",
    "&:hover": {
      background: "#3f51b5",
      color: "#fff",
    },
  },
  linkText: {
    color: "#3f51b5",
    textDecoration: "none",
  },
  adminText: {
    color: "#ccc",
  },
  featuredPost: {
    background: "#333",
    color: "#fff",
    padding: "0.3rem 0.6rem",
    borderRadius: "4px",
    fontWeight: "bold",
    fontSize: "12px",
  },
  reactSpinner: {
      display: 'flex',
      justifyContent: 'center',
      margin: '3rem 0 0 0'
  }
}));

function LatestPost(props) {
  const classes = useStyles();
  const { posts, comments } = props;
  const [arrow, setArrow] = useState(true);
  const [heartFill, setHeartFill] = useState(null);
  // console.log(props);

  const { REACT_APP_API_URL } = process.env;

  const lastPost = posts.slice(posts.length - 1);
  // console.log(lastPost);

  const splitTags = lastPost.map((post) => post.tags.split(", "));
  // console.log(splitTags);

  // Flatten Array
  const flattenTags = splitTags.flat();
  // console.log(flattenTags);
  // Remove duplicates
  let newTags = flattenTags.filter((v, i) => flattenTags.indexOf(v) === i);

// useEffect(() => {
//     window.addEventListener('scroll', function(e) {
//         if (pageYOffset >= 20) {
//             setArrow(false);
//         } else if(pageYOffset <= 20) {
//             setArrow(true);
//         }
//     });
// }, [])

const handleHeart = (e, id) => {

  e.currentTarget.classList.toggle('pop');
  e.currentTarget.childNodes[0].childNodes[1].classList.toggle('fill');
  e.currentTarget.parentNode.classList.toggle('liked');
    
  if(e.currentTarget.parentNode.classList.contains('liked')) {
    axios.patch(`${ REACT_APP_API_URL }/posts/${id}`, {
      data: { id: id }
    }).then(res => {
        mutate(`${ REACT_APP_API_URL }/posts`, id);
        res.data
    } )
    .catch(err => {
      throw err
    })
  } else {
    axios.patch(`${ REACT_APP_API_URL }/posts/${id}`, {
        data: { id: id, decrement: true }
    }).then(res => {
        mutate(`${ REACT_APP_API_URL }/posts`, id);
          res.data
    } )
    .catch(err => {
        throw err
    })
  }
}

  return (
    <Fragment>
      <div className="container" id="top">
          {posts.slice(posts.length - 1).map((post) => (
            <div key={post.id}>
              <span className={classes.featuredPost}>Featured Post</span>             
              <h1
                style={{
                  fontSize: "2.4rem",
                  fontWeight: "bold",
                  margin: "0.5rem 0",
                }}
              >
                   <Link style={{ color: "#000" }} to={{
                  pathname: `/post/${ post.title
                    .split(" ")
                    .join("-")
                    .toLowerCase()}`,
                    state: {
                        post: post,
                        posts: posts,
                        comments: comments
                    }
              }}>
                {post.title}{" "}
            </Link>
            {/* <span className={classes.adminText}> | Posted by { post.name }</span> */}
              </h1>
              <Link to={{ 
                  pathname: `/post/${ post.title
                    .split(' ')
                    .join('-')
                    .toLowerCase()  }`,
                  state: {
                    post: post,
                    posts: posts,
                    comments: comments
                  }
              }}>
                <div style={{ height: '610px' }}>
                <div
                className="fade-in"           
                style={{
                    background: `url(${ skyline }) 0 -330px no-repeat`,
                    width: "100%",
                    height: '100%',
                    borderRadius: "6px",
                    margin: "0.5rem 0"                   
                }}></div>
                </div>
              </Link>
              <p
                style={{
                  width: "100%",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: "1.3rem",
                  fontWeight: "500",
                  color: "#888",
                  lineHeight: "43px",
                  margin: '1rem 0 0 0'
                }}
              >
                {post.body}
              </p>
              <p
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "500",
                  color: "#888",
                  cursor: "pointer",
                }}
              >
                <Link
                  className={`link ${ classes.linkText }`}
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
                  // onClick={() => props.handleGetPost(event, post)}
                >
                  Read More
                </Link>
              </p>
              <div style={{  display: 'flex', alignItems: 'center', margin: '1rem 0 3rem', justifyContent: 'space-between' }}>
              {/* Left */}
              <div>
              {newTags.map((tag, index) => (
                <Link
                  key={index}
                  to={{
                    pathname: "/posts",
                    state: {
                      posts: posts,
                      tag: tag,
                      comments: comments,
                    },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Chip size="small" label={ tag.toLowerCase() } className={classes.chip} />
                </Link>
              ))}
               <span className="" style={{ color: '#333', fontSize: "12px", fontWeight: 'bold' }}>Posted by 
                    <Link to={{
                        pathname: '/user',
                        state: {
                            post: post
                        }
                    }} style={{ textDecoration: 'none', color: '#3f51b5' }}> { post.name } </Link> 
                        on <DayJS date = { post.createdAt } format="MMMM D, YYYY h:mm A" />
                </span>
              </div>

                {/* Heart Functionality */}
                <div className="post-list" style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 'bold',
                   
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '0 0.5rem' }}>
                        <span style={{  margin: '0 0.5rem 0 0' }}>{ comments.filter(comment => comment.post_id === post.id).length }</span>                  
                        <svg width="19" height="19" viewBox="0 0 24 22"xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                          <path fill="#66a6d9" d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007m0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007"/>
                        </svg>   
                        </div>
                  <div className="post-likes" style={{ display: 'flex', alignItems: 'center', margin: '0 0.5rem', position: 'relative' }}>
                    <span style={{  margin: '0 1.5rem 0 0' }}>{ post.likes }</span>                  
                    {/* Toggle SVG */} 
                    <span id="heart">
                        <svg onClick={(e) => handleHeart(e, post.id)} className="heart" fill="none" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 16 15">
                          <g strokeMiterlimit="10">
                            <path d="M8,15,6.84,13.937C2.72,10.1,0,7.6,0,4.5A4.386,4.386,0,0,1,4.4,0,4.7,4.7,0,0,1,8,1.717,4.7,4.7,0,0,1,11.6,0,4.386,4.386,0,0,1,16,4.5c0,3.106-2.72,5.6-6.84,9.441Z" stroke="none"/>
                            <path d="M 8 13.64373970031738 L 8.48186206817627 13.20225715637207 L 8.644049644470215 13.05103969573975 C 12.47146034240723 9.482660293579102 15 7.125249862670898 15 4.49590015411377 C 15 3.53331995010376 14.65030956268311 2.645900011062622 14.01533985137939 1.997089982032776 C 13.38607025146484 1.3541100025177 12.52828979492188 1 11.60000038146973 1 C 10.53046035766602 1 9.472579956054688 1.506360054016113 8.770179748535156 2.354510068893433 L 8.000020027160645 3.284480094909668 L 7.22983980178833 2.354520082473755 C 6.527400016784668 1.506360054016113 5.469510078430176 1 4.400000095367432 1 C 3.471709966659546 1 2.613929986953735 1.3541100025177 1.984660029411316 1.997089982032776 C 1.349689960479736 2.645900011062622 1 3.53331995010376 1 4.49590015411377 C 1 7.125249862670898 3.528589963912964 9.482709884643555 7.356080055236816 13.05115985870361 L 7.518139362335205 13.2022590637207 L 8 13.64373970031738 M 8 15 L 6.839849948883057 13.9370698928833 C 2.719919919967651 10.09539031982422 0 7.601950168609619 0 4.49590015411377 C 0 1.9617600440979 1.919919967651367 -8.881784197001252e-16 4.400000095367432 -8.881784197001252e-16 C 5.799960136413574 -8.881784197001252e-16 7.119880199432373 0.653980016708374 8 1.71668004989624 C 8.880080223083496 0.653980016708374 10.19995975494385 -8.881784197001252e-16 11.60000038146973 -8.881784197001252e-16 C 14.08008003234863 -8.881784197001252e-16 16 1.9617600440979 16 4.49590015411377 C 16 7.601990222930908 13.28003978729248 10.09543037414551 9.160149574279785 13.9370698928833 L 8 15 Z" stroke="none" fill="#66a6d9"/>
                          </g>
                        </svg>         
                    </span>
                    {/* End Toggle SVG */}
                    </div>
                </div>
                </div>
              
              {/* Related Component */}
              <div>
                    {posts.slice(0, -1).reverse().map((post) => (
                        <Fragment key={post.id}>
                            <div style={{ padding: '1rem 0 0 0', borderTop: 'solid 1px #ccc', margin: '1rem 0 2rem', fontWeight: "bold" }}>
                                <Link style={{ color: '#333' }}
                                to={{
                                    pathname: `/post/${ post.title
                                    .split(' ')
                                    .join('-')
                                    .toLowerCase() }`,
                                    state: {
                                      post: post,
                                      posts: posts,
                                      comments: comments
                                    }
                                }}>
                                <h4 style={{ fontSize: "2rem" }}>{post.title}</h4>
                                </Link>
                                <p style={{ fontWeight: '500', lineHeight: '47px', fontSize: '1.1rem', color: 'rgb(136, 136, 136)' }}>{post.body}</p>

                            <div style={{ display: 'flex', alignItems: 'center', margin: '0.4rem 0 0 0', justifyContent: 'space-between' }}>    
                            {/* Left */}
                            <div>
                            {/* filter tags in post loop */}
                           {post.tags.split(', ')
                            .filter((val, i) => val)
                            .map((tag, i) => (
                                <Link key={i} to={{
                                    pathname: '/posts',
                                    state: {
                                        post: post,
                                        posts: posts,
                                        tag: tag,
                                        comments: comments
                                    }                                   
                                }}>
                                    <Chip size="small" label={ tag.toLowerCase() } className={classes.chip} />
                                </Link>
                           ))}
                                
                                <span className="" style={{ color: '#333', fontSize: "12px", fontWeight: 'bold' }}>Posted by 
                                    <Link to={{
                                        pathname: '/profile',
                                        state: {
                                            post: post
                                        }
                                    }} style={{ textDecoration: 'none', color: '#3f51b5' }}> { post.name } </Link> 
                                        on <DayJS date = { post.createdAt } format="MMMM D, YYYY h:mm A" />
                                </span>
                                </div>
                                 {/* Heart Functionality */}
                            <div style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold' }}>
                                <div style={{ display: 'flex', alignItems: 'center', margin: '0 0.5rem' }}>
                                    <span style={{  margin: '0 0.5rem 0 0' }}>{ comments.filter(comment => comment.post_id === post.id).length }</span>   
                                    <svg width="19" height="19" viewBox="0 0 24 22"xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                                        <path fill="#66a6d9" d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007m0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007"/>
                                    </svg>   
                                    </div>
                                    <div className="post-likes" style={{ display: 'flex', alignItems: 'center', margin: '0 0.5rem',  position: 'relative' }}>
                                    <span style={{  margin: '0 1.5rem 0 0' }}>{ post.likes }</span>
                                       {/* Toggle SVG */} 
                                        <span id="heart">
                                        {/* No Fill */}
                                            <svg onClick={(e) => handleHeart(e, post.id)} className="heart" fill="none" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 16 15">
                                            <g strokeMiterlimit="10">
                                              <path d="M8,15,6.84,13.937C2.72,10.1,0,7.6,0,4.5A4.386,4.386,0,0,1,4.4,0,4.7,4.7,0,0,1,8,1.717,4.7,4.7,0,0,1,11.6,0,4.386,4.386,0,0,1,16,4.5c0,3.106-2.72,5.6-6.84,9.441Z" stroke="none"/>
                                              <path d="M 8 13.64373970031738 L 8.48186206817627 13.20225715637207 L 8.644049644470215 13.05103969573975 C 12.47146034240723 9.482660293579102 15 7.125249862670898 15 4.49590015411377 C 15 3.53331995010376 14.65030956268311 2.645900011062622 14.01533985137939 1.997089982032776 C 13.38607025146484 1.3541100025177 12.52828979492188 1 11.60000038146973 1 C 10.53046035766602 1 9.472579956054688 1.506360054016113 8.770179748535156 2.354510068893433 L 8.000020027160645 3.284480094909668 L 7.22983980178833 2.354520082473755 C 6.527400016784668 1.506360054016113 5.469510078430176 1 4.400000095367432 1 C 3.471709966659546 1 2.613929986953735 1.3541100025177 1.984660029411316 1.997089982032776 C 1.349689960479736 2.645900011062622 1 3.53331995010376 1 4.49590015411377 C 1 7.125249862670898 3.528589963912964 9.482709884643555 7.356080055236816 13.05115985870361 L 7.518139362335205 13.2022590637207 L 8 13.64373970031738 M 8 15 L 6.839849948883057 13.9370698928833 C 2.719919919967651 10.09539031982422 0 7.601950168609619 0 4.49590015411377 C 0 1.9617600440979 1.919919967651367 -8.881784197001252e-16 4.400000095367432 -8.881784197001252e-16 C 5.799960136413574 -8.881784197001252e-16 7.119880199432373 0.653980016708374 8 1.71668004989624 C 8.880080223083496 0.653980016708374 10.19995975494385 -8.881784197001252e-16 11.60000038146973 -8.881784197001252e-16 C 14.08008003234863 -8.881784197001252e-16 16 1.9617600440979 16 4.49590015411377 C 16 7.601990222930908 13.28003978729248 10.09543037414551 9.160149574279785 13.9370698928833 L 8 15 Z" stroke="none" fill="#66a6d9"/>
                                            </g>
                                          </svg>
                                        </span>
                                        {/* End Toggle SVG */}
                                </div>
                            </div>
                            </div>                           
                            </div>                           
                        </Fragment>
                    ))}
                    <div className={ classes.reactSpinner }>
                    { posts.length > 5 ? (
                        <SpinnerRoundFilled size={50} thickness={97} speed={100} color="rgba(57, 126, 172, 1)" />
                    ) : '' }
                </div>
                <div className="back-to-top" style={{ textAlign: 'right' }}>
                    <a style={{ color: '#333', textTransform: 'uppercase', fontSize: '11px', fontWeight: 'bold' }} href="#top">back to top</a>
                </div>
              </div>                          
            </div>
          ))}
      </div>
     {/* { arrow === true ? (
          <div className="arrow bounce" style={{ textAlign: 'center', position: 'fixed', bottom: '0.6rem', margin: '0', left: '5.1rem', right: '0' }}>
          <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fillRule="evenodd" clipRule="evenodd"><path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z"/></svg>
          </div>
     ) : null } */}    
    </Fragment>
  );
}
export default LatestPost;
