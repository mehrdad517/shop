import styled from "styled-components";

export default styled.div`
.badge{
    position: absolute;
    width: 115px;
    background-color: #fb3449;
    top: 12px;
    right: -40px;
    z-index: 1000000;
    transform: rotate(45deg);
    display: flex;
    justify-content: center;
    color: white;
    font-weight: bold;
    flex-direction: column;
    align-items: center;
    line-height: 15px;
    padding: 3px 10px;
}
.badge-off{
    font-size: 20px;
}

.badge-off-title{
    font-size: 9px;
}
`;
