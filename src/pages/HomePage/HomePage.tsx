/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { Page, HeroHeader, FormQuote, QuotesListing } from "../../components/organisms";
import { VerticalCenteredModal } from '../../components/molecules';
import { SectionContainer, Loader } from '../../components/atoms';
import { FullScreenLoaderContext } from '../../app/App';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { getSuggestedQuotes } from '../../redux/actions/suggestedQuotesAction';
import './HomePage.scss';


const HomePage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [suggestedQuote, setSuggestedQuote] = useState(null);

  const dispatch: Dispatch<any> = useDispatch();
  const setfullScreenLoadingActive = useContext(FullScreenLoaderContext);
  const { data, loading, error } = useSelector((state: any) => state.suggestedQuotes);
  const { data: quotesFiltered, loading: loadingQuotesFilterd } = useSelector((state: any) => state.quotesFiltered);
  const { data: dataQuotes, loading: loadingQuotes, error: errorQuotes} = useSelector((state: any) => state.quotes);

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
    <Page className='min-vh-100'>
      <div>{error}</div>
    </Page>
  ) : (
    <Page className='min-vh-100'>
      <HeroHeader />
      <SectionContainer title='Add New Quote'>
        <FormQuote />
      </SectionContainer>
      <SectionContainer title='Quote List' searchBar={true}>
        {(loadingQuotes || loadingQuotesFilterd) ? (<Loader />) : errorQuotes ? (<div>{errorQuotes}</div>) : (<QuotesListing quotes={!!quotesFiltered.length ? quotesFiltered : dataQuotes} />)}
      </SectionContainer>
      {suggestedQuote && <VerticalCenteredModal show={modalShow} onHide={() => setModalShow(false)} suggetedQuote={suggestedQuote} />}
    </Page>
  );
};

export default HomePage;
