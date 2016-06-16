/**
 * Created by bll on 16/5/31.
 */
export const OPEN_SLIDER='openSlider';
export const CLOSE_SLIDER='closeSlider';
export function openSlider(){
    return {
        type:OPEN_SLIDER
    }
}
export function closeSlider(){
    return {
        type:CLOSE_SLIDER
    }
}