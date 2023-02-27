/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, createContext } from "react";
import { Page, HeroHeader, FormQuote, QuotesListing } from "../../components/organisms";
import { VerticalCenteredModal } from '../../components/molecules';
import { FullScreenLoader, SectionContainer, Loader } from '../../components/atoms';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { getSuggestedQuotes } from '../../redux/actions/suggestedQuotesAction';
import { SearchTermContextType } from '../../utilis/types';
import './HomePage.scss';

export const SearchTermContext = createContext<SearchTermContextType>({} as SearchTermContextType);

const HomePage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [suggestedQuote, setSuggestedQuote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
  }, [data]);

  const filteredQuotes = () => {} // rimasto qui

  const { data: dataQuotes, loading: loadingQuotes, error: errorQuotes} = useSelector((state: any) => state.quotes);

  return loading ? (
    <FullScreenLoader />
  ) : error ? (
    <div>{error}</div>
  ) : (
  <SearchTermContext.Provider value={{searchTerm, setSearchTerm}}>
    <Page>
      <HeroHeader />
      <SectionContainer title='Add New Quote'>
        <FormQuote />
      </SectionContainer>
      <SectionContainer title='Quote List' searchBar={true}>
        {loadingQuotes ? (<Loader />) : errorQuotes ? (<div>{errorQuotes}</div>) : (<QuotesListing quotes={dataQuotes} />)}
      </SectionContainer>
      {suggestedQuote && <VerticalCenteredModal show={modalShow} onHide={() => setModalShow(false)} suggetedQuote={suggestedQuote} />}
    </Page>
  </SearchTermContext.Provider>
  );
};

export default HomePage;
