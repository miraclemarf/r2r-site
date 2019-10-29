import { combineReducers } from 'redux'
import TripDataReducer from './tripDataReducers'
import TransactionDataReducer from './transactionDataReducers'
import HeadlineDataReducer from './headlineDataReducers'
import TestimonialsDataReducer from './testimonialsDataReducers'
import GalleryDataReducer from './galleryDataReducers'
import MotorDataReducer from './motorDataReducers'
import AccessoriesDataReducer from './accessoriesDataReducers'

export default combineReducers({
    TripData: TripDataReducer,
    TransactionData: TransactionDataReducer,
    HeadlineData: HeadlineDataReducer,
    TestimonialsData: TestimonialsDataReducer,
    GalleryData: GalleryDataReducer,
    MotorData: MotorDataReducer,
    AccessoriesData: AccessoriesDataReducer
})
