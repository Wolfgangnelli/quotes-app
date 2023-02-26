import React, { useState, useEffect } from "react";
import { Page, HeroHeader } from "../../components/organisms";
import { VerticalCenteredModal } from '../../components/molecules';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { getSuggestedQuotes } from '../../redux/actions/suggestedQuotesAction';
import './HomePage.scss';

const HomePage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [suggestedQuote, setSuggestedQuote] = useState(null);

  const dispatch: Dispatch<any> = useDispatch();
  const {data, loading, error} = useSelector((state: any) => state.suggestedQuotes);

  useEffect(() => {
    if(suggestedQuote === null) {
      if(!!data?.length === false) {
        dispatch(getSuggestedQuotes());
      } else {
        const randomSuggestedQuote = data[Math.floor(Math.random()*data.length)];
        setSuggestedQuote(randomSuggestedQuote);
        setModalShow(true);
      }
    }
  }, [dispatch, data, suggestedQuote]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
  <Page>
    <HeroHeader />
    {suggestedQuote && <VerticalCenteredModal show={modalShow} onHide={() => setModalShow(false)} suggetedQuote={suggestedQuote} />}
  </Page>
  );
};

export default HomePage;
