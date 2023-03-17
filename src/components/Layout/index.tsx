import { CSSProperties } from 'react';
import React, { useState } from "react";
import { ReactNode } from 'react';
import { Header } from './Header';
import { SideMenu } from './Sidemenu';


interface Props {
  children: ReactNode;
  containerStyle?: CSSProperties;
}

export function Layout({ children, containerStyle }: Props) {



  return (
    <>
      <div id="layout-container " style={{ ...containerStyle, }}  >
      {/* style={{overflow: 'hidden', minHeight: '140vh'}} */}
      <Header />
        <div className="container-fluid" style={{overflow: 'hidden', minHeight: '140vh'}} >
          <div className="row">
            <div  className="col-lg-1" >
              <SideMenu />
            </div>
            <div className="col-lg-11 " style={{marginTop:'80px'}} >{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
