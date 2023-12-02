import React, { useEffect, useState } from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminComment.css';

const AdminComment = ({newCommit, comments}:any) => {
    const [commentNew, setCommentNew] = useState<any[] | null>(comments);

    useEffect(() => {
        if(comments && newCommit) {
            setCommentNew(oldComments => [ ...oldComments!, newCommit]);   
        } 
        if (!comments && newCommit) {
            setCommentNew([newCommit]);
        }   
    },[comments, newCommit])

    useEffect(() => {
        if (comments) {
            setCommentNew([ ...comments]);
        } else {
            setCommentNew(null);
        }   
    },[comments]);
    
    console.log('COMMENTS_MODAL: ', comments);
    console.log('COMMENTS_MODAL_NEW: ', comments);

    return (
    <div className='admCommitBox'>
        {commentNew ?
            commentNew?.map((item:any, index: number) => {
                return (
                <div key={index + 1} className="containerAdmComment">
                    <img src={item.user?.picture ?? "../../../assets/icons/customer64.png"} 
                    alt="Avatar"/>
                    <span className="timeAdmCommitLeft">{item.user?.name} ({item.user?.role}):</span>
                    <span className="timeAdmCommitLeft">&nbsp;{new Date(item.createdAt).toLocaleString()}:</span>
                    <span>&nbsp;{item.comments} </span>
                </div>
                )
            })
            : null
        }
    </div>    
    );
};

export default AdminComment;