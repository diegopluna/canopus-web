export default function Footer() {
    return (
        <footer className="py-3 px-4 text-center dark:bg-accent dark:text-accent-foreground z-30">
                <div className="flex justify-between space-x-4">
                    <span className="text-sm  text">
                        Copyright 2022 Jade.
                    </span>
                    <div className="flex space-x-4">
                        <a className="text-sm text" href="#">
                            Privacy Policy
                        </a>
                        <a className="text-sm text" href="#">
                            Terms & Conditions
                        </a>
                        <a className="text-sm text" href="#">
                            Cookie Policy
                        </a>
                        <a className="text-sm text" href="#">
                            Contact
                        </a>
                    </div>              
                </div>
            </footer>
    )
}