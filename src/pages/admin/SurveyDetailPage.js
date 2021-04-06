import React, { useState, useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { withStyles } from "@material-ui/core/styles";
import SurveyResponse from './SurveyResponse';

const AntTabs = withStyles({
    indicator: {
        backgroundColor: "#399F4F"
    }
})(Tabs);

const AntTab = withStyles({
    root: {
        textTransform: "uppercase",
        "&$selected": {
            color: "#399F4F",
            fontWeight: "bold"
        }
    },
    selected: {}
})((props) => <Tab {...props} />);

const SurveyDetailPage = (props) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    return(
        <>
        <div className="tab-menu">
            <AntTabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="var(--green)"
                centered
                style={{ color:"grey"}}
            >
                <AntTab label="Ubah" />
                <AntTab label="Tanggapan" />
            </AntTabs>
        </div>

        <div className="tab-container">
            <div className={ value == 0 ? "tab-panel" : "hide"}>
                <p>HALAMAN EDIT</p>
            </div>
            <div className={ value == 1 ? "tab-panel" : "hide"}>
                <SurveyResponse/>
            </div>
        </div>
    </>
    )
}

export default SurveyDetailPage;