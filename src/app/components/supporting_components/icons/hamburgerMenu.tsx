import { Dispatch, SetStateAction } from "react"

interface hamburgerMenuProps {
    actionSet?: Dispatch<SetStateAction<boolean>>
    actionState?: boolean
}

export default function HamburgerMenu(props: hamburgerMenuProps) {
    const { actionSet, actionState } = props

    function onClickFunction() {
        if (actionState!==undefined && actionSet) {
            actionSet(!actionState)
        }
    }
    return (
        <svg width="24" id="hamburger" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={`md:hidden cursor-pointer ml-4`}
            onClick={() => onClickFunction()}>
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>)
}