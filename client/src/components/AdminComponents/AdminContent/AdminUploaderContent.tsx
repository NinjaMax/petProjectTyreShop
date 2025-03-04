import React, { useState } from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminUploadContent.css'
import { uploadPriceTyreForm, uploadPriceWheelForm } from '../../../restAPI/restAdminAPI';

const AdminUploaderContent = () => {
    //const {register, handleSubmit} = useForm<IUploader>();
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [progressWheel, setProgressWheel] = useState(0);
    const [progressBattery, setProgressBattery] = useState(0);
    const [progressOils, setProgressOils] = useState(0);
    const [message, setMessage] = useState("");
    const [messageWheel, setMessageWheel] = useState("");
    const [messageBattery, setMessageBattery] = useState("");
    const [messageOils, setMessageOils] = useState("");

    const selectFile = (event: any) => {
        setSelectedFiles(event.target.files);
        console.log(event.target.files);
      };

    const uploadTyrePrice = async () => {
        let currentFile = selectedFiles![0];
        setProgress(0);
        setCurrentFile(currentFile);

        uploadPriceTyreForm(currentFile, (event:any) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
          })
            .then((response:any) => {
              setMessage(response?.data);
            })
            .catch((error) => {
              setProgress(0);
              setMessage("Could not upload the file!");
              setCurrentFile(undefined);
              console.log(error);
            });
      
        setSelectedFiles(null);
    };

    const uploadWheelPrice = async () => {
        let currentFile = selectedFiles![0];
        setProgressWheel(0);
        setCurrentFile(currentFile);

        uploadPriceWheelForm(currentFile, (event:any) => {
            setProgressWheel(Math.round((100 * event.loaded) / event.total));
          })
            .then((response:any) => {
              setMessageWheel(response?.data);
            })
            .catch((error) => {
              setProgressWheel(0);
              setMessageWheel("Could not upload the file!");
              setCurrentFile(undefined);
              console.log(error);
            });
      
        setSelectedFiles(null);
    };

    return (
        <div className="uploadContainer">
            <div className='uploadItem'>
                Завантаження Прайс Шин (csv) <i className="fas fa-file-csv"></i>
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
                        onChange={selectFile}
                        accept=".csv"
                        />
                    </div>
                <div>
                    <button 
                    disabled={!selectedFiles}
                    onClick={uploadTyrePrice}
                    >Завантажити</button>
                </div>
                <div className="alert alert-light" role="alert">
                    {message ?? ''}
                </div>
            </div>
            <div className='uploadItem'>
                Завантаження Прайс Диски (csv) <i className="fas fa-file-csv"></i>
                {currentFile && (
                    <div className="progress">
                        <div
                            className="progress-bar progress-bar-info progress-bar-striped"
                            role="progressbar"
                            aria-valuenow={progressWheel}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{width: progressWheel + '%'}}
                        >
                        {progressWheel}%
                        </div>
                    </div>
                )}
                    <div>
                        <label htmlFor="file">Виберіть Прайс в форматі CSV для завантаження </label>
                        <input 
                        type="file" 
                        onChange={selectFile}
                        accept=".csv"
                        />
                    </div>
                <div>
                    <button 
                    disabled={!selectedFiles}
                    onClick={uploadWheelPrice}
                    >Завантажити</button>
                </div>
                <div className="alert alert-light" role="alert">
                    {messageWheel ?? ''}
                </div>
            </div>
            <div className='uploadItem'>
                Завантаження Прайс АКБ (csv) <i className="fas fa-file-csv"></i>
                {currentFile && (
                    <div className="progress">
                        <div
                            className="progress-bar progress-bar-info progress-bar-striped"
                            role="progressbar"
                            aria-valuenow={progressBattery}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{width: progressBattery + '%'}}
                        >
                        {progressBattery}%
                        </div>
                    </div>
                )}
                    <div>
                        <label htmlFor="file">Виберіть Прайс в форматі CSV для завантаження </label>
                        <input 
                        type="file" 
                        onChange={selectFile}
                        accept=".csv"
                        />
                    </div>
                <div>
                    <button 
                    disabled={!selectedFiles}
                    onClick={() => console.log('ЗАГРУЗКА ПРАЙС АКБ')}
                    >Завантажити</button>
                </div>
                <div className="alert alert-light" role="alert">
                    {messageBattery ?? ''}
                </div>
            </div>
            <div className='uploadItem'>
                Завантаження Прайс Автохімія / Масло (csv) <i className="fas fa-file-csv"></i>
                {currentFile && (
                    <div className="progress">
                        <div
                            className="progress-bar progress-bar-info progress-bar-striped"
                            role="progressbar"
                            aria-valuenow={progressOils}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{width: progressOils + '%'}}
                        >
                        {progressOils}%
                        </div>
                    </div>
                )}
                    <div>
                        <label htmlFor="file">Виберіть Прайс в форматі CSV для завантаження </label>
                        <input 
                        type="file" 
                        onChange={selectFile}
                        accept=".csv"
                        />
                    </div>
                <div>
                    <button 
                    disabled={!selectedFiles}
                    onClick={() => console.log('ЗАГРУЗКА ПРАЙС АВТОХІМІЯ')}
                    >Завантажити</button>
                </div>
                <div className="alert alert-light" role="alert">
                    {messageOils ?? ''}
                </div>              
            </div>
        </div>
    );
};

export default AdminUploaderContent;