import * as React from 'react'
import {connect} from 'react-redux'
import {List} from 'immutable'

import {imageListSelector, currentImageSelector} from '@store/Carousel/Carousel.selectors'
import {selectNext, selectPrev} from '@store/Carousel/Carousel.actions'

import {Icon} from 'office-ui-fabric-react'
import * as style from './style/CarouselSlide.scss'

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
        content = <img className={style.carouselContent} src={images.get(currentImage)} />
    } else {
        content = <p>No photos</p>
    }

    return (
        <div className={style.carouselSlide}>
            <a className={style.carouselControl} onClick={() => prev()}>
                <Icon iconName="ChevronLeftMed" />
            </a>
            <div className={style.carouselContentContainer}>{content}</div>
            <a className={style.carouselControl} onClick={() => next()}>
                <Icon iconName="ChevronRightMed" />
            </a>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CarouselSlide)
