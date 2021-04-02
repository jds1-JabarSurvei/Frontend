import { Component } from 'react';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

class ImageUploader extends Component {
    render(){
        const { fileImage, updateFileImage, deleteFileImage } = this.props;

        return(
            <div className="question-container-new">
                <input style={{display:"none"}} className="input-image-survey" type="file" id="survey-image" name="image" accept="image/*" onChange={updateFileImage}/>
                
                <div className="image-survey-container" style={fileImage ? {border:"none"} : {}}>
                    {
                        fileImage ?
                        <>
                        <label htmlFor="survey-image" className="align-self-center shadow-lg ubah-foto">
                            <Button variant="contained" className=" " startIcon={<EditIcon />} style={{backgroundColor:"var(--green)", color:"white", zIndex:"2"}} component="span" disableElevation >
                                Ubah Foto
                            </Button>
                        </label>
                        <Tooltip className="tooltip-hapus" style={{margin:"20px", color:"white", backgroundColor:"#dc3545"}} title="Hapus Foto" aria-label="delete" placement="right" size="small" arrow onClick={deleteFileImage}>
                            <Fab>
                                <DeleteIcon size="small" />
                            </Fab>
                        </Tooltip>
                        </>
                        :
                        <label htmlFor="survey-image" className="align-self-center ubah-foto">
                            <Button variant="contained" startIcon={<PhotoCamera />} style={{backgroundColor:"var(--green)", color:"white"}} component="span" disableElevation >
                                Unggah Foto
                            </Button>
                        </label>
                    }
                    <img className="image-survey" src={fileImage}/>
                </div>
            </div>
        )
    }
}

export default ImageUploader;