import { Container } from 'reactstrap'

export default ({ ...props }) => (
    <a href={props.linkUrl} title={props.title}>
        <div style={{ 'backgroundImage': 'url(' + props.mediaUrl + ')' }} className="mainCover overlay--img__black position-relative d-flex align-items-end mb-3">
            <Container className="p-0 position-relative d-inline-block w-100 h-100">
                <div className="coverInfo position-absolute d-block text-white">
                    <h1 className="title-section">{props.title}</h1>
                    <div style={{fontSize: "10pt"}} dangerouslySetInnerHTML={{ __html: props.subtitle }}></div>
                    {
                        !props.isVideo ?
                        <div className="video-section position-absolute">
                            <span className="icon icon-icon_play_video text-white" />
                            <span className="section-info text-white">WATCH VIDEO</span>
                        </div>   : ''
                    }
                </div>
            </Container>
        </div>
    </a>
)