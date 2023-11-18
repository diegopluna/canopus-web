import React, { useState, useContext } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast"
import starBottomLeft from "@/assets/StarBottomLeft.svg"
import starTopRight from "@/assets/StarTopRight.svg"
import canopusLogo from "@/assets/Canopus.svg"
import AuthContext from "@/context/AuthProvider";

interface FormValues {
    email: string;
    password: string;
}

export default function SignIn() {
    const { toast } = useToast()
    const [formData, setFormData] = useState<FormValues>({
        email: "",
        password: "",
    });

    const authContext = useContext(AuthContext)
    if (authContext === undefined) {
        return null
    }
    const { loginUser } = authContext;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // const domain: string  = window.location.hostname === "localhost" ? "http://localhost:8080" : "https://canopus-api.dpeter.tech"
        const { email} = formData;
        loginUser(email)
        toast({
            description: "logado",
        })
        
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

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
                    <form className="space-y-4" onSubmit={handleSubmit}>
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
                    </form>    
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