import * as React from 'react'
import {connect} from 'react-redux'

import CarouselToggles from './CarouselToggles'
import CarouselSlide from './CarouselSlide'

import {loadingSelector} from '../../store/Carousel/Carousel.selectors'
import {toggleAnimal} from '../../store/Carousel/Carousel.actions'

import {Spinner, SpinnerSize} from 'office-ui-fabric-react'
import './style/Carousel.scss'

interface CarouselProps {
    loading: boolean
    toggleAnimal: (string) => void
}

const mapStateToProps = state => {
    return {
        loading: loadingSelector(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleAnimal: animal => dispatch(toggleAnimal(animal))
    }
}

class Carousel extends React.PureComponent<CarouselProps> {
    componentDidMount() {
        this.props.toggleAnimal('cats')
    }

    render() {
        const {loading} = this.props

        let loadingScreen = null
        if (loading) {
            loadingScreen = (
                <div className="loading-screen">
                    <Spinner size={SpinnerSize.large} />
                </div>
            )
        }
        return (
            <div className="carousel">
                <CarouselToggles />
                <CarouselSlide />
                {loadingScreen}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carousel)
