import styled from "styled-components";

export const PreviousAppointmentWrapper=styled.div`

width:90%;
margin:50px auto;
margin-bottom:100px;
.heading{
    position:relative;
    text-align:center;

}
.icon{
    position:absolute;
    left:0;
    top:50%;
    transform:translateY(-50%);

}

`
export const AppointmentCardWrapper=styled.div`
cursor:pointer;
box-sizing:border-box;

min-height:100px;
padding:13px 0px;
padding-right:10px;
display:flex;
align-items: stretch;
background: #FFFFFF;
box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.2);
border-radius: 11px;
.timeDetails{
    
    display:flex;
    flex-direction:column;
    justify-content:center;
    background-color:#8949F1;
    padding:0px 15px;
    
    border-top-right-radius:10px;
    border-bottom-right-radius:10px;
    
    color:#fff;
    margin-right:10px;
}
.patientDetails{
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    .fDiv div{
        display:flex;
        justify-content:space-between;
    }
    .sDiv h1{
        font-size:15px;

    }

}
`

export const Line=styled.div`
border-top:1px solid #fff;
`