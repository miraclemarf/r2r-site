import { Container, Row, Col  } from "reactstrap";
export default ()=>(
    <div  className="bg-dark py-1">
        <Container> 
            <div className="d-flex justify-content-between mt-3 mb-2">
                    <div className="d-block w-50">
                    <img height="20" src="/static/slicing/logo_ring2ring_full.svg" />
                    </div>
                    <div className="d-block" style={{"width":"33%"}}>
                    <div className="d-flex justify-content-between text-white h4">
                    <span className="icon-facebook"></span>
                    <span className="icon-instagram"></span>
                    <span className="icon-youtube-play"></span>
                    </div>
                </div>
            </div>
        </Container>
    </div>
)