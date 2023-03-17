import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  
  /* height: 100vh; */
  background-color: var(--brand-color-secondary-light);
  /* background-color: blueviolet; */
 
`;
export const DashboardContainer = styled.main`
  width: 100%;
  max-width: 68rem;
  /* height: 100px; */
  margin-right: auto;
  margin-left: auto;
  padding-top: 68px;
  /* padding-left: 60px; */

  @media all and (max-width: 1100px) {
    padding-left: 0;
  }

  /* background-color: blue; */

  /* background-Color: red; */
  /* gap: 3rem;
  width:100%;
  max-Width: calc(100vw - ((100vw - 1180px) / 2));
  margin-Left:auto;
  margin-right: auto;
  min-Height: 656px; */

  /* border: 1px solid black; */
`;
