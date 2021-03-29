import React, {useState, useEffect} from "react";
import axios from "axios";

const RenderedAdress = ()=>{
  const [token, setToken] = useState("2k899f14kAOOKEaumTTRrqN71WWdCH8EGrNBU2hSxKZuieaNnF");
  const [provinsi, setProvinsi] = useState([
      {
          "id": 11,
          "name": "ACEH"
      },
      {
          "id": 12,
          "name": "SUMATERA UTARA"
      },
      {
          "id": 13,
          "name": "SUMATERA BARAT"
      },
      {
          "id": 14,
          "name": "RIAU"
      },
      {
          "id": 15,
          "name": "JAMBI"
      },
      {
          "id": 16,
          "name": "SUMATERA SELATAN"
      },
      {
          "id": 17,
          "name": "BENGKULU"
      },
      {
          "id": 18,
          "name": "LAMPUNG"
      },
      {
          "id": 19,
          "name": "KEPULAUAN BANGKA BELITUNG"
      },
      {
          "id": 21,
          "name": "KEPULAUAN RIAU"
      },
      {
          "id": 31,
          "name": "DKI JAKARTA"
      },
      {
          "id": 32,
          "name": "JAWA BARAT"
      },
      {
          "id": 33,
          "name": "JAWA TENGAH"
      },
      {
          "id": 34,
          "name": "DI YOGYAKARTA"
      },
      {
          "id": 35,
          "name": "JAWA TIMUR"
      },
      {
          "id": 36,
          "name": "BANTEN"
      },
      {
          "id": 51,
          "name": "BALI"
      },
      {
          "id": 52,
          "name": "NUSA TENGGARA BARAT"
      },
      {
          "id": 53,
          "name": "NUSA TENGGARA TIMUR"
      },
      {
          "id": 61,
          "name": "KALIMANTAN BARAT"
      },
      {
          "id": 62,
          "name": "KALIMANTAN TENGAH"
      },
      {
          "id": 63,
          "name": "KALIMANTAN SELATAN"
      },
      {
          "id": 64,
          "name": "KALIMANTAN TIMUR"
      },
      {
          "id": 65,
          "name": "KALIMANTAN UTARA"
      },
      {
          "id": 71,
          "name": "SULAWESI UTARA"
      },
      {
          "id": 72,
          "name": "SULAWESI TENGAH"
      },
      {
          "id": 73,
          "name": "SULAWESI SELATAN"
      },
      {
          "id": 74,
          "name": "SULAWESI TENGGARA"
      },
      {
          "id": 75,
          "name": "GORONTALO"
      },
      {
          "id": 76,
          "name": "SULAWESI BARAT"
      },
      {
          "id": 81,
          "name": "MALUKU"
      },
      {
          "id": 82,
          "name": "MALUKU UTARA"
      },
      {
          "id": 91,
          "name": "PAPUA BARAT"
      },
      {
          "id": 94,
          "name": "PAPUA"
      }
    ]);
  const [kabupaten, setKabupaten] = useState([
    {
        "id": 9401,
        "name": "KABUPATEN MERAUKE"
    },
    {
        "id": 9402,
        "name": "KABUPATEN JAYAWIJAYA"
    },
    {
        "id": 9403,
        "name": "KABUPATEN JAYAPURA"
    },
    {
        "id": 9404,
        "name": "KABUPATEN NABIRE"
    },
    {
        "id": 9408,
        "name": "KABUPATEN KEPULAUAN YAPEN"
    },
    {
        "id": 9409,
        "name": "KABUPATEN BIAK NUMFOR"
    },
    {
        "id": 9410,
        "name": "KABUPATEN PANIAI"
    },
    {
        "id": 9411,
        "name": "KABUPATEN PUNCAK JAYA"
    },
    {
        "id": 9412,
        "name": "KABUPATEN MIMIKA"
    },
    {
        "id": 9413,
        "name": "KABUPATEN BOVEN DIGOEL"
    },
    {
        "id": 9414,
        "name": "KABUPATEN MAPPI"
    },
    {
        "id": 9415,
        "name": "KABUPATEN ASMAT"
    },
    {
        "id": 9416,
        "name": "KABUPATEN YAHUKIMO"
    },
    {
        "id": 9417,
        "name": "KABUPATEN PEGUNUNGAN BINTANG"
    },
    {
        "id": 9418,
        "name": "KABUPATEN TOLIKARA"
    },
    {
        "id": 9419,
        "name": "KABUPATEN SARMI"
    },
    {
        "id": 9420,
        "name": "KABUPATEN KEEROM"
    },
    {
        "id": 9426,
        "name": "KABUPATEN WAROPEN"
    },
    {
        "id": 9427,
        "name": "KABUPATEN SUPIORI"
    },
    {
        "id": 9428,
        "name": "KABUPATEN MAMBERAMO RAYA"
    },
    {
        "id": 9429,
        "name": "KABUPATEN NDUGA"
    },
    {
        "id": 9430,
        "name": "KABUPATEN LANNY JAYA"
    },
    {
        "id": 9431,
        "name": "KABUPATEN MAMBERAMO TENGAH"
    },
    {
        "id": 9432,
        "name": "KABUPATEN YALIMO"
    },
    {
        "id": 9433,
        "name": "KABUPATEN PUNCAK"
    },
    {
        "id": 9434,
        "name": "KABUPATEN DOGIYAI"
    },
    {
        "id": 9435,
        "name": "KABUPATEN INTAN JAYA"
    },
    {
        "id": 9436,
        "name": "KABUPATEN DEIYAI"
    },
    {
        "id": 9471,
        "name": "KOTA JAYAPURA"
    }
]);

  const getToken = () => {
    axios.get("https://x.rajaapi.com/poe").
    then(res => {
      console.log(res.data);
      console.log(res.data.token);
      setToken(res.data.token);
    }).catch(() => {
      console.log('ha')
    });
  }

  const getProvinsi = () =>{
    axios.get("https://x.rajaapi.com/MeP7c5ne"+token+"/m/wilayah/provinsi").
    then(res => {
      console.log(res.data);
      console.log(res.data.data.length)
      setProvinsi(res.data.data);
      console.log("prov")
      console.log(provinsi);
      console.log(provinsi.length)
    }).catch(() => {
      console.log("hi")
    })
  }

  const getKabupaten = (idProvinsi = 94) =>{
    axios.get("https://x.rajaapi.com/MeP7c5ne"+token+"/m/wilayah/kabupaten?idpropinsi="+idProvinsi).
    then(res => {
      console.log(res.data);
      console.log(res.data.data)
      console.log(res.data.data.length)
      setKabupaten(res.data.data);
      console.log("kabs");
      console.log(kabupaten[4]);
    }).catch(() => {
      console.log("hi")
    })
  }

  const getProvinsiId = () =>{
    var id = 0;
    const value = document.getElementById("Provinsi").value;
    console.log(value)
    for (var i = 0; i<provinsi.length; i++){
      if (provinsi[i].name == value){
        id = provinsi[i].id;
      }
      // console.log(provinsi[i].name);
      // console.log(typeof provinsi[i].name)
    }
    console.log(id)
    // return(
    //   <div>
    //     {/* {id} */}
    //     {value}
    //     {/* {value.value} */}
    //   </div>
    // )
  }

  const getKabupatenId = () =>{
    var id = 0;
    const value = document.getElementById("Kabupaten").value;
    console.log(value)
    for (var i = 0; i<kabupaten.length; i++){
      if (kabupaten[i].name == value){
        id = kabupaten[i].id;
      }
      // console.log(provinsi[i].name);
      // console.log(typeof provinsi[i].name)
    }
    console.log(id)
    // return(
    //   <div>
    //     {/* {id} */}
    //     {value}
    //     {/* {value.value} */}
    //   </div>
    // )
    return(id);
  }
  // useEffect(() => getQuestionAPI(id), []);
  

  const createSelectProvinsi = () => {
    return(
      <select id="Provinsi" name="Provinsi" 
        onChange={createSelectKabupaten}
        // onLoad={getProvinsiId}
        >
          {provinsi.map(({id, name}, i) =>{
            return(
              <>
                <option value={name}>{name}</option>
              </>
            );
          })}
      </select>
    )
  }
  const createSelectKabupaten = () => {
    console.log("buat kabupaten gan")
    // const value= event.target.value;
    // var id = 0;
    // for (var i = 0; i<provinsi.length; i++){
    //   if (provinsi[i].name == value){
    //     id = provinsi[i].id;
    //   }
    //   // console.log(provinsi[i].name);
    //   // console.log(typeof provinsi[i].name)
    // }
    return (
      <select id="Kabupaten" name="Kabupaten" >
          {kabupaten.map(({id, name}, i) =>{
            return(
              <>
                <option value={name}>{name}</option>
              </>
            );
          })}
      </select>
    );
  }

  useEffect(() => {
    // getToken();
    // getProvinsi();
    // getKabupaten();
    // createSelectKabupaten();
    // createSelectProvinsi();
  },[]);
  return(
    <div>
      {/* {getProvinsi()} */}
      <div>
        {createSelectProvinsi()}
        {createSelectKabupaten()}
        {/* {isProvinsiChange ?} */}
        
      </div>
    </div>
  );
}

export default RenderedAdress;

{/* <select id="Provinsi" name="Provinsi">
      <option value="Provinsi1">Provinsi1</option>
      <option value="Provinsi2">Provinsi2</option>
    </select>
    <select id="Kabupaten" name="Kabupaten">
      <option value="Kabupaten1">Kabupaten1</option>
      <option value="Kabupaten2">Kabupaten2</option>
    </select>
    <select id="Kecamatan" name="Kecamatan">
      <option value="Kecamatan1">Kecamatan1</option>
      <option value="Kecamatan2">Kecamatan2</option>
    </select>
    <select id="Kelurahan" name="Kelurahan">
      <option value="Kelurahan1">Kelurahan1</option>
      <option value="Kelurahan2">Kelurahan2</option>
    </select> */}