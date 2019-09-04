import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: process.env.HOST_URL + '/img/assets/1567049921321gjkaait4.jpeg',
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header'
  },
  {
    src: process.env.HOST_URL + '/img/assets/1567050019718qrcaiqps.jpeg',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header'
  },
  {
    src: process.env.HOST_URL + '/img/assets/15670500284989abl09d9.jpeg',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header'
  }
];

const TripMainCover = () => <UncontrolledCarousel items={items} />;

export default TripMainCover;