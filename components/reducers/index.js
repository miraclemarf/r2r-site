import { combineReducers } from 'redux'
import TripDataReducer from './tripDataReducers'
import HeadlineDataReducer from './headlineDataReducers'
import TestimonialsDataReducer from './testimonialsDataReducers'
import GalleryDataReducer from './galleryDataReducers'
import MotorDataReducer from './motorDataReducers'

export default combineReducers({
    TripData: TripDataReducer,
    HeadlineData: HeadlineDataReducer,
    TestimonialsData: TestimonialsDataReducer,
    GalleryData: GalleryDataReducer,
    MotorData: MotorDataReducer
})
