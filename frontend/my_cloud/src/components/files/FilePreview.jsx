import { Link } from "react-router";

import { fileRoute } from "../../config/routes";

export const FilePreview = ({ id, original_name }) => {
    return (
        // <div className='prevContainer'>
            <div className='titleWrapper'>
                <h3 className='fileTitle'>
                    <Link className='link' to={fileRoute(id)}>{original_name}</Link>
                </h3>
            </div>
        // </div>
    );
};