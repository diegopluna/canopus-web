import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SchoolType } from "@/lib/responseTypes";
import useAxios from "@/utils/useAxios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function AllSchools() {
    const [loading, setLoading] = useState(true)
    const [schools, setSchool] = useState<SchoolType[]>([])

    const api = useAxios();

    useEffect(() => {
        async function getProjects() {
            const res = await api?.get("/school/all")
            if (res?.status === 200) {
                setSchool(res.data)
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
                {schools.map((school, index) => (
                    <Card className="bg-secondary" key={index}>
                        <CardHeader>
                            <CardTitle>Projeto do {school.name}</CardTitle>
                            <CardDescription>
                                {school.type}
                                <br/>
                                {school.address.municipality}
                            </CardDescription>
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