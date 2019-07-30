import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Menu from './components/Menu/Menu';
import Content from './components/Content/Content';


const AppWrapper = styled.div`
  &:after {
    content: '',
    display: block,
    clear: both
  }

  
  .aside {
    width: 16%;
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    bottom: -100px;
    background-color: #24243E;
    padding: 31px 0;
    color: #ccc;
  }

  .content {
    float: right;     
    width: 100%;    
    margin-left: -100px;
    max-width: 84%;
  }
  
  .right{
    width: 100%;    
    height:100vh;
    overflow:hidden; 
    background-color: #221F3A;
  }
`;
class App extends PureComponent {
  render() {
    return (
      <AppWrapper>
        <div className='aside'>
          <Menu />
        </div>
        <div className='content'>
          <div className='right'>
            <Content/>
          </div>
        </div>
      </AppWrapper>
    );
  }
}



export default App;
