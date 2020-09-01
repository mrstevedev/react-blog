import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    commentCount: {
        fontSize: '12px',
        position: 'absolute',
        right: '1rem',
        background: '#0095ff',
        borderRadius: '100%',
        height: '20px',
        width: '20px',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '11px',
        color: '#fff',
        textIndent: 0
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
