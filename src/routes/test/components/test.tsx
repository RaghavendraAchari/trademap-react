
// <form ref={formState} onPaste={(e) => handleOnImagePaste(e)} onSubmit={submit((data) => { submitData(data) })} onReset={() => setImagePreviews([])}>
// <ScrollArea className="h-[500px]">
//     <div className="grid w-full max-w-sm items-center gap-4 p-2">
//         <Label aria-label="max-day" className="text-sm text-slate-500">Max days traded: {maxDay ? maxDay : 0}</Label>

//         <div className="label-distance">
//             <Label aria-label="Day" htmlFor="day">Day: </Label>
//             <Input type="number" id="day" value={day?.toString()} {...register("day")} />
//         </div>

//         <div className="label-distance">
//             <Label aria-label="DateTime">Date and Time: </Label>
//             {/* <DateTimePicker isRequired={true} key="dateTimePicker" granularity="minute" value={ } /> */}
//             <Input type="datetime-local" {...register("dateTime")} id="DateTime" defaultValue={getDateInISOAsLocalDate(forDate)} />
//         </div>

//         <div className="label-distance">
//             <Label htmlFor="instrumentType">Instrument Type: </Label>
//             <RadioGroup id="instrumentType" defaultValue="INDEX" required>
//                 <div className="flex items-center space-x-2">
//                     <RadioGroupItem {...register("instrumentType")} value="INDEX" id="INDEX" />
//                     <Label className="hover:cursor-pointer" htmlFor="INDEX">Index</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                     <RadioGroupItem {...register("instrumentType")} value="STOCK" id="STOCK" />
//                     <Label className="hover:cursor-pointer" htmlFor="STOCK">Stock</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                     <RadioGroupItem {...register("instrumentType")} value="COMMODITY" id="COMMODITY" />
//                     <Label className="hover:cursor-pointer" htmlFor="COMMODITY">Commodity</Label>
//                 </div>
//             </RadioGroup>
//         </div>

//         <div className="label-distance">
//             <Label htmlFor="instrumentName">Instrument Name: </Label>
//             <Input type="text" {...register("instrumentName", {})} id="instrumentName" placeholder="Instrument Name" required />
//             <ScrollArea className="text-sm flex flex-col h-52 border rounded">
//                 {
//                     !loading && setupsAndInstruments
//                         ? setupsAndInstruments.instrumentNames.map(it => {
//                             return <div className="p-2 mb-1 cursor-pointer hover:bg-slate-100" key={it} onClick={() => {
//                                 if (instrumentNameInpurRef.current)
//                                     instrumentNameInpurRef.current.value = it
//                             }}>{it}</div>
//                         })
//                         : null
//                 }
//             </ScrollArea>
//         </div>

//         <div className="label-distance">
//             <Label htmlFor="setupName">Setup Name: </Label>
//             <Input {...register("setupName")} type="text" id="setupName" placeholder="Setup Name" required />
//             <ScrollArea className="text-sm flex flex-col h-52 border rounded">
//                 {
//                     !loading && setupsAndInstruments
//                         ? setupsAndInstruments?.setupNames.map(it => {
//                             return <div className="p-2  mb-1 cursor-pointer hover:bg-slate-100" key={it} onClick={() => {
//                                 if (setupInpurRef.current)
//                                     setupInpurRef.current.value = it
//                             }}>{it}</div>
//                         })
//                         : null
//                 }
//             </ScrollArea>
//         </div>

//         <div className="label-distance">
//             <Label htmlFor="rr">RR / RR on index: </Label>
//             <Input type="number" {...register("rr")} id="rr" placeholder="Risk to reward ratio" required step="any" min={0} />
//         </div>

//         <div className="label-distance">
//             <Label htmlFor="rrOnPremium">RR / RR on premium: </Label>
//             <Input type="number" id="rrOnPremium" {...register("rrOnPremium")} placeholder="Risk to reward ratio on FnO chart" step="any" min={0} />
//         </div>

//         <div className="label-distance">
//             <Label htmlFor="resultType">Result: </Label>
//             <RadioGroup {...register("resultType")} id="resultType" defaultValue="PartialTarget" required>
//                 <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="PartialTarget" id="partialTarget" />
//                     <Label className="hover:cursor-pointer" htmlFor="partialTarget">Partial Target</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="Target" id="Target" />
//                     <Label className="hover:cursor-pointer" htmlFor="Target">Target</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="CTC" id="CTC" />
//                     <Label className="hover:cursor-pointer" htmlFor="CTC">Cost To Cost (CTC)</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="PartialSL" id="partialSL" />
//                     <Label className="hover:cursor-pointer" htmlFor="partialSL">Partial Stop Loss</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="SL" id="SL" />
//                     <Label className="hover:cursor-pointer" htmlFor="SL">Stop Loss (SL Hit)</Label>
//                 </div>
//             </RadioGroup>
//         </div>

//         <div className="label-distance">
//             <Label htmlFor="remarks">Description / Remarks:</Label>
//             <Textarea {...register("remarks")} className="min-h-[300px]" placeholder="Type your message here." id="remarks" />
//         </div>

