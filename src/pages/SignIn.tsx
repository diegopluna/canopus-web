import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import { Separator } from "@/components/ui/separator";



export default function SignIn() {
    return (
        <div key="1" className="min-h-screen flex flex-col justify-between">
            <img
                alt="Background Image Top Right"
                className="absolute top-0 right-0 h-[438px] w-[457px] object-cover z-10"
                src="/StarTopRight.svg"
            />
            <img
                alt="Background Image Bottom Left"
                className="absolute bottom-0 left-0 h-[580px] w-[628px] object-cover z-10"
                src="/StarBottomLeft.svg"
            />
            <main className="flex flex-col justify-center sm:py-12 z-20">
                <div className="p-4 sm:p-10  mx-auto w-full sm:w-[400px] rounded-xl">
                    <h1 className="text-center text-3xl font-bold mb-4">
                        <img
                            alt="Logo"
                            className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center mx-auto"
                            height="140"
                            src="/Canopus.svg"
                            width="280"
                        />
                    </h1>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-base" htmlFor="email">E-mail</Label>
                            <Input className="dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground" id="email" required type="email" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-base" htmlFor="password">Senha</Label>
                            <Input className="dark:bg-muted/30 dark:border-input/30 dark:text-primary-foreground" id="password" required type="password" />
                        </div>
                        <Button className="w-full text-lg" type="submit">
                            Entrar
                        </Button>
                    </div>    
                </div>  
                <Separator className="my-4 w-full sm:w-[400px] mx-auto dark:bg-[#FFFFFF]/50" /> 
                <div className="text-center">
                    <span className="dark:text-white text-lg">Não possui conta? <a className="dark:text-foreground" href="#">Cadastre-se</a></span>
                </div>
                <div className="my-8 text-center ">
                    <span className="dark:text-[#64748B] text-base">Esqueceu sua senha? Contate nossos moderadores pelo e-mail<br />moderador@gmail.com</span>
                </div>
            </main>
            <Footer />
        </div>
    )
}