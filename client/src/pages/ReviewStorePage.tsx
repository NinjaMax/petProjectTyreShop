import React, { Suspense, lazy, useContext, useEffect, useState } from 'react';
import '../css/Pages/ReviewStorePage.css';
import Modal from '../components/modal/Modal';
import { Context } from '../context/Context';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { FormValuesStore } from '../components/reviews/types/ReviewStoreCreate.type';
import { createStoreReview, getAllStoreReview } from '../restAPI/restGoodsApi';
import { useTranslation } from 'react-i18next';

const BreadCrumbs = lazy(() => import('../components/BreadCrumbs'));
const ButtonAction = lazy(() => import('../components/buttons/ButtonAction'));
const ReviewStore = lazy(() => import('../components/reviews/ReviewStore'));
const ReviewStoreCreate = lazy(() => import('../components/reviews/ReviewStoreCreate'));

const ReviewStorePage = () => {
  const {goodsTyre, customer} = useContext<any | null>(Context);
  const [activeStore, setActiveStore] = useState<boolean>(false);
  const [dataReviewStore, setDataReviewStore] = useState<{} | null>(null);
  const [dataStoreList, setDataStoreList] = useState<any[] | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    let isMounted = false;
    const getProduct = async () => {
      const taskReviewStore: any[] = [
        createStoreReview,
        getAllStoreReview
      ]
    let i: number = 0; 
    while (taskReviewStore.length > i) {
      if (!isMounted && taskReviewStore[i] === createStoreReview && dataReviewStore) {
        if (dataReviewStore) {
          const createReviewStore: any = await taskReviewStore[i](
          dataReviewStore,
          customer._customer.id_customer,
          customer._customer.picture ?? customer._customer.profile_image_url,
          goodsTyre.ratingList.rating_overall,
          );
          if (createReviewStore?.status === 201) {
            setDataReviewStore(null);
            goodsTyre.setNewRating('rating_overall', 0);
            setActiveStore(!activeStore);
          }
        } 
      }
      if (!isMounted && taskReviewStore[i] === getAllStoreReview) {
        const getReviewStore: any = await taskReviewStore[i]();
        if (getReviewStore) {
          setDataStoreList(getReviewStore);
        }
      }
      const task = taskReviewStore.shift();
      task();
      await yieldToMain();
    }
    };
    getProduct();
    return () => {
      isMounted = true;
    };
  },
  [
    activeStore,
    customer._customer.id_customer,
    customer._customer.picture,
    customer._customer.profile_image_url,
    dataReviewStore,
    goodsTyre
  ]);
  const onSubmitReviewStore = (data: FormValuesStore) => {
    setDataReviewStore(data); 
  };

  const onCreateRevieStore = () => {
    setActiveStore(!activeStore);
  };

  return (
    <div className='reviewStorePage'>
      <Suspense fallback={<span>....</span>}>
      <BreadCrumbs route={[i18n.resolvedLanguage === 'uk' ? '/' : '/ru','/reviews']} hrefTitle={[t('catalogPage.bread_crumbs_site'),'']}/>
      <div className='reviewStorePageContainer'>
        <div className='reviewStorePageTitle' >
          <span>{t('reviewStorePage.reviewStoreClient')}</span>
          <ButtonAction props={t('reviewStorePage.addReviewStore')}
            eventItem={onCreateRevieStore}
          /> 
        </div>
        {dataStoreList?.length !== 0 ? 
          dataStoreList?.map((item) =>
          <div className='reviewStorePageBox'
            key={item.id_review_store}
          >
            <ReviewStore storeData={item} />
          </div>
          )
        : null
        }
          <Modal active={activeStore} setActive={setActiveStore}>
            <ReviewStoreCreate onSubmitReviewStore={onSubmitReviewStore}/>
          </Modal>
      </div>
      </Suspense>
    </div>
  )
}

export default ReviewStorePage