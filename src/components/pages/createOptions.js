import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Footer from '../components/footer';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  .mainside{
    .connect-wal{
      display: none;
    }
    .logout{
      display: flex;
      align-items: center;
    }
  }
`;


export default class Createpage extends Component {



  render() {
    return (
      <div>
        <GlobalStyles />
        <section className='jumbotron breadcumb no-bg'>
          <div className='mainbreadcumb'>
            <div className='container'>
              <div className='row m-10-hor'>
                <div className='col-12'>
                  <h1 className='text-center'>Create Collectible</h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='container'>
          <div className='row' >
            <div className="col-md-6 offset-md-3">
              <p>Create</p>
              <Link to="/createNFT" className="opt-create">
                <img src="./img/misc/coll-single.png" alt="" />
                <h3>Mint an NFT
                </h3>
                <p>Create a new NFT and mint it to one of your own ERC-721 smart contracts.</p>
              </Link>
              <Link to="/createEdition" className="opt-create">
                <img src="./img/misc/coll-multiple.png" alt="" />
                <h3>Create an Edition
                </h3>
                <p>Multiple mints of the same artwork, limited either by time or supply.</p>
              </Link>
            </div>
          </div>
        </section>



        <Footer />
      </div>
    );
  }
}