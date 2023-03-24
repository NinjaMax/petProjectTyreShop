import React from 'react';
import { useForm } from 'react-hook-form';
import '../../../css/AdminComponentCss/AdminContentCss/AdminUploadContent.css'

interface IUploader {
    register(arg:string): void;
    handleSubmit(arg0: any):void;
    onSubmit(arg0: {arg1: any}):void;
    file: (string | Blob)[];
}

const AdminUploaderContent = () => {
    const {register, handleSubmit} = useForm<IUploader>();

    const onSubmit = async (data: { file: (string | Blob)[]; }) => {
        const formData = new FormData();
        formData.append("file", data.file[0]);

        const res = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/uploader/tyres`, {
            headers: { 'Access-Control-Allow-Origin': `${process.env.CORS}`},
            //withCredentials: true,
            method: "POST",
            body: formData,
        }).then((res) => res.json());
        alert(JSON.stringify(`${res.message}, status: ${res.status}`));
    };

    return (
        <div className="uploadContainer">
            <div className='uploadItem'>
                Завантаження Прайс Шин (csv) <i className="fas fa-file-csv"></i>
                <form method="post" encType="multipart/form-data">
                    <div>
                        <label htmlFor="file">Виберіть Прайс в форматі CSV для завантаження </label>
                        <input type="file" id="file"  
                        multiple 
                        {...register("file")}
                        name="file"
                        accept=".csv"/>
                    </div>
                <div>
                    <button onSubmit={handleSubmit(onSubmit)}>Завантажити</button>
                </div>
                </form>
            </div>
            <div className='uploadItem'>
                Завантаження Прайс Диски (csv) <i className="fas fa-file-csv"></i>
                <form method="post" encType="multipart/form-data">
                    <div>
                        <label htmlFor="file">Виберіть Прайс в форматі CSV для завантаження </label>
                        <input type="file" id="file" name="file" multiple
                        accept=".csv"/>
                    </div>
                    <div>
                        <button>Завантажити</button>
                    </div>
                </form>
            </div>
            <div className='uploadItem'>
                Завантаження Прайс АКБ (csv) <i className="fas fa-file-csv"></i>
                <form method="post" encType="multipart/form-data">
                    <div>
                        <label htmlFor="file">Виберіть Прайс в форматі CSV для завантаження </label>
                        <input type="file" id="file" name="file" multiple
                            accept=".csv"/>
                    </div>
                    <div>
                        <button>Завантажити</button>
                    </div>
                </form>
            </div>
            <div className='uploadItem'>
                Завантаження Прайс Автохімія / Масло (csv) <i className="fas fa-file-csv"></i>
                <form method="post" encType="multipart/form-data">
                    <div>
                        <label htmlFor="file">Виберіть Прайс в форматі CSV для завантаження </label>
                        <input type="file" id="file" name="file" multiple
                            accept=".csv"/>
                    </div>
                    <div>
                        <button>Завантажити</button>
                    </div>
                </form>
            </div>   
        </div>
    );
};

export default AdminUploaderContent;