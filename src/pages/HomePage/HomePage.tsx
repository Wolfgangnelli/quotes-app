/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { Page, HeroHeader, FormQuote, QuotesListing } from "../../components/organisms";
import { VerticalCenteredModal } from '../../components/molecules';
import { SectionContainer, Loader } from '../../components/atoms';
import { FullScreenLoaderContext } from '../../app/App';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { getSuggestedQuotes } from '../../redux/actions/suggestedQuotesAction';
import { StoreStateType } from '../../utilis/types';
import './HomePage.scss';


const HomePage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [suggestedQuote, setSuggestedQuote] = useState(null);

  const dispatch: Dispatch<any> = useDispatch();
  const setfullScreenLoadingActive = useContext(FullScreenLoaderContext);
  const { data, loading, error } = useSelector((state: StoreStateType) => state.suggestedQuotes);
  const { data: quotesFiltered, loading: loadingQuotesFiltered, error: errorQuotesFiltered } = useSelector((state: StoreStateType) => state.quotesFiltered);
  const { data: dataQuotes, loading: loadingQuotes, error: errorQuotes} = useSelector((state: StoreStateType) => state.quotes);

  useEffect(() => {
    if(suggestedQuote === null) {
      if(!!data?.length === false) {
          dispatch(getSuggestedQuotes());
      } else {
        const randomSuggestedQuote = data[Math.floor(Math.random()*data.length)];
        setSuggestedQuote(randomSuggestedQuote);
        setModalShow(true);
      }
      loading ? setfullScreenLoadingActive(true) : setfullScreenLoadingActive(false);
      
    }
  }, [data]);

  return error ? (
    <div>{error}</div>
  ) : (
    <Page className='min-vh-100'>
      <HeroHeader />
      <SectionContainer title='Add New Quote'>
        <FormQuote />
      </SectionContainer>
      <SectionContainer title='Quote List' searchBar={true}>
        {(loadingQuotes || loadingQuotesFiltered) ? (<Loader />) : errorQuotes || errorQuotesFiltered ? (<div>{errorQuotes ?? errorQuotesFiltered}</div>) : (<QuotesListing quotes={!!quotesFiltered.length ? quotesFiltered : dataQuotes} />)}
      </SectionContainer>
      {suggestedQuote && <VerticalCenteredModal show={modalShow} onHide={() => setModalShow(false)} suggetedQuote={suggestedQuote} />}
    </Page>
  );
};

export default HomePage;
