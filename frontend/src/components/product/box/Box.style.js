import styled from "styled-components";

export default styled.div`
.Box{
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: white;
    // border: 1px solid var(--border_color);
    height: 400px;
    overflow: hidden;
    align-items: center;
    // margin: 5px;
}
.Box .MuiButton-label {
   // font-family: iranyekan-light !important;
   font-size: 13px
}
.BoxImg img{
    // width: 100%;
}
.BoxImg a{
    margin: 0!important;
    padding: 0!important;
}

.Box .BoxImg{
    min-height: 200px;
    width: calc(100% - 40px);
    position: relative;
    padding: 15px 20px 12.5px 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
}
.Box .BoxImg img{
    max-width: 100%;
    max-height: 100%;

}

.Box a{
    align-self: flex-end;
    // padding: 6px;
}
.title{
    font-size: 13px;
    font-weight: bold;
    padding: 5px 10px;
    // text-align: justify;
    height: 45px;
}
.title a {
  color: #000;
}
.price{
    height:50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
.boxOff {
    align-self: center;
    font-size: 14px;
    font-weight: bold;
    color: var(--SeeMore);
    text-decoration: line-through;
}
.boxPrice {
    align-self: center;
    font-size: 14px;
    font-weight: bold;
    color: var(--Primary_color);
}

.boxPrice-title {
     color: black;
     font-size: 11px;
}
.box-button{
   margin-top: 10px
}

@media all and (max-width: 767px) {
    .title {
        height: 50px;
        font-size: 12px;
    }
    .Box .BoxImg {
    width: calc(100% - 20px);
    padding: 15px 10px 12.5px 10px;
}
}


@media all and (max-width: 500px) {
    .Box {
        display: flex;
        flex-direction: column;
        position: relative;
        background-color: white;
    }
    .title {
        height: 44px;
    }
}

`;
