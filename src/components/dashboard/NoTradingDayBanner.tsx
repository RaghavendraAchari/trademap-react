import Trade from "@/models/trade/Trade";

export default function NoTradeDayBanner({ trade }: { trade: Trade }) {
    let title;
    let imgSrc;

    if (trade.isHoliday) {
        title = "You marked it as a holiday."
        imgSrc = "/holiday.svg"
    }
    else if (trade.noTradingDay) {
        title = "You marked it as No Trading Day"
        imgSrc = "/No Trading Day.svg"
    }
    else if (trade.isWeekend) {
        title = "You marked it as weekend."
        imgSrc = "/weekend.svg"
    }


    return <div className="flex flex-col justify-center">
        <img src={imgSrc} alt="svg" className="object-contain w-72 h-64 mx-auto my-5 opacity-70" />
        <p className="text-center font-medium text-md mt-2">{title}</p>
    </div>
}