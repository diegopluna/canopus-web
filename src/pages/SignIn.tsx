import { useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast"
import starBottomLeft from "@/assets/StarBottomLeft.svg"
import starTopRight from "@/assets/StarTopRight.svg"
import canopusLogo from "@/assets/Canopus.svg"
import AuthContext from "@/context/AuthProvider";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EyeOff, Eye, Loader2 } from "lucide-react";






const formSchema = z.object({
    email: z.string().email({message: "E-mail deve ser um e-mail válido"}),
    password: z.string({
        required_error: "Senha é obrigatória",
        invalid_type_error: "Senha deve ser uma string"
    }).min(6, {
        message: "Senha deve ter pelo menos 6 caracteres"
    }).max(40 ,{
        message: "Senha deve ter no máximo 40 caracteres"
    }) 
})

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading , setLoading] = useState(false);
    const { toast } = useToast()

    const authContext = useContext(AuthContext)
    if (authContext === undefined) {
        return null
    }
    const { loginUser } = authContext;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true)
        const { email, password } = data;
        const response = await loginUser(email, password)
        if (response.status !== 200) {
            toast({
                variant: "destructive",
                description: response.message,
            })
        }
        setLoading(false)
        
        
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
                <div className="p-4 sm:p-10  mx-4 sm:mx-auto w-full sm:w-[400px] rounded-xl">
                    <h1 className="text-center text-3xl font-bold mb-4">
                        <img
                            alt="Logotipo"
                            className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center mx-auto"
                            height="140"
                            src={canopusLogo}
                            width="280"
                        />
                    </h1>
                    <Form {...form}>
                        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
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
                                                        required 
                                                        placeholder="Digite sua senha"
                                                        type={showPassword ? "text" : "password"}
                                                        {...field}
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
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {loading ? (
                                <Button className="w-full text-lg" type="submit" disabled>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Carregando...
                                </Button>)
                                :
                                <Button className="w-full text-lg" type="submit">
                                    Entrar
                                </Button>
                            }
                        </form>
                    </Form>
                    {/* <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label className="text-base" htmlFor="email">E-mail</Label>
                            <Input 
                                className="dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground" 
                                id="email"
                                name="email"
                                placeholder="Digite seu e-mail"
                                required 
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-base" htmlFor="password">Senha</Label>
                            <Input 
                                className="dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground" 
                                id="password" 
                                name="password"
                                required 
                                placeholder="Digite sua senha"
                                type="password" 
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <Button className="w-full text-lg" type="submit">
                            Entrar
                        </Button>
                    </form>     */}
                </div>  
                <Separator className="my-4 w-full sm:w-[400px] mx-auto dark:bg-[#FFFFFF]/50" /> 
                <div className="text-center">
                    <span className="dark:text-white text-lg">Não tem uma conta? <a className="dark:text-foreground" href="/signup">Inscreva-se</a></span>
                </div>
                <div className="my-8 text-center ">
                    <span className="dark:text-[#64748B] text-base">Esqueceu a senha? Entre em contato com nossos administradores através do e-mail<br />moderador@gmail.com</span>
                </div>
            </main>
            <Footer />
        </div>
    )
}