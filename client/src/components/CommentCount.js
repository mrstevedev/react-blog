import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    commentCount: {
        position: 'absolute',
        right: '1rem',
        borderRadius: '100%',
        height: '20px',
        width: '20px',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '11px',
        color: '#ababab',
        textIndent: 0,
        fontWeight: 'bold'
    }
}))

function CommentCount(props) {
    const classes = useStyles();
    const { post, comments } = props;
    const count = comments.filter((comment) => comment.post_id === post.id).length;
    return (
        <Fragment>
            <span className={ classes.commentCount }>
                { count }             
            </span>
        </Fragment>
    )
}
export default CommentCount;
