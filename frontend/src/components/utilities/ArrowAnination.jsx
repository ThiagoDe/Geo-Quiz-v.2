import './arrowAnimation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"


const ArrowAnimation = () => {

    return (
        <div className='arrow-animation'>
        <FontAwesomeIcon icon={faArrowRight}/>
        </div>
    )
}

export default ArrowAnimation