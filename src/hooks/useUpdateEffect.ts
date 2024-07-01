import { useRef, useEffect } from "react"

/**
 *  This hook is used to run an effect only when the component is updated, and not on the initial render.
 * @param callback 
 * @param dependencies 
 */
const useUpdateEffect = (callback: Function, dependencies: any[]) => {
    const firstRenderRef = useRef(true)

    useEffect(() => {
        if(firstRenderRef.current) {
            firstRenderRef.current = false
            return
        }

        return callback()
    }, dependencies)
}

export default useUpdateEffect