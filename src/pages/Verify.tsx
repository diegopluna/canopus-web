import starBottomLeft from "@/assets/StarBottomLeft.svg"
import starTopRight from "@/assets/StarTopRight.svg"
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import Footer from "@/components/footer";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom";




export default function Verify() {
    const { toast } = useToast()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const navigate = useNavigate();

    

    useEffect(() => {
        const verifyCode = async () => {
            const domain: string  = window.location.hostname === "localhost" ? "http://localhost:8080" : "https://canopus-api.dpeter.tech"
            if (code) {
                await axios.post(`${domain}/auth/verify?code=${code}`)
                    .then((response) => {
                        if (response.status === 200) {
                            toast({
                                description: response.data.message,
                            })
                        } else {
                            toast({
                                variant: "destructive",
                                title: "Erro",
                                description: response.data.message,
                            })
                        }
                    })
                    .catch((error) => {
                        toast({
                            variant: "destructive",
                            title: "Erro",
                            description: error.response.data.message,
                        })
                    })
                
                navigate("/signin");
              
            } else {
                toast({
                    variant: "destructive",
                    title: "Erro",
                    description: "Código de verificação inválido",
                })
                navigate("/signin");
            }
          }
        
          verifyCode();
    }, [code, navigate, toast])
    


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
                <div className="p-4 sm:p-10  mx-4 sm:mx-auto w-full sm:w-[400px] rounded-xl flex justify-center items-center">
                    <h1 className="text-center text-3xl font-bold mb-4">
                        <Loader2 className="animate-spin mr-2" size={48} />
                    </h1>
                </div>
            </main>
            <Footer />
        </div>
    )
}