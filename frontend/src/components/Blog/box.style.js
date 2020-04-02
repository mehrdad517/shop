import styled from 'styled-components';

export default styled.div`
  .NewsItems {
    position: relative;
    background-color: white;
    margin: 50px 0px 0 40px;
    box-shadow: var(--box-shadow);
    height: 220px;
  }

  .NewsItems > img {
    position: absolute;
    top: -35px;
    left: -30px;
    height: 100px;
    box-shadow: var(--box-shadow);
    width: 120px;
    border: 1px solid #cccccc;
    padding: 2px;
  }

  .NewsItem {
    margin: 0 10px;
    padding: 5px 10px;
  }
  .NewsItem ul {
    display: flex;
    padding: 5px 0 13px 0px;
  }

  .NewsItem ul li {
    display: flex;
    justify-content: center;
    padding: 0 13px;
    font-size: 12px;
    align-items: center;
  }
  .NewsItem ul li span {
    margin-right: 5px;
  }
  .NewsItem h4 {
    font-size: 12px;
    padding: 10px 0 25px 0;
  }

  .NewsItem p {
    font-size: 12px;
    margin-top: 5px;
    padding-top: 10px;
    padding-bottom: 50px;
    text-align: justify;
    border-top: 1px solid var(--border);
    line-height: 2;
    max-height: 20px;
    overflow: hidden;
  }

  .Continues {
    position: absolute;
    bottom: 15px;
    left: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .Continues a {
    font-size: 12px;
    color: var(--blue);
    padding-left: 5px;
  }
  .Continues img {
    width: 10px;
    height: 10px;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .item span {
    font-size: 9px;
  }

  .item time {
    font-size: 9px;
  }

  .item img {
    padding-left: 5px;
  }
  @media all and (max-width: 990px) {
    .NewsItems {
      margin-right: 42px;
      margin-left: 42px;
    }
  }

  @media all and (max-width: 500px) {
    .line {
      margin-bottom: 0;
    }
    .NewsItems {
      margin: 50px 0 0 0;
      padding-left: 7px;
    }

    .NewsItems > img {
      top: -50px;
      left: -15px;
    }
    .NewsItem ul li {
      padding: 0 6px;
    }
  }
`;
