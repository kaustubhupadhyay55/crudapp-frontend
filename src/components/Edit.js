import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
const Edit = () => {
  const navigate=useNavigate("");

  const [curr, set] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    desc: ""
  })
  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    set((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
  }

  const { id } = useParams("");
  console.log(id);
  const getdata = async () => {

    const res = await fetch(`/getuser/${id}`, {
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
      set(data)
      console.log("get data");
    }
  }
  useEffect(() => {
    getdata();
    // eslint-disable-next-line
  }, []);

  const updateuser=async(e)=>{
    e.preventDefault();
    const{name,email,age,mobile,work,address,desc}=curr;

    const res2=await fetch(`/updateuser/${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,age,mobile,work,address,desc
      })
    });
    const data2=await res2.text();
    console.log(data2);
    if(res2.status===422||!data2){
      alert("fill the data")
    }else{
      alert("data added")
      navigate("/");
    }
  }

  return (
    <div className='container'>
      <NavLink to="/">Edit</NavLink>
      <form className='mt-4'>
        <div className="row">
          <div class="form-group mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1">Name</label>
            <input type="text" value={curr.name} onChange={setdata} name='name' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />

          </div>
          <div class="form-group mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1">Email</label>
            <input type="text" value={curr.email} onChange={setdata} name='email' class="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div class="form-group mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1">Age</label>
            <input type="number" value={curr.age} onChange={setdata} name='age' class="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div class="form-group mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1">Mobile</label>
            <input type="number" value={curr.mobile} onChange={setdata} name='mobile' class="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div class="form-group mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1">Work</label>
            <input type="text" value={curr.work} onChange={setdata} name='work' class="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div class="form-group mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1">Address</label>
            <input type="text" value={curr.address} onChange={setdata} name='address' class="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div class="form-group mb-3 col-lg-12 col-md-12 col-12">
            <label for="exampleInputPassword1">Description</label>
            <textarea name="desc" value={curr.desc} onChange={setdata} className='form-control' id="" cols="30" rows="10"></textarea>
          </div>
          <button type="submit" onClick={updateuser} class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Edit
