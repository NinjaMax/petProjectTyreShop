import React, { useEffect, useState } from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminComment.css';

const AdminComment = ({comments}:any) => {
    // const [commentNew, setCommentNew] = useState<any>();

    // useEffect(() => {
    //     setCommentNew(comments);
    // },[comments])

    return (
    <div className='admCommitBox'>
        {comments ?
            comments?.map((item:any, index: number) => {
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