import styled from 'styled-components';
export const StaffPageWrapper=styled.div`
margin:20px auto;
margin-bottom:100px;
width:90%;

.heading{
    position:relative;
    text-align:center;
    // min-height:30px;
    margin-bottom:20px;
    h2{
        font-size:15px;
    }

}
.icon{
    position:absolute;
    left:0;
    top:50%;
    transform:translateY(-50%);

}

.searchContainer{
    position:relative;
}
.searchIcon{
    position:absolute;
    left:10px;
    top:50%;
    transform:translateY(-50%);
}
`

export const SearchInput=styled.input`
border-radius:20px;
border:none;
display:block;
box-sizing:border-box;
width:100%;
background:#F4F4F4;
padding:5px 10px;
min-height:40px;
padding-left:40px;
font-size:13px;
&:focus{
    outline:none;
}

`
export const AppointmentCardWrapper=styled.div`
position:relative;
margin:20px 0;
box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.2);
border-radius: 11px;
min-height:130px;
display:flex;
flex-direction:column;
box-sizing:border-box;
justify-content:space-between;
padding:20px;
.flx{
    display:flex;
    justify-content:space-between;

}
.flxChild{
    display:flex;
    align-items:center;
    .avatar{
        margin-right:10px;
    }
}
.sideLine{
    background: #8949F1;
border-radius: 0px 2px 2px 0px;
position:absolute;
width:4px;
left:0%;
height:99px;
top:50%;
transform:translateY(-50%);

}
.iconContainer span{
    margin:0px 5px;
}
`