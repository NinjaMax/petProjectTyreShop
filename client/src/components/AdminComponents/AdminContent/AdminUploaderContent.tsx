import React, { useEffect, useState } from 'react';
//import { useForm } from 'react-hook-form';
import '../../../css/AdminComponentCss/AdminContentCss/AdminUploadContent.css'
import { getFiles, uploadPriceTyreForm } from '../../../restAPI/restAdminAPI';

interface IUploader {
    register(arg:string): void;
    handleSubmit(arg0: any):void;
    onSubmit(arg0: {arg1: any}):void;
    file: (string | Blob)[];
}

const AdminUploaderContent = () => {
    //const {register, handleSubmit} = useForm<IUploader>();
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [fileInfos, setFileInfos] = useState([]);

    useEffect(() => {
        getFiles().then((response: any) => {
          setFileInfos(response?.data);
        });
      }, []);

    const selectFile = (event: any) => {
        setSelectedFiles(event.target.files);
      };

    const uploadTyrePrice = async () => {
        let currentFile = selectedFiles?[0];
        console.log('SELECTED_FILE', currentFile);
        setProgress(0);
        setCurrentFile(currentFile);

        uploadPriceTyreForm(currentFile, (event:any) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
          })
            .then((response:any) => {
              setMessage(response?.data?.message);
              //return getFiles();
            })
            .then((files:any) => {
              setFileInfos(files?.data);
            })
            .catch((error) => {
              setProgress(0);
              setMessage("Could not upload the file!");
              setCurrentFile(undefined);
              console.log(error);
            });
      
          setSelectedFiles(undefined);
        // const formData = new FormData();
        // formData.append("file", data.file[0]);

        // const res = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/uploader/tyres`, {
        //     headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
        //     //withCredentials: true,
        //     method: "POST",
        //     body: formData,
        // }).then((res) => res.json());
        // alert(JSON.stringify(`${res.message}, status: ${res.status}`));
    };

    return (
        <div className="uploadContainer">
            <div className='uploadItem'>
                Завантаження Прайс Шин (csv) <i className="fas fa-file-csv"></i>
                {/* <form method="post" encType="multipart/form-data"> */}
                {currentFile && (
                    <div className="progress">
                        <div
                            className="progress-bar progress-bar-info progress-bar-striped"
                            role="progressbar"
                            aria-valuenow={progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{width: progress + '%'}}
                        >
                        {progress}%
                        </div>
                    </div>
                )}
                    <div>
                        <label htmlFor="file">Виберіть Прайс в форматі CSV для завантаження </label>
                        <input 
                        type="file" 
                        //id="file"  
                        //multiple 
                        onChange={selectFile}
                        //{...register("file")}
                        //name="file"
                        //accept=".csv"
                        />
                    </div>
                <div>
                    <button 
                    disabled={!selectedFiles}
                    onClick={uploadTyrePrice}
                    //onSubmit={onSubmit}
                    >Завантажити</button>
                </div>
                <div className="alert alert-light" role="alert">
                    {message}
                </div>
                <div className="card">
                <div className="card-header">List of Files</div>
                    <ul className="list-group list-group-flush">
                    {fileInfos &&
                        fileInfos.map((file:{url:string, name: string}, index:number) => (
                        <li className="list-group-item" key={index}>
                        <a href={file.url}>{file.name}</a>
                    </li>
                    ))}
                    </ul>
                </div>
                {/* </form> */}
            </div>
            <div className='uploadItem'>
                Завантаження Прайс Диски (csv) <i className="fas fa-file-csv"></i>
                {/* <form method="post" encType="multipart/form-data"> */}
                    <div>
                        <label htmlFor="file">Виберіть Прайс в форматі CSV для завантаження </label>
                        <input type="file" id="file" name="file" multiple
                        accept=".csv"/>
                    </div>
                    <div>
                        <button>Завантажити</button>
                    </div>
                {/* </form> */}
            </div>
            <div className='uploadItem'>
                Завантаження Прайс АКБ (csv) <i className="fas fa-file-csv"></i>
                {/* <form method="post" encType="multipart/form-data"> */}
                    <div>
                        <label htmlFor="file">Виберіть Прайс в форматі CSV для завантаження </label>
                        <input type="file" id="file" name="file" multiple
                            accept=".csv"/>
                    </div>
                    <div>
                        <button>Завантажити</button>
                    </div>
                {/* </form> */}
            </div>
            <div className='uploadItem'>
                Завантаження Прайс Автохімія / Масло (csv) <i className="fas fa-file-csv"></i>
                {/* <form method="post" encType="multipart/form-data"> */}
                    <div>
                        <label htmlFor="file">Виберіть Прайс в форматі CSV для завантаження </label>
                        <input type="file" id="file" name="file" multiple
                            accept=".csv"/>
                    </div>
                    <div>
                        <button>Завантажити</button>
                    </div>
                {/* </form> */}
            </div>   
        </div>
    );
};

export default AdminUploaderContent;