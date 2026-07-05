
export const FileDetails = ({ original_name, comment, file_size, upload_date, last_download_date, public_link }) => {
    return (
        
        <div>
            <h3>{original_name}</h3>
            <ul>
                <li><strong>Размер файла:</strong> {file_size}</li>
                <li><strong>Дата загрузки:</strong> {upload_date}</li>
                <li><strong>Последний раз скачан:</strong> {last_download_date}</li>
                <li><strong>Публичная ссылка:</strong> {public_link}</li>
                <li><strong>Комментарий:</strong> {comment}</li>
            </ul>
        </div>
    );
}