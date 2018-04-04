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

    let content = []
    if (images.size > 0) {
        images.forEach((image, i) => {
            let active = i === currentImage && style.active
            let left =
                (currentImage - 1 === i || (currentImage === 0 && i === images.size - 1)) &&
                style.left
            let right =
                (currentImage + 1 === i || (currentImage === images.size - 1 && i === 0)) &&
                style.right
            content.push(
                <img
                    key={i}
                    className={`${style.carouselContent} ${active} ${left} ${right}`}
                    src={images.get(i)}
                />
            )
        })
    } else {
        content.push(
            <p key="none" className={style.noPhotos}>
                No photos
            </p>
        )
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
