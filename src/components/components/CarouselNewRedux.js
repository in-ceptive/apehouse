import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Clock from "./Clock";
import { carouselNew } from './constants';
import * as selectors from '../../store/selectors';
import { fetchNftsBreakdown } from "../../store/actions/thunks";
import api from "../../core/api";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 260px;
  overflow: hidden;
  border-radius: 8px;
`;

const CarouselNewRedux = () => {

  const dispatch = useDispatch();
  const nftsState = useSelector(selectors.nftBreakdownState);
  const nfts = nftsState.data ? nftsState.data : [];

  useEffect(() => {
    dispatch(fetchNftsBreakdown());
  }, [dispatch]);

  return (
    <div className='nft'>
      <Slider {...carouselNew}>
        {nfts && nfts.map((nft, index) => (
          <div className='itm' index={index + 1} key={index}>
            <div className="d-item">
              <div className="nft__item">
                {nft.deadline &&
                  <div className="de_countdown">
                    <Clock deadline={nft.deadline} />
                  </div>
                }
                <div className="author_list_pp">
                  <span onClick={() => window.open("/home1", "_self")}>
                    <img className="lazy" src={api.baseUrl + nft.author.avatar.url} alt="" />
                    <i className="fa fa-check"></i>
                  </span>
                </div>
                <div className="nft__item_wrap">
                  <Outer>
                    <span>
                      <img src={api.baseUrl + nft.preview_image.url} className="lazy nft__item_preview" alt="" />
                    </span>
                  </Outer>
                </div>
                <div className="nft__item_info">
                  <span onClick={() => window.open("/#", "_self")}>
                    <h4>{nft.title}</h4>
                  </span>
                  <div className="nft__item_price">
                    {nft.price} APE<span>{nft.bid}/{nft.max_bid}</span>
                  </div>
                  <div className="nft__item_action">
                    <span onClick={() => window.open(nft.bid_link, "_self")}>Place a bid</span>
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i><span>{nft.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default memo(CarouselNewRedux);
