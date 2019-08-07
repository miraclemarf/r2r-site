import { combineReducers } from 'redux'
import HostnameReducer from './hostnameReducers'
import TripListReducer from './tripListReducers'
import HeadlineDataReducer from './headlineDataReducers'
import TestimonialsDataReducer from './testimonialsDataReducers'
import GalleryDataReducer from './galleryDataReducers'

export default combineReducers({
    Hostname: HostnameReducer,
    TripList: TripListReducer,
    HeadlineData: HeadlineDataReducer,
    TestimonialsData: TestimonialsDataReducer,
    GalleryData: GalleryDataReducer
})
