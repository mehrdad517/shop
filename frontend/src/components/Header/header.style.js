import styled from 'styled-components';

export default styled.div`

.Menubtn {
    background-color: var(--Primary_color) !important;
    border-radius: 5px;
    height: 30px !important;
    margin-left: 17px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding: 0 10px;
}
.Menubtn a {
    color: white !important;
    font-size: 10px;
}

.Menubtn img {
    width: 20px;
    height: auto;
}
.Login {
    width: 100%;
    height: 100%;
    background-color: var(--OpenMenu);
    position: fixed;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.LoginOrsingup{
    width: 100%;
    display: flex;
    background-color: white;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}
.LoginModal {
    background-color: white;
    z-index: 1000;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px;
    min-width: 300px;
}


.LoginModal h4 {
    font-weight: bold;
    font-size: 13px;
    margin: 0px 0 25px 0;
    cursor: pointer;
    color: var(--light);
}
.enterphone{
    color: red;
    font-size: 10px;
}
.password {
    background-color: white;
    z-index: 1000;
    border-radius: 5px;
    flex-direction: column;
    align-items: center;
    padding: 25px;
    min-width: 300px;
}
.inpupassword{
    width: 35px!important;
    padding: 0 10px!important;
    margin: 10px 5px !important;

}
.inpupassword input{
    font-size: 30px!important;
    font-weight: bold!important;
    padding: 0 0px!important;
    display: flex;
    text-align: center;
}
.inpupassword input {
    border-right: none!important;
}
.replay{
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px 0 0px 0;
}
.LoginBtn{
    width: 100%;
    margin: 35px 0 10px 0 !important;
    padding: 0!important;
}
.LoginBtn{
    width: 100%;
    margin-top: 20px;
}
.LoginBtn >a{
    width: 100%;
    text-align: center;
    height: 100%;
    margin-right: 0;
    padding: 10px 0;
    color: white !important;
}
.GoToSigup span:first-child{
    font-size: 11px;
}
.GoToSigup span:last-child{
    font-size: 12px;
    font-weight: bold;
    text-decoration: underline;
    color: var(--blueLight);
}



.HeaderTop {
    padding: 10px 0;
    background-color: white;
    box-shadow: var(--box-shadow);
    width: 100%;
    border-bottom: 1px solid var(--border);
    position: fixed;
    z-index: 900;
    top: 0;
    transition: top .2s;
}

.HeadLogo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.HeadMenu{
    display: flex;
    align-items: center;
    height: 100%;
}
.HeadLogo a{
    display: flex;
    align-items: center;
}

.HeadLogo img {
    width: auto;
    height: 28px;
}

.HeadProfile {
    display: flex;
    justify-content: flex-end;
}

.Profile {
    display: flex;
    align-items: center;
    margin: 0px 0px 0px 10px;
    cursor: pointer;
    border-radius: 5px;
}

.Profile:hover {
    background-color: var(--saerch);
}

.Profile span {
    width: 20px;
    height: 20px;
    font-weight: bold;
}

.Profile a {
    font-size: 11px;
    margin-right: 5px;
    cursor: pointer;
}

.cart {
    display: flex;
    align-items: center;
    padding: 7px 7px 7px 0;
    cursor: pointer;
    border-radius: 5px;
    position: relative;

}

.cart:hover {
    background-color: var(--saerch);
}

.cart p {
    width: 20px;
    height: 20px;
}

.cart a > span,a {
    font-size: 11px;
    margin-right: 5px;
    cursor: pointer;
    color: var(--light);
}
.cart a {
    display: flex;
}

.Badge {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--SeeMore);
    width: 15px;
    height: 15px;
    color: white;
    right: 3px;
    top: 3px;
}

.MenuModal {
    height: 100%;
    width: 100%;
    position: fixed;
    background-color: var(--OpenMenu);
    z-index: 1000;
    justify-content: center;
    overflow: scroll;
    align-items: flex-start;
}

.MenuModalOpen {
    margin: 50px 0;
    width: 85%;
    height: auto;
    background-color: var(--Dark);
}

.MenuIsOpen {
    display: flex;
}


.Category {
    display: flex;
    padding:  15px;

}

.CategoryHead {
    display: flex;
    flex-direction: column;

}

.CategoryHead span {
    color: white;
    font-size: 12px;
    padding: 15px 15px;

}

.CategoryItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: auto;
}

.CategoryItem img {
    width: 100%;
    border-radius: 5px;
    margin: 20px 0 10px 0;
    cursor: pointer;
}

.CategoryItem span {
    font-size: 14px;
    font-weight: bold;
    color: white;
}

.Fast {
    padding: 15px 15px 15px 0;
    border-right: 1px solid black;
}

.Fast span {
    font-size: 12px;
    margin-right: 23px;
    color: white;
}

.Fast > span {
    padding: 15px 0;
}


.nav ul {
    margin-right: 20px !important;
}

.nav ul li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 20px 0;
    padding: 10px 5px;
    cursor: pointer;
    position: relative;
}

.nav ul li :after {
    content: '';
    background-color: var(--hover);
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 0px;
    transition: all .3s ease;
    z-index: -1;
}

.nav ul li:hover :after {
    width: 100%;
}

.nav ul li span {
    font-size: 11px;
    font-weight: bold;

}

.nav ul li img {
    padding-left: 10px;
    width: 25px;
    height: 25px;

}



@media all and (min-width: 768px){
    .sm{
        display:none!important;
    }
}
@media all and (max-width: 767px){
    .HeadProfile{
        margin-top: 10px;
    }
    .HeadLogo {
        justify-content: flex-end;
    }
    .sm{
        max-width: 50%;
        margin-top: 10px;
    }
}
@media all and (max-width: 600px){
    .HeadProfile {
        justify-content: space-between;
    }
    .sm{
        display: flex!important; ;
        max-width: 100% !important;
        margin-top: 10px;
    }
    .Fast span {
        margin-right: 0px;
    }
    .CategoryItem img {
        width: calc(100% - 10px);
        margin: 20px 5px 10px 5px;
    }

    .MenuModal {
        overflow: scroll;
        align-items: baseline;
    }
    .MenuModalOpen {
        margin: 50px 0;
    }

}

@media all and (max-width: 500px) {
    .LoginModal {
        padding: 15px 10px !important;
        width: 91% !important;
    }
    .inpupassword{
        width: 20px!important;
        padding: 0 10px!important;
        margin: 10px 5px !important;

    }

}
`;
