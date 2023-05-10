import React, { useEffect, useState } from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminComment.css';

const AdminComment = ({comments, newCommit}:any) => {
    const [commentNew, setCommentNew] = useState<any>(comments);

    useEffect(() => {
        if(newCommit) {
            setCommentNew([newCommit, ...comments]);   
        }    
    },[comments, newCommit])

    console.log('ADMIN_COMMENT_NEW_ADD', commentNew)
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