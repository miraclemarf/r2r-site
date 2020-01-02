import { combineReducers } from 'redux'
import TripDataReducer from './tripDataReducers'
import TripsTotalReducer from './tripsTotalReducers'
import TripFeaturedReducer from './tripFeaturedReducers'
import TransactionDataReducer from './transactionDataReducers'
import HeadlineDataReducer from './headlineDataReducers'
import TestimonialsDataReducer from './testimonialsDataReducers'
import GalleryDataReducer from './galleryDataReducers'
import GalleryTotalReducer from './galleryTotalReducers'
import MotorDataReducer from './motorDataReducers'
import AccessoriesDataReducer from './accessoriesDataReducers'
import MyTransactionsReducer from './myTransactionsReducers'
import MyTransactionsFetchedReducer from './myTransactionsFetchedReducers'
import MyGalleriesReducer from './myGalleriesReducers'
import MyGalleriesFetchedReducer from './myGalleriesFetchedReducers'

export default combineReducers({
    TripData: TripDataReducer,
    TripsTotal: TripsTotalReducer,
    TripFeatured: TripFeaturedReducer,
    TransactionData: TransactionDataReducer,
    HeadlineData: HeadlineDataReducer,
    TestimonialsData: TestimonialsDataReducer,
    GalleryData: GalleryDataReducer,
    MotorData: MotorDataReducer,
    AccessoriesData: AccessoriesDataReducer,
    GalleryTotal: GalleryTotalReducer,
    MotorData: MotorDataReducer,
    MyTransactions: MyTransactionsReducer,
    StopFetchMyTransactions: MyTransactionsFetchedReducer,
    MyGalleries: MyGalleriesReducer,
    StopFetchMyGalleries: MyGalleriesFetchedReducer
})
