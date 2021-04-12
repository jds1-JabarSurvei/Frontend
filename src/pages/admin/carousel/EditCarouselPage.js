import { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from "@material-ui/core/styles";
import EditCarouselTab from './EditCarouselTab';
import PreviewCarouselTab from './PreviewCarouselTab';
import APICall from '../../../utils/axios';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { toast } from 'react-toastify';
import './style.css';

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


class EditCarouselPage extends Component {
    state = {
        value: 0,
        loading: false,
        listSurvey: [],
        listCarousel: [],
        listSelected: []
    }

    callListSurvey() {
        this.setState({ loading: true });
        APICall.get(`listOfForms`)
            .then(res => {
                /* If successful */
                this.setState({ listSurvey: [...res.data] });
                
                const { listSurvey } = this.state;
                listSurvey.forEach(survey => {
                    survey.isActive = false;
                    survey.selectedIndex = 0;
                });

                this.callListCarousel();
            }).catch(() => {
                /* If error */
                this.setState({ listSurvey: [] });
            })
    }

    callListCarousel() {
        APICall.get(`configuration`)
            .then(res => {
                /* If successful */
                let list = res.data.carousel.split(',');
                list = list.map( element => {return parseInt(element)});
                this.setState({ listSelected: list });
                
                const { listSurvey, listSelected, listCarousel } = this.state;
                let selectedIndex = 1;
                for(let i = 0; i < listSelected.length; i++){
                    let checkIndex = listSurvey.map( survey => { return survey.id }).indexOf(listSelected[i]);
                    if(checkIndex >= 0){
                        listSurvey[checkIndex].isActive = true;
                        listSurvey[checkIndex].selectedIndex = selectedIndex;
                        listCarousel.push(listSurvey[checkIndex]);
                        selectedIndex += 1;
                    }
                }

                this.setState({ listCarousel });
                this.setState({ listSurvey });
                this.setState({ loading: false });
            }).catch(() => {
                /* If error */
                this.setState({ listCarousel: [] });
            })
    }
    
    handleChange = (event, newValue) => {
        this.setState({ value : newValue });
    }

    handleChoose = id => {
        const {listSurvey, listSelected, listCarousel } = this.state;

        let isFound = false;
        let index = -1;
        for(let i = 0; i < listSelected.length; i++){
            if( id == listSelected[i]){
                isFound = true;
                index = i;
            }
        }

        let check = listSurvey.map( survey => { return survey.id }).indexOf(id);
        if(!isFound){
            // Jika belum dicentang
            listSelected.push(id);
            listSurvey[check].isActive = true;
            listSurvey[check].selectedIndex = listSelected.length;
            listCarousel.push(listSurvey[check]);

        } else {
            // Jika sudah dicentang
            listSelected.splice(index, 1);
            listSurvey[check].isActive = false;
            listSurvey[check].selectedIndex = 0;
            let selectedIndex = 1;
            for( let i = 0; i < listSelected.length; i++){
                let idx = listSurvey.map( survey => { return survey.id }).indexOf(listSelected[i]);
                if( idx >= 0){
                    listSurvey[idx].selectedIndex = selectedIndex;
                    selectedIndex += 1;
                }
            }

            let idxToDelete = listCarousel.map( survey => { return survey.id }).indexOf(id);
            listCarousel.splice(idxToDelete, 1);
        }

        this.setState({ listCarousel });
        this.setState({ listSelected });
        this.setState({ listSurvey });
    }

    handleSubmit = () => {
        // console.log("submit");
        const { listSelected } = this.state;

        if(listSelected.length > 0){
            let data = {
                carousel : listSelected.toString()
            };
    
            APICall.post('inputcarousel', data)
                .then(() => {
                    toast.success('Perubahan berhasil disimpan!');
                })
                .catch(() => {
                    toast.error('Terdapat beberapa kesalahan. Silakan coba lagi nanti');
                })
        } else {
            toast.error('Harus ada minimal 1 survei pada carousel.');
        }
    }

    componentDidMount() {
        this.callListSurvey();
    }

    render(){
        const { value, listSurvey, listCarousel, loading } = this.state;
        const { handleChange, handleChoose, handleSubmit } = this;
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
                        <AntTab label="Pratinjau" />
                    </AntTabs>
                </div>
        
                <div className={ value == 0 ? "tab-panel" : "hide"}>
                    <EditCarouselTab loading={loading} listSurvey={listSurvey} handleChoose={handleChoose} />
                </div>
                <div className={ value == 1 ? "tab-panel" : "hide"}>
                    <PreviewCarouselTab loading={loading} listCarousel={listCarousel} />
                </div>

                <div className="save-carousel" style={{position:"fixed", bottom:"30px", right:"30px", zIndex:"2"}}>
                    <Button style={{ backgroundColor:"#399F4F"}} variant="contained" color="secondary" startIcon={<SaveIcon />} onClick={handleSubmit}>
                        Simpan Perubahan
                    </Button>
                </div >
            </>
        )
    }
}

export default EditCarouselPage;