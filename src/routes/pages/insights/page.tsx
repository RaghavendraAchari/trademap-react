'use client';
import useFetchInsights from "@/hooks/insights/useFetchInsights";
import backendUrls from "@/constants/backendUrls";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Loading from "@/components/loading/loading";
import Insight from "@/models/insights/Insight.model";
import { useState } from "react";
import AskForSelectAnItem from "@/components/insights/askForSelectAnItem";
import InsightView from "@/components/insights/InsightView";
import TopicsView from "@/components/insights/topicsView";
import DisplayHeader from "@/components/commons/DisplayHeader";

export default function Insights() {

    const { data, loading, error, refresh } = useFetchInsights(backendUrls.insights.allInsights);
    const [selectedItem, setSelectedItem] = useState<Insight>();

    //for mobile
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    return (
        <>
            <DisplayHeader title="Insights" description="Includes all the learning and observations from the trade history." className='flex-none bg-background p-3' />
            <div className='md:grow grid grid-rows-none grid-cols-1 md:grid-cols-[30%,70%] md:grid-rows-1 md:max-h-full divide-x md:overflow-y-auto'>
                <div data-listpane className='grow w-full h-full md:max-h-full p-2'  >
                    {error && <Alert>
                        <Terminal />
                        <AlertTitle>Something went wrong.</AlertTitle>
                        <AlertDescription>Unable to fetch insights</AlertDescription>
                    </Alert>}
                    {loading && <Loading />}
                    {
                        (!loading && !error)
                            ? <TopicsView
                                data={data}
                                onDataSubmit={refresh}
                                onItemClick={(item: Insight) => { setSelectedItem(item); setOpenDrawer(true) }}
                                selectedItem={selectedItem}
                            />
                            : null
                    }
                </div>
                <div data-contentpane className='grow flex flex-row w-full h-full md:max-h-full p-2' >
                    {
                        selectedItem
                            ? <InsightView
                                closeWindow={() => {
                                    setOpenDrawer(false);
                                }}
                                openDrawer={openDrawer}
                                setOpenDrawer={setOpenDrawer}
                                insight={selectedItem}
                                refresh={refresh}
                                onInsightDeleted={() => {
                                    setSelectedItem(undefined)
                                }}
                                onContentUpdated={(updatedInsight: Insight) => {
                                    setSelectedItem(undefined)
                                    refresh();
                                    setSelectedItem(updatedInsight)

                                }}
                            />
                            : <div className="hidden md:flex flex-row items-center justify-center w-full h-full">
                                <AskForSelectAnItem />
                            </div>
                    }

                </div>
            </div>
        </>
    )
}











