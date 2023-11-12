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
  import { useState, useMemo } from 'react';
  import { CircleFlag } from 'react-circle-flags'




export default function Footer() {    
    const {t, i18n} = useTranslation(['footer']);
    const {t: s} = useTranslation(["language-toggle"]);

    const flags: { [key: string]: string } = useMemo(() => ({
        en: 'gb',
        es: 'es',
        fr: 'fr',
        pt: 'br',
    }), []);

    const [trigger, setTrigger] = useState(flags[i18n.language.split('-')[0]]);

    const changeLanguage = (language:string) => {
        i18n.changeLanguage(language);
        setTrigger(flags[language]);
    }


    


    return (
        <footer className="py-3 px-4 text-center dark:bg-accent dark:text-accent-foreground z-30">
                <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
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
                        <Sheet>
                            <SheetTrigger className='text-sm text'>
                                <CircleFlag countryCode={trigger} style={{width: '20px', height: '20px'}} />
                            </SheetTrigger>
                            <SheetContent className='space-y-2'>
                                <SheetHeader>
                                    <SheetTitle>{s("message")}</SheetTitle>
                                </SheetHeader>
                                <RadioGroup className='space-y-2' defaultValue={i18n.language.split('-')[0]} onValueChange={changeLanguage}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="en" id="en" />
                                        <CircleFlag countryCode={flags['en']} style={{width: '20px', height: '20px'}} />
                                        <Label htmlFor="en"> English</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="es" id="es" />
                                        <CircleFlag countryCode={flags['es']} style={{width: '20px', height: '20px'}} />
                                        <Label htmlFor="es"> Español</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="fr" id="fr" />
                                        <CircleFlag countryCode={flags['fr']} style={{width: '20px', height: '20px'}} />
                                        <Label htmlFor="fr"> Français</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="pt" id="pt" />
                                        <CircleFlag countryCode={flags['pt']} style={{width: '20px', height: '20px'}} />
                                        <Label htmlFor="pt"> Português</Label>
                                    </div>
                                </RadioGroup>
                            </SheetContent>
                        </Sheet>
                    </div>              
                </div>
            </footer>
    )
}