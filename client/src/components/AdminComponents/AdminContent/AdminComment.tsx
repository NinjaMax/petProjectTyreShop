import React, { useEffect, useState } from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminComment.css';

const AdminComment = ({newCommit, comments}:any) => {
    const [commentNew, setCommentNew] = useState<any>(comments);

    useEffect(() => {
        if(newCommit) {
            setCommentNew([ ...comments, newCommit]);   
        }   
    },[comments, newCommit])

    useEffect(() => {
        if (comments) {
            setCommentNew([ ...comments]);
        }   
    },[comments])

    console.log('ADMIN_COMMENT_GET_COMMENTS', comments);
    console.log('ADMIN_COMMENT_GET_COMMENT_NEW', newCommit);
    console.log('ADMIN_COMMENT_NEW_ADD', commentNew);

    return (
    <div className='admCommitBox'>
        {commentNew ?
            commentNew?.map((item:any, index: number) => {
                return (
                <div key={index + 1} className="containerAdmComment">
                    <img src={item.user?.picture ?? "../../../assets/icons/customer64.png"} 
                    alt="Avatar"/>
                    <span className="timeAdmCommitLeft">{item.user?.name}:</span>
                    <span className="timeAdmCommitLeft">{" " + new Date(item.createdAt).toLocaleString()}:</span>
                    <span> {" " + item.comments} </span>
                </div>
                )
            })
            : null
        }
    </div>    
    );
};

export default AdminComment;