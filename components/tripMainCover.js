import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: 'https://loremflickr.com/1024/768/hills?random=212',
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header'
  },
  {
    src: 'https://loremflickr.com/1024/768/hills?random=124',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header'
  },
  {
    src: 'https://loremflickr.com/1024/768/hills?random=726',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header'
  }
];

const TripMainCover = () => <UncontrolledCarousel items={items} />;

export default TripMainCover;