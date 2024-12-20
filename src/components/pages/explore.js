import React from 'react';
import ColumnNewRedux from '../components/ColumnNewRedux';
import Footer from '../components/footer';
import TopFilterBar from '../components/TopFilterBar';


const explore = () => (
  <div>

    <section className='jumbotron breadcumb no-bg'>
      <div className='mainbreadcumb'>
        <div className='container'>
          <div className='row m-10-hor'>
            <div className='col-12'>
              <h1 className='text-center'>Insights</h1>
              <p>Discover new trends, learn new skills,
                and read profiles of innovative artists on the cutting edge of NFT art.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className='container'>
      <div className='row'>
        <div className='col-lg-12'>
          <TopFilterBar />
        </div>
      </div>
      <ColumnNewRedux />
    </section>


    <Footer />
  </div>

);
export default explore;