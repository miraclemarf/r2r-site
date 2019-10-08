import { combineReducers } from 'redux'
import TripDataReducer from './tripDataReducers'
import HeadlineDataReducer from './headlineDataReducers'
import TestimonialsDataReducer from './testimonialsDataReducers'
import GalleryDataReducer from './galleryDataReducers'
import GalleryTotalReducer from './galleryTotalReducers'
import MotorDataReducer from './motorDataReducers'
import MyTransactionsReducer from './myTransactionsReducers'
import MyTransactionsFetchedReducer from './myTransactionsFetchedReducers'
import MyGalleriesReducer from './myGalleriesReducers'
import MyGalleriesFetchedReducer from './myGalleriesFetchedReducers'

export default combineReducers({
    TripData: TripDataReducer,
    HeadlineData: HeadlineDataReducer,
    TestimonialsData: TestimonialsDataReducer,
    GalleryData: GalleryDataReducer,
    GalleryTotal: GalleryTotalReducer,
    MotorData: MotorDataReducer,
    MyTransactions: MyTransactionsReducer,
    StopFetchMyTransactions: MyTransactionsFetchedReducer,
    MyGalleries: MyGalleriesReducer,
    StopFetchMyGalleries: MyGalleriesFetchedReducer
})
