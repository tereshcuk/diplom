
export const FileDetails = ({ original_name, comment, file_size, upload_date, last_download_date, public_link }) => {
    return (

        <div className = 'fileCard'>            
            <header className = 'cardHeader'>
                <h3 className = 'fileName'>{original_name}</h3>
            </header>
            <ul className = 'metadataList'>
                <li className = 'metaItem'>                    
                    <span className = 'fLabel'>Размер файла:</span>
                    <span className = 'fValue'>{file_size}</span>
                </li>
                <li className ='metaItem'>                    
                    <span className = 'fLabel'>Дата загрузки:</span>
                    <span className = 'fValue'>{upload_date}</span>
                </li>
                <li className = 'metaItem'>                    
                    <span className = 'fLabel'>Последний раз скачан:</span>
                    <span className='fValue'>{last_download_date || 'Еще не скачивался'}</span>
                </li>
                <li className = 'metaItem'>                    
                    <span className = 'fLabel'>Публичная ссылка:</span>
                    <a
                        href = {public_link}
                        target = "_blank"
                        rel = "noopener noreferrer"
                        className = 'fValue publicLink'
                    >
                        Открыть ссылку
                    </a>
                </li>
                {comment && (
                    <li className = 'metaItem'>                        
                        <span className = 'fLabel'>Комментарий:</span>
                        <span className = 'fValue commentBlock'>
                            {comment}
                        </span>
                    </li>
                )}
            </ul>
        </div>
    );
}