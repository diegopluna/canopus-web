import starBottomLeft from "@/assets/StarBottomLeft.svg"
import starTopRight from "@/assets/StarTopRight.svg"
import Footer from "@/components/footer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/AuthProvider";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Inputmask from "inputmask";
import { AlertDialog, 
    AlertDialogAction, 
    AlertDialogDescription,
    AlertDialogContent, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle } 
    from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { EyeOff, Eye, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";



const formSchema = z.object({
    fullName: z.string().min(5, {
        message: "Nome completo deve ter pelo menos 5 caracteres"
    }).max(100 ,{
        message: "Nome completo deve ter no máximo 100 caracteres"
    }),
    avatar: z.any().refine(value => value && value[0 && ['image/jpg', 'image/jpeg', 'image/png'].includes(value[0].type)], {
        message: "Formato não suportado",
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
    cep: z.string().regex(/^\d{5}-\d{3}$/, {
        message: "CEP deve ser um CEP válido"
    }),
    streetNumber: z.string({
        required_error: "Número da rua é obrigatório",
        invalid_type_error: "Número da rua deve ser um número"
    }).regex(/^\d+$/, {
        message: "Número da rua deve ser um número"
    }),
    complement: z.string({
        invalid_type_error: "Complemento deve ser uma string"
    }),
    password: z.string({
        required_error: "Senha é obrigatória",
        invalid_type_error: "Senha deve ser uma string"
    }).min(6, {
        message: "Senha deve ter pelo menos 6 caracteres"
    }).max(40 ,{
        message: "Senha deve ter no máximo 40 caracteres"
    }),
    passwordConfirm: z.string({
        required_error: "Confirmar senha é obrigatório",
        invalid_type_error: "Confirmar senha deve ser uma string"
    }).min(6, {
        message: "Confirmar senha deve ter pelo menos 6 caracteres"
    }).max(40 ,{
        message: "Confirmar senha deve ter no máximo 40 caracteres"
    })

});

export default function SignUp() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [neighbourhood, setNeighbourhood] = useState("");
    const [street, setStreet] = useState(""); 
    const [loading , setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertDescription, setAlertDescription] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [avatarImage, setAvatarImage] = useState("");


    const navigate = useNavigate();


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

    useEffect(() => {
        const checkScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
    
        window.addEventListener('scroll', checkScroll);
    
        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    }, []);

    useEffect(() => {
        const phoneNumberMask = new Inputmask("(99) 99999-9999", {
            showMaskOnHover: false,
        });

        const cepMask = new Inputmask("99999-999", {
            showMaskOnHover: false,
        });

        const phoneNumberElement = document.getElementById("phoneNumber");
        const cepElement = document.getElementById("cep");
        if (phoneNumberElement) {
            phoneNumberMask.mask(phoneNumberElement);
        }
        if (cepElement) {
            cepMask.mask(cepElement);
        }
    }, []);

    


    


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            interests: [],
            cep: "",
            streetNumber: "",
            complement: "",
            password: "",
            passwordConfirm: ""
        },
    })


    const cep = form.watch("cep");
    const password = form.watch("password");
    const passwordConfirm = form.watch("passwordConfirm");

    useEffect(() => {
        if (passwordConfirm !== password) {
            form.setError("passwordConfirm", {
                type: "manual",
                message: "Senhas devem ser iguais"
            });
        } else {
            form.clearErrors("passwordConfirm");
        }
    }, [form, password, passwordConfirm]);

    useEffect(() => {
        const cepNumber = cep.replace("-", "").replace("_", "");
        if (cepNumber.length === 8) {
            fetch(`https://viacep.com.br/ws/${cepNumber}/json/`)
            .then(response => response.json())
            .then(data => {
                setState(data.uf);
                setCity(data.localidade);
                setNeighbourhood(data.bairro);
                setStreet(data.logradouro);
            })
            .catch(error => {
                console.error(error);
            });
        } else {
            setState("");
            setCity("");
            setNeighbourhood("");
            setStreet("");
        }
    }, [cep]);


    const authContext = useContext(AuthContext)
    if (authContext === undefined) {
        return null
    }

    const { registerUser } = authContext;



    async function onSubmit(data: z.infer<typeof formSchema>) {

        console.log(data);
        setLoading(true);
        const postData = {
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phoneNumber.replace("(", "").replace(")", "").replace("-", "").replace(" ", ""),
            interests: data.interests.map((interest) => interest.value),
            cep: data.cep,
            streetNumber: Number(data.streetNumber),
            complement: data.complement,
            password: data.password,
            avatar: avatarImage
        }
        const response = await registerUser(postData);
        setLoading(false);

        if (response.status === 201) {
            setAlertTitle("Cadastro realizado com sucesso!");
            setAlertDescription("Para confirmar sua conta, clique no link enviado no email de verificação que foi enviado para seu email.");
        } else {
            setAlertTitle("Erro!");

            if (response.message === "") {
                setAlertDescription("Ocorreu um erro ao tentar realizar o cadastro. Tente novamente mais tarde.");
            } else {
                setAlertDescription(response.message);
            }
            
        }

        setOpenAlert(true);

        console.log(postData);
    }


    function dismissAlert() {
        if (alertTitle === "Cadastro realizado com sucesso!") {
            navigate("/signin");
        }
        setOpenAlert(false);
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setAvatarImage(reader.result as string);
            }

            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            setAvatarImage("");
        }
 
    }


    return (
        <div key="1" className="min-h-screen flex flex-col justify-between relative">
            <img
                alt="Imagem de fundo no canto superior direito"
                className="hidden lg:block absolute top-0 right-0 h-[438px] w-[457px] object-cover z-10"
                src={starTopRight}
            />
            <img
                alt="Imagem de fundo no canto inferior esquerdo"
                className="hidden lg:block absolute bottom-0 left-0 h-[580px] w-[628px] object-cover z-10"
                src={starBottomLeft}
            />
            <nav className={`sticky top-0 z-50 backdrop-filter p-4 transition-all duration-200 ease-in-out ${isScrolled ? 'bg-primary' : 'bg-transparent'}`}>
                <div className="container mx-auto flex justify-between items-center">
                    <span className="text-xl font-bold">
                        Canopus
                    </span>
                    <div className="space-x-4">
                        <Button variant='outline' className="text-lg" asChild>
                           <a href="/signin">Entrar</a> 
                        </Button>
                    </div>
                </div>
            </nav>
            <main className="flex flex-col justify-center sm:py-12 z-20">
                <AlertDialog open={openAlert}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
                            <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction onClick={() => dismissAlert()}>Ok</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <div className="p-4 sm:p-10  mx-4 sm:mx-auto w-full sm:w-[600px] rounded-xl">
                    <h1 className="text-center text-3xl font-bold mb-4">
                        <Avatar className="overflow-hidden rounded-lg object-contain object-center mx-auto w-36 h-36">
                            <AvatarFallback>
                                <User2 height="120" width="120"/>
                            </AvatarFallback>
                            <AvatarImage style={{ borderRadius: '50%' }} src={avatarImage} />
                        </Avatar>
                    </h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <div className="grid grid-cols-2 gap-4">
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
                                                        placeholder="Digite seu nome completo"
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
                                        name="avatar"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base">Foto de Perfil</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        className="dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground" 
                                                        {...field} 
                                                        type="file"
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            handleFileUpload(e);
                                                          }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
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
                                                        placeholder="Digite seu e-mail" 
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
                                                        placeholder="Digite seu telefone"
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
                            </div>
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="interests"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">Interesses</FormLabel>
                                            <FormControl>
                                                <MultiSelect
                                                    selected={field.value}
                                                    options={goals}
                                                    {...field}                                                   
                                                    className = "dark:bg-muted/30 dark:border-input/30 text-primary-foreground dark:text-primary-foreground"
                                                    placeholder="Selecione seus interesses"                                                 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="cep"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base">CEP</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        className="dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground" 
                                                        placeholder="Digite seu CEP" 
                                                        id="cep"
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
                                    <Label className="text-base" htmlFor="state">Estado</Label>
                                    <Input 
                                        className="dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground" 
                                        id="state"
                                        name="state"
                                        disabled
                                        value={state}
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">                           
                                    <Label className="text-base" htmlFor="city">Cidade</Label>
                                    <Input 
                                        className="dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground" 
                                        id="city"
                                        name="city"
                                        disabled 
                                        value={city}
                                        type="text"
                                    />
                                </div>
                                <div className="space-y-2">                                    
                                    <Label className="text-base" htmlFor="neighbourhood">Bairro</Label>
                                    <Input 
                                        className="dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground" 
                                        id="neighbourhood"
                                        name="neighbourhood"
                                        disabled 
                                        value={neighbourhood}
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">                                    
                                    <Label className="text-base" htmlFor="street">Rua</Label>
                                    <Input 
                                        className="dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground" 
                                        id="street"
                                        name="street"
                                        disabled 
                                        value={street}
                                        type="text"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="streetNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base">Número</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        className="dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground" 
                                                        placeholder="Digite o número do seu endereço"
                                                        {...field}    
                                                        required                                            
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="complement"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base">Complemento</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    className="dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground" 
                                                    placeholder="Digite o complemento do seu endereço"
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base">Senha</FormLabel>
                                                <FormControl>
                                                <div className="relative">
                                                <Input 
                                                        className="dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground" 
                                                        placeholder="Digite sua senha" 
                                                        {...field} 
                                                        type={showPassword ? "text" : "password"}
                                                        required

                                                    />
                                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                                                        {showPassword ? (
                                                            <Eye className="h-4 w-4" onClick={() => setShowPassword(false)} />
                                                        ) : (
                                                            <EyeOff className="h-4 w-4" onClick={() => setShowPassword(true)} />
                                                        )}
                                                    </div>
                                                </div>
                                                    
                                                </FormControl>
                                                <FormDescription>A senha deve conter entre 6 e 40 caracteres</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="passwordConfirm"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-base">Confirme sua senha</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input 
                                                            className="dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground" 
                                                            placeholder="Confirme sua senha" 
                                                            {...field} 
                                                            type={showPasswordConfirm ? "text" : "password"}
                                                            required
                                                        />
                                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                                                            {showPasswordConfirm ? (
                                                                <Eye className="h-4 w-4" onClick={() => setShowPasswordConfirm(false)} />
                                                            ) : (
                                                                <EyeOff className="h-4 w-4" onClick={() => setShowPasswordConfirm(true)} />
                                                            )}
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            {loading ? (
                                <Button className="w-full text-lg" type="submit" disabled>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Carregando...
                                </Button>)
                                :
                                <Button className="w-full text-lg" type="submit">
                                    Cadastrar
                                </Button>
                            }
                        </form>
                    </Form>
                    
                </div>
            </main>
            <Footer />
        </div>
    )
}