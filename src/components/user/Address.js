import { Component } from 'react';
import axios from "axios";



class Address extends Component {
    state = {
        token: "",
        listProvinsi: [],
        listKabupaten: [],
        listKecamatan: [],
        listKelurahan: [],

        jawaban: {
            provinsi: "",
            kabupaten: "",
            kecamatan: "",
            kelurahan: ""
        }
    }

    getProvinsi = () =>{
        // Get Token
        axios.defaults.withCredentials = true;
        axios.get(`https://x.rajaapi.com/poe`)
        .then(res => {
            this.setState({ token : res.data.token });
            axios.get(`https://x.rajaapi.com/MeP7c5ne${res.data.token}/m/wilayah/provinsi`)
            .then(result => {
                this.setState({ listProvinsi : [...result.data.data]});
            })
            .catch(() => {
                console.log("Provinsi Error");
            })
        })
        .catch(() => {
            console.log("Token Error");
        }); 
    }

    handleProvinsi = e => {
        // Set Kosong Kabupaten, Kecamatan, dan Kelurahan
        this.setState({ listKabupaten : []});
        this.setState({ listKecamatan : []});
        this.setState({ listKelurahan : []});

        // Get Selected Text & Set to Jawaban
        const { jawaban } = this.state;
        const index = e.nativeEvent.target.selectedIndex;
        this.setState({ jawaban : {
            ...jawaban,
            provinsi: e.nativeEvent.target[index].text
        }})

        // Call API
        if(e.target.value != 0){
            axios.get(`https://x.rajaapi.com/MeP7c5ne${this.state.token}/m/wilayah/kabupaten?idpropinsi=${e.target.value}`)
            .then(res => {
                this.setState({ listKabupaten : [...res.data.data]});
            })
            .catch(() => {
                console.log("Kabupaten Error");
            })
        }
    }

    handleKabupaten = e => {
        // Set Kosong Kecamatan, dan Kelurahan
        this.setState({ listKecamatan : []});
        this.setState({ listKelurahan : []});

        // Get Selected Text & Set to Jawaban
        const { jawaban } = this.state;
        const index = e.nativeEvent.target.selectedIndex;
        this.setState({ jawaban : {
            ...jawaban,
            kabupaten: e.nativeEvent.target[index].text
        }})
        
        // Call API
        if(e.target.value != 0){
            axios.get(`https://x.rajaapi.com/MeP7c5ne${this.state.token}/m/wilayah/kecamatan?idkabupaten=${e.target.value}`)
            .then(res => {
                this.setState({ listKecamatan : [...res.data.data]});
            })
            .catch(() => {
                console.log("Kecamatan Error");
            })
        }
    }

    handleKecamatan = e => {
        // Set Kosong Kelurahan
        this.setState({ listKelurahan : []});

        // Get Selected Text & Set to Jawaban
        const { jawaban } = this.state;
        const index = e.nativeEvent.target.selectedIndex;
        this.setState({ jawaban : {
            ...jawaban,
            kecamatan: e.nativeEvent.target[index].text
        }})
        
        // Call API
        if(e.target.value != 0){
            axios.get(`https://x.rajaapi.com/MeP7c5ne${this.state.token}/m/wilayah/kelurahan?idkecamatan=${e.target.value}`)
            .then(res => {
                this.setState({ listKelurahan : [...res.data.data]});
            })
            .catch(() => {
                console.log("Kelurahan Error");
            })
        }
    }

    handleKelurahan = e => {
        // Get Selected Text & Set to Jawaban
        const { jawaban } = this.state;
        const index = e.nativeEvent.target.selectedIndex;
        this.setState({ jawaban : {
            ...jawaban,
            kelurahan: e.nativeEvent.target[index].text
        }});
    }

    componentDidUpdate(prevState){
        if(this.state.jawaban && this.state.jawaban.provinsi && this.state.jawaban.kabupaten && this.state.jawaban.kecamatan && this.state.jawaban.kelurahan){
            console.log("yoooo");
            console.log(this.state.jawaban);
            this.props.getAnswerAlamat(this.state.jawaban);
        }
        
    }

    componentDidMount(){
        // Call API Provinsi
        this.getProvinsi();
    }

    render(){
        const { listProvinsi, listKabupaten, listKecamatan, listKelurahan, jawaban } = this.state;
        return(
            <div className="container">
              {/* {console.log(jawaban)} */}
                <form>
                    <select className="form-select my-3" aria-label="Default select example"  onChange={this.handleProvinsi.bind(this)}>
                        <option value={0} selected>Provinsi</option>
                        {
                            listProvinsi.map(provinsi => {
                                return(
                                    <option value={provinsi.id}>{provinsi.name}</option>
                                )
                            })
                        }
                    </select>
                    <select className="form-select my-3" aria-label="Default select" onChange={this.handleKabupaten.bind(this)}>
                        <option selected>Kabupaten</option>
                        {
                            listKabupaten.map(kabupaten => {
                                return(
                                    <option value={kabupaten.id}>{kabupaten.name}</option>
                                )
                            })
                        }
                    </select>
                    <select className="form-select my-3" aria-label="Default select" onChange={this.handleKecamatan.bind(this)}>
                        <option selected>Kecamatan</option>
                        {
                            listKecamatan.map(kecamatan => {
                                return(
                                    <option value={kecamatan.id}>{kecamatan.name}</option>
                                )
                            })
                        }
                    </select>
                    <select className="form-select my-3" aria-label="Default select" onChange={this.handleKelurahan.bind(this)}>
                        <option selected>Kelurahan</option>
                        {
                            listKelurahan.map(kelurahan => {
                                return(
                                    <option value={kelurahan.id}>{kelurahan.name}</option>
                                )
                            })
                        }
                    </select>
                </form>
            </div>
        )
    }
}
export default Address;