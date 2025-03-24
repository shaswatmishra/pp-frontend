import {useState,useEffect} from 'react';
import { PreviousAppointmentWrapper,AppointmentCardWrapper,Line } from './PreviousAppointment.style';
import BackIconSvg from '../../Svg/BackIcon.svg';
// import MyClinincSvg from '../../Svg/MyClininc.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Appointments } from '../../Api/Api';
import { useAuth } from '../../contexts/AuthContext';
import Loader from '../../Components/Loading/ExportLoader';
function PreviousAppointment() {
    const navigate=useNavigate();
    const {idToken}=useAuth();
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        console.log("Rhaukl");
        const getData=async()=>{
            setLoading(true);
            try{
                const dt=await axios.get(Appointments.previousAppointments,{
                    headers:{
                        firebasetoken:idToken
                    }
                })
                setData(dt?.data?.data?.appointments);

            }
            catch(err)
            {
                console.log(err);
            }
            setLoading(false);

        }
        getData();
    },[])
  return (
    <PreviousAppointmentWrapper>
        <div onClick={()=>navigate(-1)} className='heading'>
            <div className='icon'>
                <BackIconSvg/>
            </div>
            <h1>
                Previous Appointment
            </h1>

        </div>
        <div className='patient-data'>
            {
                data?.map((item)=>{
                    return<div style={{margin:"25px 0px"}}>
                    <AppointmentCard data={item} />
                    </div>
                })
            }
            
            
           
           

        </div>
            {loading&&<Loader/>}
    </PreviousAppointmentWrapper>
  )
}

const month=[
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]


export const AppointmentCard=({data})=>{
    const navigate=useNavigate();
    return(
        <AppointmentCardWrapper onClick={()=>{navigate(`/appointmentdetails?id=${data?._id}`)}}>
            <div className='timeDetails'>
                <p>{new Date(data?.scheduledAt?.from).getDate()}</p>
                <p>{month[new Date(data?.scheduledAt?.from).getMonth()]}</p>
                <Line/>
                <p>{new Date(data?.scheduledAt?.from).toLocaleTimeString()}</p>

            </div>
            <div className='patientDetails'>
                <div className='fDiv'>
                <div>
                    <p>Payment Status</p>
                    <p>{data?.clinicId?.clinicType}</p>
                </div>
                <p style={{color:`${data?.paymentStatus==="paid"?"lightgreen":"red"}`,fontWeight:"bolder"}}>{data?.paymentStatus==="paid"?"Paid":"Pending"}</p>
                </div>
                <div className='sDiv'>
                <h1>{data?.patientId?.name||"Testing Name"}</h1>
                <p style={{color:"GrayText"}}>{data?.patientId?.age} || {data?.patientId?.gender}</p>
                </div>

            </div>
        </AppointmentCardWrapper>
    )
}

export default PreviousAppointment