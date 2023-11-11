import { useTranslation} from 'react-i18next';



export default function Footer() {
    const {t} = useTranslation(['footer']);

    return (
        <footer className="py-3 px-4 text-center dark:bg-accent dark:text-accent-foreground z-30">
                <div className="flex justify-between space-x-4">
                    <span className="text-sm  text">
                        {t("copyright")}
                    </span>
                    <div className="flex space-x-4">
                        <a className="text-sm text" href="#">
                            {t("privacy")}
                        </a>
                        <a className="text-sm text" href="#">
                            {t("terms")}
                        </a>
                        <a className="text-sm text" href="#">
                            {t("cookies")}
                        </a>
                        <a className="text-sm text" href="#">
                            {t("contact")}
                        </a>
                    </div>              
                </div>
            </footer>
    )
}