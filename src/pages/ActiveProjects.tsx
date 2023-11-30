import { CardTitle, CardDescription, CardHeader, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ProjectType } from "@/lib/responseTypes";
import useAxios from "@/utils/useAxios";



export default function ActiveProjects() {
    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useState<ProjectType[]>([])

    const api = useAxios();

    useEffect(() => {
        async function getProjects() {
            const res = await api?.get("/project/stakeholder")
            if (res?.status === 200) {
                setProjects(res.data)
                setLoading(false)
            }      
        }
        getProjects()
    }, [])


    return loading ? (
        <main className="flex flex-col justify-center sm:py-12 z-20">
            <div className="p-4 sm:p-10  mx-4 sm:mx-auto w-full sm:w-[400px] rounded-xl flex justify-center items-center">
                <h1 className="text-center text-3xl font-bold mb-4">
                    <Loader2 className="animate-spin mr-2" size={48} />
                </h1>
            </div>
        </main>
    ):(
        <div className="overflow-auto h-screen p-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                    <Card className="bg-secondary" key={index}>
                        <CardHeader>
                            <CardTitle>Projeto do {project.school.name}</CardTitle>
                            <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button variant="outline">Ver mais</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}