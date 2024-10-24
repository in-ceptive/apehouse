import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTopBtn from './menu/ScrollToTop';
import Header from './menu/header';
import Home from './pages/home';
import Home1 from './pages/home1';
import Home2 from './pages/home2';
import Explore from './pages/explore';
import Explore2 from './pages/explore2';
import Helpcenter from './pages/helpcenter';
import ExploreOpensea from './pages/Opensea/explore';
// import Rangking from './pages/rangking';
import RankingRedux from './pages/RankingRedux';
import Colection from './pages/colection';
// import ItemDetail from './pages/ItemDetail';
import ItemDetailRedux from './pages/ItemDetailRedux';
import Author from './pages/Author';
import AuthorOpensea from './pages/Opensea/author';
import Wallet from './pages/wallet';
import Login from './pages/login';
import LoginTwo from './pages/loginTwo';
import Register from './pages/register';
import Price from './pages/price';
import Works from './pages/works';
import News from './pages/news';
import NewsSingle from './pages/newsSingle';
import CreateNFT from './pages/createNFT';
import CreateEdition from './pages/createEdition';
import Create3 from './pages/create3';
import Createoption from './pages/createOptions';
import Feed from './pages/Feed';
import Activity from './pages/activity';
import Contact from './pages/contact';
import ElegantIcons from './pages/elegantIcons';
import EtlineIcons from './pages/etlineIcons';
import FontAwesomeIcons from './pages/fontAwesomeIcons';
import Accordion from './pages/accordion';
import Alerts from './pages/alerts';
import Progressbar from './pages/progressbar';
import Tabs from './pages/tabs';
import Minter from './pages/Minter';
import auth from '../core/auth';
import Profile from './pages/Profile';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const isAuth = auth.getToken() !== null;

  return (
    isAuth ? children : <Navigate to="/login" state={{ from: location }} replace />
  )
};

const app = () => (
  <div className="wraper">
    <GlobalStyles />
    <Header />
    <Routes>
      <Route path="*" element={<Navigate to="/home" replace />} />
      <Route path="/Author">
        <Route
          path=":authorId"
          element={
            <ProtectedRoute>
              <Author />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/Profile">
        <Route
          path=":authorId"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/home" element={<Home1 />} />
      <Route element={<Home1 />} path="/home1" />
      <Route element={<Home2 />} path="/home2" />
      <Route element={<Explore />} path="/explore" />
      <Route element={<Explore2 />} path="/art" />
      <Route element={<ExploreOpensea />} path="/exploreOpensea" />
      <Route element={<RankingRedux />} path="/rangking" />
      <Route element={<Feed />} path="/feed" />
      <Route element={<Helpcenter />} path="/helpcenter" />
      <Route element={<Colection />} path="/colection/:collectionId" />
      <Route element={<ItemDetailRedux />} path="/ItemDetail/:nftId" />
      <Route element={<AuthorOpensea />} path="/AuthorOpensea" />
      <Route element={<Wallet />} path="/wallet" />
      <Route element={<Login />} path="/login" />
      <Route element={<Login />} path="/privatesales" />
      <Route element={<LoginTwo />} path="/loginTwo" />
      <Route element={<Register />} path="/register" />
      <Route element={<Price />} path="/price" />
      <Route element={<Explore />} path="/curated-conversations" />
      <Route element={<News />} path="/features" />
      <Route element={<NewsSingle />} path="/news/:postId" />
      <Route element={<CreateNFT />} path="/createNFT" />
      <Route element={<CreateEdition />} path="/createEdition" />
      <Route element={<Create3 />} path="/create3" />
      <Route element={<Createoption />} path="/createOptions" />
      <Route element={<Activity />} path="/activity" />
      <Route element={<Contact />} path="/contact" />
      <Route element={<ElegantIcons />} path="/elegantIcons" />
      <Route element={<EtlineIcons />} path="/etlineIcons" />
      <Route element={<FontAwesomeIcons />} path="/fontAwesomeIcons" />
      <Route element={<Accordion />} path="/accordion" />
      <Route element={<Alerts />} path="/alerts" />
      <Route element={<Progressbar />} path="/progressbar" />
      <Route element={<Tabs />} path="/tabs" />
      <Route element={<Minter />} path="/releases" />
    </Routes>
    <ScrollToTopBtn />
  </div>
);
export default app;