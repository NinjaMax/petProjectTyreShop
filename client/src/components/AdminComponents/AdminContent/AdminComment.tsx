import React from 'react';
import '../../../css/AdminComponentCss/AdminModalFormCss/AdminComment.css';

const AdminComment = ({comments}:any) => {
    return (
    <div className='admCommitBox'>
        {comments ?
            comments.map((comment:any, index: number) => {
                return (
                <div key={index + 1} className="containerAdmComment">
                    <img src="/w3images/bandmember.jpg" alt="Avatar"/>
                    <span className="timeAdmCommitLeft">{comment.user} : </span>
                    <span className="timeAdmCommitLeft"> 02.02.2023 11:00 : </span>
                    <span> {comment.comments} </span>
                </div>
                )
            })
            : null
        }
        
        {/* <div className="containerAdmComment">
            <img src="/w3images/bandmember.jpg" alt="Avatar"/>
            <span className="timeAdmCommitLeft">Миколай : </span>
            <span className="timeAdmCommitLeft"> 02.02.2023 11:00 : </span>
            <span> Hello. How are you today? Hello. How are you today? </span>
        </div>
        <div className="containerAdmComment">
            <img src="/w3images/bandmember.jpg" alt="Avatar"/>
            <span className="timeAdmCommitLeft">Миколай : </span>
            <span className="timeAdmCommitLeft"> 02.02.2023 11:00 : </span>
            <span> Hello. How are you today? Hello. How are you today? </span>
        </div>
        <div className="containerAdmComment">
            <img src="/w3images/bandmember.jpg" alt="Avatar"/>
            <span className="timeAdmCommitLeft">Миколай : </span>
            <span className="timeAdmCommitLeft"> 02.02.2023 11:00 : </span>
            <span> Hello. How are you today? Hello. How are you today? </span>
        </div>
        <div className="containerAdmComment">
            <img src="/w3images/bandmember.jpg" alt="Avatar"/>
            <span className="timeAdmCommitLeft">Миколай : </span>
            <span className="timeAdmCommitLeft"> 02.02.2023 11:00 : </span>
            <span> Hello. How are you today? Hello. How are you today? </span>
        </div> */}
    </div>    
    );
};

export default AdminComment;