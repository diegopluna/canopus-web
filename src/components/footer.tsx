import { useTranslation} from 'react-i18next';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
  import { Label } from "@/components/ui/label"




export default function Footer() {
    const {t, i18n} = useTranslation(['footer']);
    const {t: s} = useTranslation(["language-toggle"]);

    const changeLanguage = (language:string) => {
        i18n.changeLanguage(language);
        console.log(`Current language: ${i18n.language}`);
    }

    const flags: { [key: string]: string } = {
        en: '🇬🇧',
        es: '🇪🇸',
        fr: '🇫🇷',
        pt: '🇧🇷',
    };

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
                        <a className="text-sm text" href="#">
                            Language
                        </a>
                        <Sheet>
                            <SheetTrigger className='text-sm text'>{flags[i18n.language]}</SheetTrigger>
                            <SheetContent className='space-y-2'>
                                <SheetHeader>
                                    <SheetTitle>{s("message")}</SheetTitle>
                                </SheetHeader>
                                <RadioGroup className='space-y-2' defaultValue={i18n.language} onValueChange={changeLanguage}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="en" id="en" />
                                        <Label htmlFor="en">{flags['en']} English</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="es" id="es" />
                                        <Label htmlFor="es">{flags['es']} Español</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="fr" id="fr" />
                                        <Label htmlFor="fr">{flags['fr']} Français</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="pt" id="pt" />
                                        <Label htmlFor="pt">{flags['pt']} Português</Label>
                                    </div>
                                </RadioGroup>
                            </SheetContent>
                        </Sheet>
                    </div>              
                </div>
            </footer>
    )
}