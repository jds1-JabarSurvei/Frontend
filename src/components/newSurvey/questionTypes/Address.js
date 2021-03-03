import React, { useRef } from 'react';
import { useNewSurvey } from 'contexts/NewSurveyContext';

const LinearScale = ({ question, sectionIdx, questionIdx }) => {
    return (
        <div className="address-question">
            <div className="dropdowns">
                <select name="provinsi" disabled defaultValue="Provinsi">
                    <option value="Provinsi">Provinsi</option>
                </select>
                <select name="kota" disabled defaultValue="Kota">
                    <option value="Kota">Kota</option>
                </select>
                <select name="kecamatan" disabled defaultValue="Kecamatan">
                    <option value="Kecamatan">Kecamatan</option>
                </select>
            </div>
            <input placeholder="Alamat Lengkap" disabled className="new-question short" />
        </div>
    );
}

export default LinearScale;