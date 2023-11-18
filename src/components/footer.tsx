export default function Footer() {    

    return (
        <footer className="py-3 px-4 text-center dark:bg-accent dark:text-accent-foreground z-30">
                <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                    <span className="text-sm  text">
                        ©Copyright 2023 Jade
                    </span>
                    <div className="flex space-x-4">
                        <a className="text-sm text" href="#">
                            Política de Privacidade
                        </a>
                        <a className="text-sm text" href="#">
                            Termos e Condições
                        </a>
                        <a className="text-sm text" href="#">
                            Política de Cookies
                        </a>
                        <a className="text-sm text" href="#">
                            Contato
                        </a>
                    </div>              
                </div>
            </footer>
    )
}