import React, { useEffect, useState } from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminComment.css';

const AdminComment = ({newCommit, comments}:any) => {
    const [commentNew, setCommentNew] = useState<any[] | null>();
    
    useEffect(() => {
        if (comments) {
            setCommentNew(comments);
        } else {
            setCommentNew([]);
        } 
    },[comments]);
    
    useEffect(() => {
        if (newCommit) {
            setCommentNew(oldComments => [newCommit, ...oldComments!]);   
        } 
    },[newCommit])

    return (
    <div className='admCommitBox'>
        {commentNew ?
            commentNew?.map((item:any, index: number) => {
                return (
                <div key={index + 1} className="containerAdmComment">
                    <img src={item.user.picture ?? "./customer64.png"} 
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