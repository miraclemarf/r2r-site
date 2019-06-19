import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: process.env.HOST_URL + '/img/assets/1560731065599t2a23j3k.jpeg',
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header'
  },
  {
    src: process.env.HOST_URL + '/img/assets/15607308932615i2l9dbg.jpeg',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header'
  },
  {
    src: process.env.HOST_URL + '/img/assets/1560730570027q9qfldq7.jpeg',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header'
  }
];

const TripMainCover = () => <UncontrolledCarousel items={items} />;

export default TripMainCover;