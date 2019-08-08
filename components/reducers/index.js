import { combineReducers } from 'redux'
import TripListReducer from './tripListReducers'
import HeadlineDataReducer from './headlineDataReducers'
import TestimonialsDataReducer from './testimonialsDataReducers'
import GalleryDataReducer from './galleryDataReducers'

export default combineReducers({
    TripList: TripListReducer,
    HeadlineData: HeadlineDataReducer,
    TestimonialsData: TestimonialsDataReducer,
    GalleryData: GalleryDataReducer
})
