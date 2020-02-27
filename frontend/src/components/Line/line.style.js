import styled from 'styled-components';

export default styled.div`
  .line {
    width: 100%;
    border-bottom: 1px solid var(--border);
    justify-content: space-between;
    align-items: center;
    display: flex;
    margin: 20px 0 20px 0;
  }

  .line h3 {
    font-size: 18px;
    color: var(--Dark);
    padding: 10px 0px;
    font-weight: bold;
  }

  .line a {
    font-size: 12px;
    color: var(--blue);
  }
`;
