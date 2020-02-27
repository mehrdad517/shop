import styled from 'styled-components';

export default styled.div`
  .Footer {
    background-color: var(--footer);
    margin-top: 40px;
    padding: 20px 0 0 0;
  }

  .FooterBrand {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue',
      Helvetica, Arial, 'Lucida Grande', sans-serif;
  }
  .FooterCenter {
    margin-top: 20px;
  }
  .Footer h4 {
    font-size: 14px;
    color: var(--blue) !important;
  }
  .FooterParagraph {
    text-align: justify;
    font-size: 13px;
    line-height: 30px;
    /*/padding: 25px 0;/*/
    display: flex;
    justify-content: center;
    color: var(--light);
    flex-direction: column;
    align-items: center;
  }
  .FooterParagraph p {
    transition: all 0.3s;
  }
  .FooterParagraph span.loadMore {
    color: #007fff;
    font-weight: bold;
    cursor: pointer;
  }
  .FooterImg ul {
    display: flex;
    justify-content: center;
    padding: 20px 0;
    flex-wrap: wrap;
  }

  .FooterImg li {
    max-width: 75px;
  }

  .FooterImg li img {
    width: 100%;
  }

  .FooterTop {
    width: 100%;
  }

  .FooterCenter {
    border-bottom: 1px solid var(--border);
    padding: 20px 0;
  }

  .FooterCenter a {
    font-size: 13px;
  }

  .FooterCenter h4 {
    font-size: 15px !important;
    color: var(--blue);
  }

  .FooterDown {
    border-top: 1px solid var(--border);
    display: flex;
    padding: 10px 0;
    font-size: 12px;
    justify-content: space-between;
    color: var(--light);
    width: 100%;
  }

  .Guidance {
    display: flex;
    flex-direction: column;
    line-height: 30px;
  }
  .Guidance ul {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
  }
  .Guidance ul li.parent {
    flex-basis: 33.3%;
    margin-bottom: 20px;
  }
  ul.contact li {
    font-size: 13px;
    padding: 5px 0;
  }
  ul.contact li:first-child {
    margin-top: 5px;
  }
  .Guidance ul li.parent span {
    font-size: 14px;
    font-weight: bold;
  }
  .Guidance ul li a.child {
    font-size: 13px;
    font-weight: 400;
  }
  .Guidance ul li a.has-child {
    font-size: 13px;
    font-weight: 600;
  }

  .Guidance ul li ul {
    display: flex;
    flex-direction: column;
    padding-right: 5px;
    font-size: 14px !important;
    font-weight: normal;
  }
  .Guidance ul li ul li:before,
  .contact li:before {
    content: '';
    display: inline-block;
    background: var(--blue);
    border-radius: 50%;
    width: 5px;
    height: 5px;
    margin-left: 8px;
    position: relative;
    top: -1px;
  }

  .Guidance a {
    color: var(--Dark);
  }

  .support ul {
    display: flex;
    flex-direction: column;
    line-height: 30px;
  }

  .support a {
    color: var(--Dark);
  }
  .network {
    margin-bottom: 10px;
  }

  .networkImg {
    display: flex;
    padding: 10px 0px;
    flex-wrap: wrap;
  }
  .networkImg li a img {
    width: 30px;
    height: 30px;
    padding-left: 8px;
    margin-top: 0px;
  }

  .BackUp span {
    line-height: 30px;
    font-size: 12px;
    padding-top: 20px;
  }

  .BackUp h4 {
    padding-bottom: 5px;
  }

  .App {
    padding-top: 15px;
  }

  .App ul {
    display: flex;
    justify-content: right;
    max-width: 100%;
    flex-wrap: wrap;
  }
  .App ul li {
    flex-basis: 50%;
  }
  .App ul li img {
    max-width: calc(100% - 5px);
    margin-left: 5px;
  }
  @media only screen and (max-width: 990px) {
    .networkImg > img {
      margin-left: 30px;
    }
    .networkImg {
      display: flex;
      justify-content: flex-start;
      padding: 20px 0px;
    }
    .FooterImg ul {
      justify-content: center;
    }
    .App ul li img {
      max-width: calc(80% - 5px);
      margin-left: 5px;
    }
  }
  @media only screen and (max-width: 768px) {
    .networkImg > img {
      margin-left: 30px;
    }
    .Guidance ul li.parent {
      margin-bottom: 50px;
      flex-basis: 50%;
    }
  }
`;
