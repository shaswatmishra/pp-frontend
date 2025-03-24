import styled from 'styled-components';

export const SettingWrapper=styled.div`
// width:90%;

margin:20px auto;
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
.info{
    display:flex;
    min-height:80px;
    align-items:center;
    background:#F5EDFF;
    margin-top:20px;


}
.avatar{
    margin:0px 10px;

}
.menu{
    width:90%;
    margin: 20px auto;
}
.menu-item{
    display:flex;
    align-item:center;
    
    position:relative;
    margin:35px 0px;
    p{
        margin-left:35px;
    }
}
.icons{
    position:absolute;
    top:50%;
    
    transform:translateY(-50%);

}
`