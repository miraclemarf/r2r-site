import { combineReducers } from 'redux'
import TripDataReducer from './tripDataReducers'
import HeadlineDataReducer from './headlineDataReducers'
import TestimonialsDataReducer from './testimonialsDataReducers'
import GalleryDataReducer from './galleryDataReducers'
import GalleryTotalReducer from './galleryTotalReducers'
import MotorDataReducer from './motorDataReducers'

export default combineReducers({
    TripData: TripDataReducer,
    HeadlineData: HeadlineDataReducer,
    TestimonialsData: TestimonialsDataReducer,
    GalleryData: GalleryDataReducer,
    GalleryTotal: GalleryTotalReducer,
    MotorData: MotorDataReducer
})
