import * as actionType from './Carousel.actionTypes'

export const toggleAnimal = (animal: string) => ({
    type: actionType.CAROUSEL_TOGGLE_ANIMAL,
    payload: {
        animal: animal
    }
})

export const setToggleStatus = (animal: string) => ({
    type: actionType.CAROUSEL_SET_TOGGLE_STATUS,
    payload: {
        animal: animal
    }
})

export const setImageList = (list: string[]) => ({
    type: actionType.CAROUSEL_SET_LIST,
    payload: {
        list: list
    }
})

export const selectNext = () => ({
    type: actionType.CAROUSEL_NEXT
})

export const selectPrev = () => ({
    type: actionType.CAROUSEL_PREV
})
