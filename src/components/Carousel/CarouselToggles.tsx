import * as React from 'react'
import {connect} from 'react-redux'
import {Map} from 'immutable'

import {toggleStatusSelector} from '@store/Carousel/Carousel.selectors'
import {toggleAnimal} from '@store/Carousel/Carousel.actions'

import {DefaultButton} from 'office-ui-fabric-react'
import './style/CarouselToggle.scss'

interface CarouselTogglesProps {
    toggleStatus: Map<string, boolean>
    toggleAnimal: (string) => void
}

const mapStateToProps = state => {
    return {
        toggleStatus: toggleStatusSelector(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleAnimal: animal => dispatch(toggleAnimal(animal))
    }
}

const CarouselToggles: React.SFC<CarouselTogglesProps> = props => {
    const {toggleStatus, toggleAnimal} = props

    return (
        <div className="carousel-toggles">
            <DefaultButton
                className="carousel-toggles--button"
                primary={toggleStatus.get('sharks')}
                onClick={() => toggleAnimal('sharks')}
                text="Sharks"
            />
            <DefaultButton
                className="carousel-toggles--button"
                primary={toggleStatus.get('cats')}
                onClick={() => toggleAnimal('cats')}
                text="Cats"
            />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CarouselToggles)
