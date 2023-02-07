import React from 'react';
import '../../../css/AdminComponentCss/AdminContentCss/AdminUploadContent.css'

const AdminUploaderContent = () => {
    return (
        <div className="uploadContainer">
            <div className='uploadItem'>
                Завантаження Прайс Шин (xml) <i className="fas fa-file-code"></i>
                <form method="post" encType="multipart/form-data">
                <div>
                <label htmlFor="file">Виберіть Прайс в форматі XML для завантаження </label>
                <input type="file" id="file" name="file" multiple
                    accept=".xml"/>
                </div>
                <div>
                    <button>Завантажити</button>
                </div>
                </form>
            </div>
            <div className='uploadItem'>
                Завантаження Прайс Диски (xml) <i className="fas fa-file-code"></i>
                <form method="post" encType="multipart/form-data">
                <div>
                <label htmlFor="file">Виберіть Прайс в форматі XML для завантаження </label>
                <input type="file" id="file" name="file" multiple
                    accept=".xml"/>
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
                    accept=".xml"/>
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
                    accept=".xml"/>
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