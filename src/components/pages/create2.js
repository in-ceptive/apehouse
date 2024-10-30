import React, { Component } from "react";
import Clock from "../components/Clock";
import Footer from '../components/footer';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  .mainside{
    .connect-wal{
      display: block;
    }
    .logout{
      display: flex;
      align-items: center;
    }
  }
`;


export default class Createpage extends Component {

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      files: [],
    };
  }

  onChange(e) {
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    document.getElementById("file_name").style.display = "none";
    this.setState({ files: [...this.state.files, ...filesArr] });
  }

  handleShow = () => {
    document.getElementById("tab_opt_1").classList.add("show");
    document.getElementById("tab_opt_1").classList.remove("hide");
    document.getElementById("tab_opt_2").classList.remove("show");
    document.getElementById("btn1").classList.add("active");
    document.getElementById("btn2").classList.remove("active");
    document.getElementById("btn3").classList.remove("active");
  }
  handleShow1 = () => {
    document.getElementById("tab_opt_1").classList.add("hide");
    document.getElementById("tab_opt_1").classList.remove("show");
    document.getElementById("tab_opt_2").classList.add("show");
    document.getElementById("btn1").classList.remove("active");
    document.getElementById("btn2").classList.add("active");
    document.getElementById("btn3").classList.remove("active");
  }
  handleShow2 = () => {
    document.getElementById("tab_opt_1").classList.add("show");
    document.getElementById("btn1").classList.remove("active");
    document.getElementById("btn2").classList.remove("active");
    document.getElementById("btn3").classList.add("active");
  }

  state = {
    isActive: false
  }
  unlockClick = () => {
    this.setState({
      isActive: true
    })
  }
  unlockHide = () => {
    this.setState({ isActive: false });
  };

  render() {
    return (
      <div>
        <GlobalStyles />
        <section className='jumbotron breadcumb no-bg'>
          <div className='mainbreadcumb'>
            <div className='container'>
              <div className='row m-10-hor'>
                <div className='col-12'>
                  <h1 className='text-center'>Create an Edition
                  </h1>
                  <p>Multiple mints of the same artwork, limited either by time or supply.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='container'>

          <div className="row">
            <div className="col-lg-7 offset-lg-1 mb-5">
              <form id="form-create-item" className="form-border" action="#">
                <div className="field-set">
                  <h5>Upload file</h5>

                  <div className="d-create-file">
                    <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                    {this.state.files.map(x =>
                      <p key="{index}">PNG, JPG, GIF, WEBP or MP4. Max 200mb.{x.name}</p>
                    )}
                    <div className='browse'>
                      <input type="button" id="get_file" className="btn-main" value="Browse" />
                      <input id='upload_file' type="file" multiple onChange={this.onChange} />
                    </div>

                  </div>

                  <div className="spacer-single"></div>

                  <h5>Select method</h5>
                  <div className="de_tab tab_methods">
                    <ul className="de_nav text-left mx-0">
                      <li id='btn1' className="active" onClick={this.handleShow}><span><i className="fa fa-tag"></i>Fixed price</span>
                      </li>
                      <li id='btn2' onClick={this.handleShow1}><span><i className="fa fa-hourglass-1"></i>Timed auction</span>
                      </li>
                      <li id='btn3' onClick={this.handleShow2}><span><i className="fa fa-users"></i>Open for bids</span>
                      </li>
                    </ul>

                    <div className="de_tab_content pt-3">
                      <h5>Edition name
                      </h5>
                      <input type="text" name="item_title" id="item_title" className="form-control" placeholder="Name" />

                      <div className="spacer-10"></div>
                      <h5>Contract symbol

                      </h5>
                      <input type="text" name="item_title" id="item_title" className="form-control" placeholder="SYM" />

                      <div className="spacer-10"></div>


                      <h5>Description</h5>
                      <textarea data-autoresize name="item_desc" id="item_desc" className="form-control" placeholder="e.g. 'This is very limited item'"></textarea>

                      <div className="spacer-10"></div>
                      <h5>Blockchain</h5>
                      <select name="blockchain" id="blockchain" className="form-control">
                        <option value="base">Base</option>
                        <option value="ethereum">Ethereum</option>
                      </select>

                      <div className="spacer-10"></div>
                      <div id="tab_opt_1">
                        <h5>Price</h5>
                        <input type="text" name="item_price" id="item_price" className="form-control" placeholder="enter price for one item (APE)" />
                      </div>

                      <div id="tab_opt_2" className='hide'>
                        <h5>Minimum bid</h5>
                        <input type="text" name="item_price_bid" id="item_price_bid" className="form-control" placeholder="enter minimum bid" />

                        <div className="spacer-20"></div>

                        <div className="row">
                          <div className="col-md-6">
                            <h5>Starting date</h5>
                            <input type="date" name="bid_starting_date" id="bid_starting_date" className="form-control" min="1997-01-01" />
                          </div>
                          <div className="col-md-6">
                            <h5>Expiration date</h5>
                            <input type="date" name="bid_expiration_date" id="bid_expiration_date" className="form-control" />
                          </div>
                        </div>
                      </div>

                      <div id="tab_opt_3">
                      </div>

                    </div>

                  </div>

                  <div className="spacer-20"></div>

                  <div className="switch-with-title">
                    <h5><i className="fa fa- fa-unlock-alt id-color-2 mr10"></i>Unlock once purchased</h5>
                    <div className="de-switch">
                      <input type="checkbox" id="switch-unlock" className="checkbox" />
                      {this.state.isActive ? (
                        <label htmlFor="switch-unlock" onClick={this.unlockHide}></label>
                      ) : (
                        <label htmlFor="switch-unlock" onClick={this.unlockClick}></label>
                      )}
                    </div>
                    <div className="clearfix"></div>
                    <p className="p-info pb-3">Unlock content after successful transaction.</p>

                    {this.state.isActive ?
                      <div id="unlockCtn" className="hide-content">
                        <input type="text" name="item_unlock" id="item_unlock" className="form-control" placeholder="Access key, code to redeem or link to a file..." />
                      </div>
                      : null}
                  </div>



                  <h5>Price</h5>
                  <input type="text" name="item_price" id="item_price" className="form-control" placeholder="enter price for one item (APE)" />

                  <div className="spacer-10"></div>

                  <h5>Royalties</h5>
                  <input type="text" name="item_royalties" id="item_royalties" className="form-control" placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%" />

                  <div className="spacer-10"></div>

                  <input type="button" id="submit" className="btn-main" value="Create Item" />
                </div>
              </form>
            </div>

            <div className="col-lg-3 col-sm-6 col-xs-12">
              <h5>Preview item</h5>
              <div className="nft__item m-0">
                <div className="de_countdown">
                  <Clock deadline="December, 30, 2021" />
                </div>
                <div className="author_list_pp">
                  <span>
                    <img className="lazy" src="./img/author/author-1.jpg" alt="" />
                    <i className="fa fa-check"></i>
                  </span>
                </div>
                <div className="nft__item_wrap">
                  <span>
                    <img src="./img/collections/coll-item-3.jpg" id="get_file_2" className="lazy nft__item_preview" alt="" />
                  </span>
                </div>
                <div className="nft__item_info">
                  <span >
                    <h4>Pinky Ocean</h4>
                  </span>
                  <div className="nft__item_price">
                    0.08 APE<span>1/20</span>
                  </div>
                  <div className="nft__item_action">
                    <span>Place a bid</span>
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i><span>50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        <Footer />
      </div>
    );
  }
}