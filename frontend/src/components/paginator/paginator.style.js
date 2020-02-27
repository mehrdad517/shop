import styled from 'styled-components';

export default styled.div`
  .pagination {
    margin: 50px 0 0 0;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
  .pagination li a {
    margin: 0 2px;
    color: #000;
    padding: 4px 8px;
    font-size: 16px;
    font-weight: bold;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pagination li.active a {
    background-color: var(--Primary_color) !important;
    border-radius: 5px;
    color: #fff !important;
  }
`;
