import starBottomLeft from "@/assets/StarBottomLeft.svg"
import starTopRight from "@/assets/StarTopRight.svg"
import { useToast } from "@/components/ui/use-toast"
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Footer from "@/components/footer";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, EyeOff, Loader2, User2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



const formSchema = z.object({
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
    }),
    avatar: z.any().refine(value => value && value[0 && ['image/jpg', 'image/jpeg', 'image/png'].includes(value[0].type)], {
        message: "Formato não suportado",
    }),
})


export default function VerifyCreate() {
    const { toast } = useToast()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const navigate = useNavigate();

    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [neighbourhood, setNeighbourhood] = useState("");
    const [street, setStreet] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [avatarImage, setAvatarImage] = useState("");
    const [loading , setLoading] = useState(false);


    useEffect(() => {

        const cepMask = new Inputmask("99999-999", {
            showMaskOnHover: false,
        });
        const cepElement = document.getElementById("cep");
        if (cepElement) {
            cepMask.mask(cepElement);
        }
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
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

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const domain: string  = window.location.hostname === "localhost" ? "http://localhost:8080" : "https://api-canopus.dpeter.tech"
        console.log(data);
        setLoading(true);
        const postData = {
            cep: data.cep,
            streetNumber: Number(data.streetNumber),
            complement: data.complement,
            password: data.password,
            avatar: avatarImage
        }
        await axios.post(`${domain}/auth/verify_create?code=${code}`, postData)
            .then((response) => {
                if (response.status === 200) {
                    navigate("/signin")
                    toast({
                        description: response.data.message,
                    })
                }
            })
            .catch((error: Error | AxiosError) => {
                toast({
                    variant: "destructive",
                    title: "Erro",
                    description: error.message,
                })
            })
        setLoading(false);

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
            <main className="flex flex-col justify-center sm:py-12 z-20">
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
                            <div className="grid grid-cols-2 gap-4">
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
                                    Completar cadastro
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