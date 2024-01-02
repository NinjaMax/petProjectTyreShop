import React, { useEffect, useState } from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminComment.css';

type AdminComments ={
    newCommit?: any;
    comments: any;
    main: boolean;
};

type AdminCommentsNew = {
    newCommit: [{
        user: {
            name: string,
            role: string,
            picture: string,
        },
        createdAt: any;
        comments: string;
    }, ] | null; 
    comments:
        [{
            user: {
                name: string,
                role: string,
                picture: string,
            },
            createdAt: any;
            comments: string;
        }, ] | null;
};

const AdminComment = ({newCommit, comments, main}:AdminComments) => {
    const [commentNew, setCommentNew] = useState<AdminCommentsNew[] | null>();
    
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
    <div className={main ? 'admCommitBox admCommitBoxMain' : 'admCommitBox'}>
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