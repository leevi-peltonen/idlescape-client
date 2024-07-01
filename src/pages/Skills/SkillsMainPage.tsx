import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import NotFoundPage from "../NotFound/NotFoundPage";

const SkillsMainPage = () => {
    const { skill } = useParams();
    const [skillComponent, setSkillComponent] = useState<React.ReactNode | null>(null)

    useEffect(() => {
        const importSkillPage = async () => {
            try {
                const { default: SkillComponent } = await import(`./${skill}/${skill}Page.tsx`)
                setSkillComponent(<SkillComponent />)
            } catch (error) {
                
                setSkillComponent(<NotFoundPage/>)
            }
        }

        if(skill) {
            importSkillPage()
        }
    }, [skill])



    return (
        <>
            {skillComponent}
        </>
    );
}

export default SkillsMainPage;
