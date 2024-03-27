import { toast } from "@/components/ui/use-toast";
import backendUrls from "@/constants/backendUrls";
import useFetchSettings from "@/hooks/settings/useFetchSettings";
import Settings from "@/models/settings/settings.model";
import axios, { AxiosError } from "axios";
import { HtmlHTMLAttributes, createContext } from "react";

interface SettingsContextModel {
    data: Settings | null,
    notFound: boolean | null,
    onSubmit: (dataObject: Settings) => void
}

export const SettingsContext = createContext<SettingsContextModel>({} as SettingsContextModel);


export default function SettingsContextProvider({ children }: HtmlHTMLAttributes<HTMLDivElement>) {
    const { data, error, loading, notFound, refresh } = useFetchSettings(backendUrls.settings);

    const onSettingsSubmit = (dataObject: Settings) => {
        if (notFound && data === null) {
            axios.post(backendUrls.settings, dataObject)
                .then((res) => {

                    toast({
                        title: "Settings saved successfully."
                    })
                }).catch((e: AxiosError) => {
                    if (e.response) {
                        toast({
                            title: "Error"
                        })
                    }
                }).then(() => refresh())
        } else {
            axios.put(backendUrls.settings, dataObject)
                .then((res) => {
                    toast({
                        title: "Settings updated successfully."
                    })
                }).catch((e: AxiosError) => {
                    if (e.response) {
                        toast({
                            title: "Error"
                        })
                    }
                }).then(() => refresh())
        }

    }

    const settingsContextData: SettingsContextModel = { data, onSubmit: onSettingsSubmit, notFound: notFound }



    return <SettingsContext.Provider value={settingsContextData}>
        {children}
    </SettingsContext.Provider>
}