//         <div className="label-distance">
//             <Label htmlFor="pnl">Profit / Loss: </Label>
//             <Input type="number" id="pnl" {...register("pnl")} placeholder="Profit/loss in (+/-)rupees" required />
//         </div>

//         <div className="label-distance">
//             <Label htmlFor="images">Images: </Label>
//             <Input
//                 {...register("images")}
//                 onChange={() => setImagePreview()}
//                 id="images"
//                 type="file"
//                 multiple={true}
//                 accept="image/png, image/gif, image/jpeg"
//             />
//         </div>

//         <div className="label-distance" id="imagePreview">
//             {
//                 imagePreviews.map((it, index) => {
//                     return <div className="w-full" key={index}>{it}</div>
//                 })
//             }
//         </div>
//     </div>

// </ScrollArea>
// <DialogFooter className="sm:justify-start p-2">
//     <div>
//         <Button type="submit" variant="default" disabled={loading}>
//             Submit
//         </Button>
//     </div>
//     <div>
//         <Button type="reset" variant="outline">
//             Reset
//         </Button>
//     </div>
// </DialogFooter>
// </form>


// useEffect(() => {
//     setFetchingData(true)

//     axios.get<{ days: number }>("http://localhost:8080/tradedetails/getMaxDaysTraded")
//         .then(res => {

//             if (res.status === 200) {

//                 setMaxDay(res.data.days)
//                 setDay(res.data.days + 1)
//             } else {
//                 toast({
//                     title: "Not able to fetch max days",
//                     description: "Error code : " + res.status + ", Message : " + res.statusText
//                 })
//             }
//         }).catch((err: AxiosError) => {
//             toast({
//                 title: "Network Issue",
//                 description: "Message: " + err.message
//             })
//         }).finally(() => setFetchingData(false))


// }, [])




// function handleOnImagePaste(e: React.ClipboardEvent<HTMLFormElement>) {
//     if (e.clipboardData.files.length === 0)
//         return;
//     let input = inputImagesRef.current as HTMLInputElement;

//     let fileList = new DataTransfer()

//     //if files are present already
//     if (input.files?.length !== undefined) {
//         for (let i = 0; i < input.files?.length; i++) {
//             fileList.items.add(input.files[i])
//         }
//     }

//     fileList.items.add(e.clipboardData.files[0])

//     input.files = fileList.files;

//     setImagePreview()
// }


// function setImagePreview() {
//     let previews: ReactElement[] = [];

//     if (inputImagesRef.current && inputImagesRef.current.files?.length) {
//         for (let i = 0; i < inputImagesRef.current.files?.length; i++) {
//             console.log("reading image " + i);

//             let reader = new FileReader()
//             reader.readAsDataURL(inputImagesRef.current.files[i])

//             reader.onload = () => {
//                 const image = React.createElement("img", {
//                     src: reader.result,
//                     key: i
//                 })
//                 previews.push(image);

//                 setImagePreviews(lastData => [...previews])
//             }

//         }

//     }
// }


// const [imagePreviews, setImagePreviews] = useState<ReactElement[]>([])


// const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     console.log("onSubmit called");


//     if (formState.current == null)
//         return;

//     setSendingForm(true)
//     const formData = new FormData(formState.current);

//     const tradeDetails = {
//         noTradingDay: false,
//         isHoliday: false,
//         isWeekend: false,
//         dateTime: formData.get("dateTime"),
//         day: formData.get("day"),
//         instrumentType: formData.get("instrumentType"),
//         instrumentName: formData.get("instrumentName"),
//         setupName: formData.get("setupName"),
//         riskToReward: formData.get("rr"),
//         riskToRewardOnPremium: formData.get("rrOnPremium"),
//         resultType: formData.get("resultType"),
//         remarks: formData.get("remarks"),
//         pnl: formData.get("pnl"),
//     }

//     const images = formData.getAll("images");

//     const uploadObject = new FormData();
//     uploadObject.append("tradeDetails", new Blob([JSON.stringify(tradeDetails)], { type: "application/json" }),);

//     images.forEach(file => uploadObject.append("images", file))

//     uploadObject.forEach((value, key) => console.log({ key, value }))

//     toast({
//         title: "Sending data to the server",
//         description: "Data is being sent to the server. Waiting for the response."
//     })

//     // send to backend
//     axios.post("http://localhost:8080/tradedetails",
//         uploadObject,
//         {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             }
//         }
//     ).then(res => {
//         if (res.status.toString().startsWith("2")) {
//             toast({
//                 title: "Data saved",
//                 description: "Data is saved to the server."
//             })

//         } else {
//             toast({
//                 title: "Data not stored",
//                 description: "Data is not saved to the server."
//             })
//         }
//         onDataSubmit();
//         setFormOpen(false);
//     }).catch((err: AxiosError) => {
//         toast({
//             title: "Error !",
//             description: "Error in sending the data." + err.message
//         })
//     }).finally(() => {
//         setSendingForm(false);
//         (formState.current as HTMLFormElement).reset()
//     })


// }



// const handleFormValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setFormValues(values => ({ ...values, [name]: value }))
// }