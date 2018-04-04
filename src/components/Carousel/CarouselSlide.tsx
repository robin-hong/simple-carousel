import * as React from 'react'
import {connect} from 'react-redux'
import {List} from 'immutable'

import {Icon} from 'office-ui-fabric-react'

import './style/CarouselSlide.scss'

import {imageListSelector, currentImageSelector} from '@store/Carousel/Carousel.selectors'
import {selectNext, selectPrev} from '@store/Carousel/Carousel.actions'

interface CarouselSlideProps {
    images: List<string>
    currentImage: number
    prev: () => void
    next: () => void
}

const mapStateToProps = state => {
    return {
        images: imageListSelector(state),
        currentImage: currentImageSelector(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        next: () => dispatch(selectNext()),
        prev: () => dispatch(selectPrev())
    }
}

const CarouselSlide: React.SFC<CarouselSlideProps> = props => {
    const {images, currentImage, prev, next} = props

    let content = null
    if (images.size > 0) {
        content = <img className="carousel-content" src={images.get(currentImage)} />
    } else {
        content = <p>No photos</p>
    }

    return (
        <div className="carousel-slide">
            <a className="carousel-control carousel-control--prev" onClick={() => prev()}>
                <Icon iconName="ChevronLeftMed" />
            </a>
            {content}
            <a className="carousel-control carousel-control--next" onClick={() => next()}>
                <Icon iconName="ChevronRightMed" />
            </a>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CarouselSlide)
