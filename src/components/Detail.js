import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailIcon from '@mui/icons-material/Mail';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import logo from './icons8-male-user-100.png';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const navigate=useNavigate();

  const { id } = useParams("");
  console.log(id);
  const getdata = async () => {

    const res = await fetch(`https://crudapp-backend-6pgz.onrender.com/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");

    } else {
      setUserdata(data)
      console.log("get data");
    }
  }

  useEffect(()=>{
    getdata();
    // eslint-disable-next-line
  },[]);
   
  const deleteuser=async(id)=>{
    const res2=await fetch(`https://crudapp-backend-6pgz.onrender.com/deleteuser/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    });
    const deletedata=await res2.text();
    console.log(deletedata);
    if(res2.status===422||!deletedata){
        console.log("error");
    }else{
        console.log("user deleted");
        navigate("/");
    }

}

  return (
    <div className='container mt-3'>
      <h1 style={{ fontWeight: 400 }}>Welcome kaustubh upadhyay</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="addbtn">
          <NavLink to={`/edit/${getuserdata._id}`}><button className='btn btn-primary mx-2'><EditIcon /></button></NavLink>
            <button className='btn btn-danger' onClick={()=>deleteuser(getuserdata._id)}><DeleteIcon /></button>
          </div>
          <div className="row">
            <div className="leftview col-lg-6 col-md-6 col-12">
              <img src={logo} style={{ width: 50 }} alt="profile" />
              <h3 className='mt-3'>Name:<span style={{ fontWeight: 400 }}>{getuserdata.name}</span></h3>
              <h3 className='mt-3'>Age:<span style={{ fontWeight: 400 }}>{getuserdata.age}</span></h3>
              <p className='mt-3'><MailIcon />Email:<span>{getuserdata.email}</span></p>
              <p className='mt-3'><WorkIcon />Occupation:<span>{getuserdata.job}</span></p>
            </div>

            <div className="rightview col-lg-6 col-md-6 col-12">
              <p className='mt-5'><PhoneAndroidIcon />Mobile:<span>+91{getuserdata.mobile}</span></p>
              <p className='mt-3'><LocationOnIcon />Location:<span>{getuserdata.address}</span></p>
              <p className='mt-3'>Description:<span>{getuserdata.desc}</span></p>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default Detail
