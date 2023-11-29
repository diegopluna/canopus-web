import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AuthContext from "@/context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as z from "zod"
import { useForm } from "react-hook-form"
import { MultiSelect } from "@/components/ui/multi-select";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl,FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Inputmask from "inputmask";
import useAxios from "@/utils/useAxios";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
    fullName: z.string().min(5, {
        message: "Nome completo deve ter pelo menos 5 caracteres"
    }).max(100 ,{
        message: "Nome completo deve ter no máximo 100 caracteres"
    }),
    email: z.string().email({
        message: "E-mail deve ser um e-mail válido"
    }).max(255, {
        message: "E-mail deve ter no máximo 255 caracteres"
    }),
    phoneNumber: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
        message: "Telefone deve ser um telefone válido"
    }),
    interests: z.array(z.record(z.string())).min(1 , {
        message: "Selecione pelo menos um interesse"
    }),
    userRole: z.string({
        required_error: "Selecione o tipo de usuário.",
      })
});

export default function AdminPanel() {
    const [loading , setLoading] = useState(false);

    const api = useAxios(); 
    const { toast } = useToast()


    const goals = [
        {
            value: "INFRASTRUCTURE_IMPROVEMENT",
            label: "Melhoria da Infraestrutura"
        },
        {
            value: "AFTER_SCHOOL_ACTIVITIES",
            label: "Atividades pós-escola"
        },
        {
            value: "EDUCATIONAL_ENRICHMENT",
            label: "Enriquecimento Educacional"
        },
        {
            value: "COMMUNITY_OUTREACH",
            label: "Alcance Comunitário"
        },
        {
            value: "GREEN_INITIATIVES",
            label: "Iniciativas Verdes"
        },
        {
            value: "TECHNOLOGY_ENHANCEMENT",
            label: "Aprimoramento Tecnológico"
        },
        {
            value: "READING_PROGRAM",
            label: "Programa de Leitura"
        },
        {
            value: "SPORTS_DEVELOPMENT",
            label: "Desenvolvimento Esportivo"
        },
        {
            value: "HEALTH_AND_NUTRITION",
            label: "Saúde e Nutrição"
        },
        {
            value: "ARTS_AND_CULTURE",
            label: "Artes e Cultura"
        },
        {
            value: "PARENTAL_INVOLVEMENT",
            label: "Envolvimento dos Pais"
        },
        {
            value: "LANGUAGE_PROGRAM",
            label: "Programa de Idiomas"
        },
        {
            value: "SCHOOL_SUPPLY_DRIVE",
            label: "Campanha de Material Escolar"
        },
        {
            value: "CAREER_GUIDANCE",
            label: "Orientação Profissional"
        },
        {
            value: "STEM_INITIATIVES",
            label: "Iniciativas STEM"
        },
        {
            value: "SPECIAL_EDUCATION_SUPPORT",
            label: "Apoio à Educação Especial"
        },
        {
            value: "TUTORING",
            label: "Aulas de Reforço"
        }
    ]

    const navigate = useNavigate();

    const authContext = useContext(AuthContext)
    if (authContext === undefined) {
        return null
    }
    const { user } = authContext;
    if (user?.role != "ADMINISTRADOR") {
        navigate("/")
    }


    useEffect(() => {
        const phoneNumberMask = new Inputmask("(99) 99999-9999", {
            showMaskOnHover: false,
        });

        const phoneNumberElement = document.getElementById("phoneNumber");
        if (phoneNumberElement) {
            phoneNumberMask.mask(phoneNumberElement);
        }
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            interests: [],
        },
    })

    

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setLoading(true);
        const postData = {
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phoneNumber.replace("(", "").replace(")", "").replace("-", "").replace(" ", ""),
            interests: data.interests.map((interest) => interest.value),
            userRole: data.userRole
        }
        await api?.post("/admin/create", postData)
                        .then((response) => {
                            console.log(response)
                            if (response.status === 201) {
                                toast({
                                    description: "Conta criada com sucesso!",
                                });
                            }
                        })
                        .catch((error: Error | AxiosError) => {
                            console.log(error)
                            if (axios.isAxiosError(error)) {
                                toast({
                                    variant: "destructive",
                                    description: error.message,
                                });
                            } else {
                                toast({
                                    variant: "destructive",
                                    description: "Não foi possível se conectar ao servidor.",
                                });
                            }
                        })

        setLoading(false);
        form.reset()
        console.log(postData);

    }

    return (
        <div className="flex items-center justify-center h-screen ">
            <Card className="w-full max-w-xl space-y-6 dark:bg-secondary">
                <CardHeader>
                <div className="flex items-center space-x-3">
                    <div className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Criar novo usuário</CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">Preencha os dados abaixo</CardDescription>
                    </div>
                </div>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">Nome Completo</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    className="dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground" 
                                                    placeholder="Digite o nome completo"
                                                    {...field} 
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">E-mail</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    className="dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground" 
                                                    placeholder="Digite o e-mail" 
                                                    {...field} 
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} 
                                />
                            </div>
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">Telefone</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    className="dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground" 
                                                    placeholder="Digite o telefone"
                                                    id="phoneNumber"
                                                    {...field} 
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="interests"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">Área de atuação</FormLabel>
                                            <FormControl>
                                                <MultiSelect
                                                    selected={field.value}
                                                    options={goals}
                                                    {...field}                                                   
                                                    className = "dark:bg-muted/30 dark:border-input/30 text-primary-foreground dark:text-primary-foreground"
                                                    placeholder="Selecione as áreas de atuação"                                                 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="userRole"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipo de usuário</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione um tipo de usuário" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                    <SelectItem value="ADMINISTRATOR">Administrador</SelectItem>
                                                    <SelectItem value="EMBAIXADOR">Embaixador</SelectItem>
                                                    <SelectItem value="REP_ESCOLA">Representate Escolar</SelectItem>
                                                    <SelectItem value="VOLUNTARIO">Voluntario</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )} 
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            {loading ? (
                                <Button className="w-full text-lg" type="submit" disabled>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Carregando...
                                </Button>)
                                :
                                <Button className="w-full text-lg" type="submit">
                                    Criar usuário
                                </Button>
                            }
                        </CardFooter>
                    </form>
                    {/* <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectItem value="ADMINISTRATOR">Administrador</SelectItem>
                            <SelectItem value="EMBAIXADOR">Embaixador</SelectItem>
                            <SelectItem value="REP_ESCOLA">Representate Escolar</SelectItem>
                            <SelectItem value="VOLUNTARIO">Voluntario</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                    </div>
                    </CardContent> */}
                    {/* <CardFooter>
                    <Button className="w-full" type="submit">
                        Create Admin
                    </Button>
                    </CardFooter> */}
                </Form>
            </Card>
        </div>
    )
}