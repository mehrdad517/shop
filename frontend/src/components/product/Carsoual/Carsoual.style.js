import styled from 'styled-components';

export default styled.div`
.carsoual{
    position: relative;
    overflow-x: scroll;

}
.carsoual-main{
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
}
.carsoual-box{
    width: 250px;
    height: 414px;
    margin: 0 7.5px;
}

.carsoual-body{
    height: 414px;
    display: flex;
    transition: all .5s ease;

}
.prev-btn{
    // z-index: 500000;
    // width: 50px;
    // height: 50px;
    // background-color: #11ff9a;
    position: absolute;
    left: 5px;
    top: calc(50% - 25px);
    // border-radius: 50%;
}

.next-btn{
    // z-index: 500000;
    // width: 50px;
    // height: 50px;
    // background-color: #ff3d89;
    position: absolute;
    right: 5px;
    top: calc(50% - 25px);
    // border-radius: 50%;
}
.main-carsoual {
    transition: .4s;
    display: flex;
    align-items: stretch;
}

.scrolling {
    width: 100%;
}


.scroll-carsoual {
    direction: rtl;
    position: relative;
    width: 100%;
    overflow: hidden;
    margin: 50px 0;
}


@media only screen and (max-width: 768px) {
    .scrolling {
        overflow:hidden;
        overflow-x: scroll;
        direction: rtl;
        -webkit-overflow-scrolling: touch;
        margin: 0 5px;
    }

    .MainTabBar {
        margin: 10px 0 10px 0;
        background-color: transparent;
    }

}
`;
